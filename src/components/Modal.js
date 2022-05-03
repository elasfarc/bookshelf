/** @jsxImportSource @emotion/react */
import React from "react";
import { Dialog } from "./lib";

const ModalContext = React.createContext();

function Modal(props) {
  const [showModal, setShowModal] = React.useState(false);
  const open = () => setShowModal(true);
  const close = () => setShowModal(false);
  const value = { showModal, open, close };

  return <ModalContext.Provider value={value} {...props} />;
}

function useModal() {
  const context = React.useContext(ModalContext);
  if (!context) throw new Error("useModal must be used within <Modal />");
  return context;
}

function ModalOpenButton({ children: child }) {
  const { open } = useModal();
  return React.cloneElement(child, {
    onClick: callAll(open, child.props.onClick),
  });
}

function ModalDismissButton({ children: child }) {
  const { close } = useModal();
  return React.cloneElement(child, {
    onClick: callAll(close, child.props.onClick),
  });
}

function ModalContentsBase(props) {
  const { showModal, close } = useModal();
  return <Dialog isOpen={showModal} onDismiss={close} {...props} />;
}

function ModalContents({ title, children, ...props }) {
  return (
    <ModalContentsBase {...props}>
      <DismissBtn />
      <h3 css={{ textAlign: "center" }}>{title}</h3>
      {children}
    </ModalContentsBase>
  );
}

function DismissBtn() {
  return (
    <ModalDismissButton>
      <button className="close-button">
        <span aria-hidden>×</span>
      </button>
    </ModalDismissButton>
  );
}

function callAll(...fns) {
  return (...args) => fns.forEach((fn) => fn?.(...args));
}

export {
  ModalOpenButton,
  ModalDismissButton,
  ModalContents,
  ModalContentsBase,
  Modal,
  useModal,
};
