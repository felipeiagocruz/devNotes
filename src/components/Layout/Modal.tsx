import classes from "./Modal.module.css";
import ReactDOM from "react-dom";

type ModalProps = {
  children: React.ReactNode;
  show: boolean;
  onClose: () => void;
};

const Modal = (props: ModalProps) => {
  if (!props.show) {
    return null;
  }
  return ReactDOM.createPortal(
    <div className={classes.modal} onClick={props.onClose}>
      <div
        className={classes.modalContent}
        onClick={(e) => e.stopPropagation()}
      >
        {props.children}
      </div>
    </div>,
    document.querySelector("#root") as Element
  );
};

export default Modal;
