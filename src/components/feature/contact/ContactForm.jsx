import { useState } from "react";
import { texts } from "../../../data/texts.uk";
import { Alert, Spinner, Form } from "react-bootstrap";
import { PatternFormat } from "react-number-format";
import { contactSchema } from "../../../api/contact/contactScheme.js";
import { contactErrorMessages } from "../../../data/contact.error.messages.js";
import { getPhoneDigits } from "../../../utils/phoneHelper.js";
import { useContacts } from "../../../hooks/useContacts.js";
import { useClientConfig } from "../../../hooks/useClientConfig.js";
import { useTurnstile } from "./useTurnstile.js";
import styles from "./ContactForm.module.css";

const CONTACT_REQUEST_TIMEOUT_MS = 15000;

function PhoneCustomInput({ error, ...props }) {
  return (
    <Form.Control
      isInvalid={!!error}
      placeholder="+38(0__) ___-__-__"
      {...props}
    />
  );
}

export default function ContactForm({ formId, sendContactStatus }) {
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [validated, setValidated] = useState(false);

  const companyPhone = useContacts().phone ?? "";

  const { config: clientConfig, error: clientConfigError } = useClientConfig();

  const {
    token,
    containerRef: turnstileRef,
    loadError: turnstileLoadError,
    reset: resetCaptcha,
  } = useTurnstile(clientConfig?.turnstileSiteKey);

  const captchaLoadError =
    turnstileLoadError ||
    (clientConfigError ? texts.contactModal.captchaLoadErrorMessage : null);

  const setFieldErrors = (fieldErrors) => {
    setErrors(
      Object.fromEntries(
        Object.entries(fieldErrors).map(([field, code]) => {
          return [field, contactErrorMessages[code] || code];
        }),
      ),
    );
  };

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
    } else {
      setValidated(true);
    }

    setErrors({});

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...result.data, captchaToken: token }),
        signal: AbortSignal.timeout(CONTACT_REQUEST_TIMEOUT_MS),
      });

      if (res.ok) {
        setMessage(texts.contactModal.successMessage);
        sendContactStatus.resolveSuccess();
        e.target.reset();
        return;
      }

      if (res.status === 429) {
        setMessage(
          texts.contactModal.duplicateMessage.replace("{#phone}", companyPhone),
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
      if (error.name === "TimeoutError") {
        setMessage(texts.contactModal.timeoutErrorMessage);
        console.error("Request timed out:", error);
      } else {
        setMessage(texts.contactModal.errorMessage);
        console.error("Error while sending contact message:", error);
      }
      resetCaptcha();
      sendContactStatus.resolveError(error);
    }
  }

  return (
    <>
      <div className={`mb-3 ${sendContactStatus.isSuccess ? "" : "d-none"}`}>
        <Alert variant="success">{message}</Alert>
      </div>
      <div
        className={`${styles.formWrapper} ${sendContactStatus.isSuccess ? "d-none" : ""}`}
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
          className={styles.fieldset}
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
                error={errors.phone}
                customInput={PhoneCustomInput}
              />
              <Form.Control.Feedback type="invalid">
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
            <div className={styles.turnstileContainer} ref={turnstileRef}></div>
            {(errors.captcha || captchaLoadError) && (
              <Form.Control.Feedback
                type="invalid"
                className={styles.captchaFeedback}
              >
                {errors.captcha || captchaLoadError}
              </Form.Control.Feedback>
            )}
            {message && <Alert variant="danger">{message}</Alert>}
          </Form>
        </fieldset>
      </div>
    </>
  );
}
