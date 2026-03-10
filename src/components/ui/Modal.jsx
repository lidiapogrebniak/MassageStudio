import { Modal as RbsModal } from "react-bootstrap"
import { texts } from "../../data/texts.uk"
import { Button } from "react-bootstrap"

export default function Modal({ heading, show, children, primaryBtnCaption, primaryBtnSubmittingCaption, onClose, submitFormId, requestStatus }) {

  const handleClose = () => {
    !requestStatus.isLoading && onClose && onClose();
  };

  return (
      <RbsModal show={show} onHide={handleClose}
        backdrop={requestStatus.isLoading ? "static" : true}
        keyboard={!requestStatus.isLoading} >
        <RbsModal.Header closeButton={!requestStatus.isLoading}>
          <RbsModal.Title>{heading}</RbsModal.Title>
        </RbsModal.Header>
        <RbsModal.Body>
          {children}
        </RbsModal.Body>
        <RbsModal.Footer>
          {!requestStatus.isResolved && (
            <Button variant="primary" type="submit" className="primaryButton" form={submitFormId} disabled={requestStatus.isLoading}>
              {requestStatus.isLoading ? primaryBtnSubmittingCaption : primaryBtnCaption}
            </Button>
          )}
          <Button variant="secondary" className="secondaryButton" onClick={handleClose} disabled={requestStatus.isLoading}>
            {texts.modal.closeBtnCaption}
          </Button>
        </RbsModal.Footer>
      </RbsModal>
  )
}
