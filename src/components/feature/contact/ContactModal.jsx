import { useCallback, useEffect, useState } from "react";
import { Modal as RbsModal } from "react-bootstrap";
import { texts } from "../../../data/texts.uk";
import { Button } from "react-bootstrap";
import ContactForm from "./ContactForm";

function useSendContactStatus() {
  const [state, setState] = useState("idle");
  const [error, setError] = useState(null);

  const startLoading = useCallback(() => {
    setError(null);
    setState("loading");
  }, []);

  const setValidationError = useCallback(() => {
    setError(null);
    setState("validationError");
  }, []);

  const resolveSuccess = useCallback(() => {
    setState("success");
  }, []);

  const resolveError = useCallback((err) => {
    setError(err);
    setState("error");
  }, []);

  const reset = useCallback(() => {
    setError(null);
    setState("idle");
  }, []);

  return {
    isIdle: state === "idle",
    isLoading: state === "loading",
    isSuccess: state === "success",
    isValidationError: state === "validationError",
    isError: state === "error",
    isResolved: state === "success",
    error,

    startLoading,
    setValidationError,
    resolveSuccess,
    resolveError,
    reset,
  };
}

export default function ContactModal({ show, onClose }) {
  const sendContactStatus = useSendContactStatus();
  const { reset } = sendContactStatus;

  const handleClose = () => {
    !sendContactStatus.isLoading && onClose && onClose();
  };

  useEffect(() => {
    if (show) {
      reset();
    }
  }, [show, reset]);

  return (
    <RbsModal
      show={show}
      onHide={handleClose}
      backdrop={sendContactStatus.isLoading ? "static" : true}
      keyboard={!sendContactStatus.isLoading}
    >
      <RbsModal.Header closeButton={!sendContactStatus.isLoading}>
        <RbsModal.Title>{texts.contactModal.title}</RbsModal.Title>
      </RbsModal.Header>
      <RbsModal.Body>
        <ContactForm
          formId="contactForm"
          sendContactStatus={sendContactStatus}
        />
      </RbsModal.Body>
      <RbsModal.Footer>
        {!sendContactStatus.isResolved && (
          <Button
            variant="primary"
            type="submit"
            className="primaryButton"
            form="contactForm"
            disabled={sendContactStatus.isLoading}
          >
            {sendContactStatus.isLoading
              ? texts.contactModal.submittingBtnCaption
              : texts.contactModal.submitBtnCaption}
          </Button>
        )}
        <Button
          variant="secondary"
          className="secondaryButton"
          onClick={handleClose}
          disabled={sendContactStatus.isLoading}
        >
          {texts.modal.closeBtnCaption}
        </Button>
      </RbsModal.Footer>
    </RbsModal>
  );
}
