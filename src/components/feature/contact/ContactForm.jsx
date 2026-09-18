import { useState } from "react";
import { useEffect, useRef } from "react";
import { useRouteLoaderData } from "react-router-dom";
import { texts } from "../../../data/texts.uk";
import { Alert, Spinner, Form } from "react-bootstrap";
import { PatternFormat } from "react-number-format";
import { contactSchema } from "../../../api/contact/contactScheme.js";
import { contactErrorMessages } from "../../../data/contact.error.messages.js";
import { getPhoneDigits } from "../../../utils/phoneHelper.js";
import styles from "./ContactForm.module.css";

export default function ContactForm({ formId, sendContactStatus }) {
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [validated, setValidated] = useState(false);

  const companyPhone = useRouteLoaderData("root")?.contacts?.phone ?? "";

  const turnstleSiteKey = import.meta.env.VITE_TURNSTILE_API_KEY;

  const turnstileRef = useRef(null);
  const widgetIdRef = useRef(null);
  const [token, setToken] = useState(null);

  const setFieldErrors = (fieldErrors) => {
    setErrors(
      Object.fromEntries(
        Object.entries(fieldErrors).map(([field, code]) => {
          return [field, contactErrorMessages[code] || code];
        }),
      ),
    );
  };

  const resetCaptcha = () => {
    if (widgetIdRef.current !== null && window.turnstile) {
      window.turnstile.reset(widgetIdRef.current);
    }
    setToken(null);
  };

  useEffect(() => {
    if (window.turnstile && turnstileRef.current) {
      widgetIdRef.current = window.turnstile.render(turnstileRef.current, {
        sitekey: turnstleSiteKey,
        callback: (token) => {
          setToken(token);
        },
        "expired-callback": () => {
          setToken(null);
        },
        "error-callback": () => {
          setToken(null);
        },
      });
    }
    return () => {
      if (widgetIdRef.current !== null && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, [turnstleSiteKey]);

  async function handleSubmit(e) {
    e.preventDefault();
    sendContactStatus.startLoading();
    setMessage("");

    const formData = new FormData(e.target);
    const data = {
      name: formData.get("name"),
      phone: getPhoneDigits(formData.get("phone")),
      message: formData.get("message"),
      captchaToken: token,
    };

    const result = contactSchema.safeParse({
      ...data,
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

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        signal: controller.signal,
      });

      if (res.ok) {
        setMessage(texts.contactModal.successMessage);
        sendContactStatus.resolveSuccess();
        e.target.reset();
        return;
      }

      if (res.status === 429) {
        setMessage(
          texts.contactModal.duplicateMessage.replace(
            "{#phone}",
            companyPhone,
          ),
        );
        sendContactStatus.resolveSuccess();
        e.target.reset();
        return;
      }

      const responseJson = await res.json();
      if (responseJson && responseJson.fieldErrors) {
        setFieldErrors(responseJson.fieldErrors);
      } else {
        setMessage(texts.contactModal.errorMessage);
        console.error("Unexpected error response:", responseJson);
      }
      resetCaptcha();
      sendContactStatus.resolveError(
        new Error("Failed to send contact message"),
      );
    } catch (error) {
      if (error.name === "AbortError") {
        setMessage(texts.contactModal.timeoutErrorMessage);
        console.error("Request timed out:", error);
      } else {
        setMessage(texts.contactModal.errorMessage);
        console.error("Error while sending contact message:", error);
      }
      resetCaptcha();
      sendContactStatus.resolveError(error);
    } finally {
      clearTimeout(timeoutId);
    }
  }

  return (
    <>
      <div className={`mb-3 ${sendContactStatus.isSuccess ? "" : "d-none"}`}>
        <Alert variant="success">{message}</Alert>
      </div>
      <div
        style={{ position: "relative" }}
        className={sendContactStatus.isSuccess ? "d-none" : undefined}
      >
        {sendContactStatus.isLoading && (
          <div
            className={`d-flex justify-content-center align-items-center ${styles.overlayContainer}`}
          >
            <Spinner animation="border" />
          </div>
        )}
        <fieldset
          disabled={sendContactStatus.isLoading}
          style={{ border: "none", padding: 0 }}
        >
          <Form
            noValidate
            validated={validated}
            id={formId}
            name="contactForm"
            onSubmit={handleSubmit}
          >
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
                    <Form.Group
                      controlId="contactForm.phone"
                      className="mb-3"
                    >
                      <Form.Control
                        isInvalid={!!errors.phone}
                        placeholder="+38(0__) ___-__-__"
                        {...props}
                      />
                    </Form.Group>
                  );
                }}
              />
              <Form.Control.Feedback
                type="invalid"
                style={{ display: "block" }}
              >
                {errors.phone}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="contactForm.messageInput">
              <Form.Control
                isInvalid={!!errors.message}
                rows={3}
                name="message"
                placeholder={texts.contactModal.messagePlaceholder}
                maxLength={500}
              />
              <Form.Control.Feedback type="invalid">
                {errors.message}
              </Form.Control.Feedback>
            </Form.Group>
            <div
              className={styles.turnstileContainer}
              ref={turnstileRef}
            ></div>
            {errors.captcha && (
              <Form.Control.Feedback
                type="invalid"
                style={{ display: "block" }}
              >
                {errors.captcha}
              </Form.Control.Feedback>
            )}
            {message && <Alert variant="danger">{message}</Alert>}
          </Form>
        </fieldset>
      </div>
    </>
  );
}
