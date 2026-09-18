import { forwardRef, useRef, useImperativeHandle, useMemo, useState } from "react"
import Modal from "../../ui/Modal"
import ContactForm from "./ContactForm"
import { texts } from "../../../data/texts.uk"

function useSendContactStatus() {
  const [state, setState] = useState("idle")
  const [error, setError] = useState(null)

  return useMemo(
    () => ({
      isIdle: state === "idle",
      isLoading: state === "loading",
      isSuccess: state === "success",
      isVaidationError: state === "validationError",
      isError: state === "error",
      isResolved: state === "success" || state === "error",
      error,

      startLoading: () => {
        setError(null)
        setState("loading")
      },

      setValidationError: () => {
        setError(null)
        setState("validationError")
      },

      resolveSuccess: () => setState("success"),

      resolveError: (err) => {
        setError(err)
        setState("error")
      },

      reset: () => {
        setError(null)
        setState("idle")
      },
    }),
    [state, error],
  )
}

const ContactModal = forwardRef((props, ref) => {
  const modalRef = useRef(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const contactFormId = "contactForm"

  const sendContactStatus = useSendContactStatus()

  useImperativeHandle(ref, () => {
    return {
      open: () => {
        sendContactStatus.reset()
        setIsModalOpen(true)
        modalRef.current?.open()
      },
      close: () => {
        sendContactStatus.reset()
        setIsModalOpen(false)
        modalRef.current?.close()
      },
    }
  }, [sendContactStatus])

  return (
    <Modal
      ref={modalRef}
      show={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      primaryBtnCaption={texts.contactModal.submitBtnCaption}
      primaryBtnSubmittingCaption={texts.contactModal.submittingBtnCaption}
      heading={texts.contactModal.title}
      submitFormId={contactFormId}
      requestStatus={sendContactStatus}
    >
      <ContactForm formId={contactFormId} sendContactStatus={sendContactStatus} />
    </Modal>
  )
})

export default ContactModal
