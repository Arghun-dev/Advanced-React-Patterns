import { useState } from "react";
import { createPortal } from "react-dom";

export const ReactPortal = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setOpen(true)}>show message</button>
      <Alert open={open} onClose={() => setOpen(false)}>
        <p>This is alert message</p>
      </Alert>
    </div>
  );
};

const Alert = ({ children, open, onClose }) => {
  if (!open) return null;

  const alertRoot = document.querySelector("#alert-root");
  if (!alertRoot) return null;

  return createPortal(
    <div
      style={{
        backgroundColor: "#ccc",
        padding: "1rem",
        borderRadius: "4px",
      }}
    >
      <button onClick={onClose}>close</button>
      {children}
    </div>,
    alertRoot
  );
};
