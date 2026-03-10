import { useState } from "react"
import { useEffect, useRef } from "react"
import { texts } from "../../../data/texts.uk"
import { Alert, Spinner, Form } from "react-bootstrap"
import { PatternFormat } from 'react-number-format'
import { contactSchema } from "../../../api/contact/contactScheme.js"
import { contactErrorMessages } from "../../../data/contact.error.messages.js"
import styles from "./ContactForm.module.css"

export default function ContactForm({ formId, sendContactStatus }) {

  const [message, setMessage] = useState("")
  const [errors, setErrors] = useState({});
  const [validated, setValidated] = useState(false);

  const turnstleSiteKey = import.meta.env.VITE_TURNSTILE_API_KEY;

  const turnstileRef = useRef(null);
  const [token, setToken] = useState(null);

  const setFieldErrors = (fieldErrors) => {

    setErrors(
      Object.fromEntries(
        Object.entries(fieldErrors).map(([field, code]) => {
          return [field, contactErrorMessages[code] || code];
        })
      )
    );
  };

  useEffect(() => {
    let widgetId = null;
    if (window.turnstile && turnstileRef.current) {
      widgetId = window.turnstile.render(turnstileRef.current, {
        sitekey: turnstleSiteKey,
        callback: (token) => {
          setToken(token);
        }
      });
    }
      return () => {
        if (widgetId !== null && window.turnstile) {
          window.turnstile.remove(widgetId);
        }
      }
  }, []);

  async function handleSubmit(e) {
    e.preventDefault()
    sendContactStatus.startLoading();
    setMessage("")

    const formData = new FormData(e.target)
     const data = {
      name: formData.get("name"),
      phone: formData.get("phone").replace(/\D/g, ""),
      message: formData.get("message"),
      captchaToken: token,
    }

    const result = contactSchema.safeParse({
      ...data
    });

    if (!result.success) {
      const fieldErrors = {};

      result.error.issues.forEach((err) => {
        fieldErrors[err.path[0]] = err.message;
      });
      setFieldErrors(fieldErrors);
      setValidated(true);

      sendContactStatus.setValidationError();
      return;
    }

    setErrors({});

    const controller = new AbortController();

    const timeoutId = setTimeout(() => {
      controller.abort();
    }, 15000); // 15 секунд

    let res;
    try {
      res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        signal: controller.signal,
      })
    } catch (error) {
      if (error.name === "AbortError") {
        setMessage(texts.contactModal.timeoutErrorMessage);
        console.error("Request timed out:", error);
      } else {
        setMessage(texts.contactModal.errorMessage);
        console.error("Error while sending contact message:", error);
      }
      sendContactStatus.resolveError(error);
      return;
    } finally {
      clearTimeout(timeoutId);
    }

    if (res.ok) {
      setMessage(texts.contactModal.successMessage)
      sendContactStatus.resolveSuccess();
      e.target.reset()
    } else {
      const responseJson = await res.json();
      if (responseJson && responseJson.error) {
          try {
            const errorData = JSON.parse(responseJson.error);
            if (errorData.fieldErrors) {
              setFieldErrors(errorData.fieldErrors);
            } else {
              setMessage(texts.contactModal.errorMessage);
              console.error("Unexpected error while sending message:", responseJson);
            }
          } catch (err) {
            setMessage(texts.contactModal.errorMessage);
            console.error("Error parsing error response:", err, "Original response:", responseJson);
          }
      } else {
        setMessage(texts.contactModal.errorMessage);
        console.error("Unexpected error response:", responseJson);
      }
      sendContactStatus.resolveError(new Error("Failed to send contact message"));
    }
  }

  return (
    <>
    {sendContactStatus.isResolved ? (
      <div className="mb-3">
        <Alert variant={sendContactStatus.isSuccess ? "success" : "danger"}>
          {message}
        </Alert>
      </div>
    ) : (
      <div style={{ position: "relative" }}>
      {sendContactStatus.isLoading && (
        <div
          className={`d-flex justify-content-center align-items-center ${styles.overlayContainer}`}
        >
          <Spinner animation="border" />
        </div>
      )}
      <fieldset disabled={sendContactStatus.isLoading} style={{ border: "none", padding: 0 }}>
        <Form noValidate validated={validated} id={formId} name="contactForm" onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="contactForm.nameInput">
            <Form.Control
              isInvalid={!!errors.name}
              type="text"
              placeholder={texts.contactModal.namePlaceholder}
              autoFocus
              name="name"
              required
            />
            <Form.Control.Feedback type="invalid">
              {errors.name}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="contactForm.phoneInput">
            <PatternFormat
                format="+38(0##) ###-##-##"
                mask="_"
                isnumericstring="true"
                required
                name="phone"
                customInput={(props) => {
                  return (
                    <Form.Group controlId="contactForm.phone" className="mb-3">
                      <Form.Control isInvalid={!!errors.phone} placeholder="+38(0__) ___-__-__" {...props} />
                    </Form.Group>
                  )
                }}
              />
              <Form.Control.Feedback type="invalid" style={{display: "block"}}>
                {errors.phone}
              </Form.Control.Feedback>
          </Form.Group>
          <Form.Group
            className="mb-3"
            controlId="contactForm.messageInput"
          >
            <Form.Control
            isInvalid={!!errors.message}
            rows={3} name="message" placeholder={texts.contactModal.messagePlaceholder} maxLength={500} />
            <Form.Control.Feedback type="invalid">
              {errors.message}
            </Form.Control.Feedback>
          </Form.Group>
          <div className={styles.turnstileContainer} ref={turnstileRef}></div>
          {errors.captcha && (
            <Form.Control.Feedback type="invalid" style={{ display: "block" }}>
              {errors.captcha}
            </Form.Control.Feedback>
          )}
          {message && <Alert variant="danger">{message}</Alert>}
        </Form>
      </fieldset>
    </div>
    )}
    </>
  )
}
