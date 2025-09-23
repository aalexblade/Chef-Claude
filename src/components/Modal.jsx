import React from "react";

export default function Modal({
  title,
  message,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
}) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>{title}</h3>
        <p>{message}</p>
        <button className="btn modal-confirm-btn" onClick={onConfirm}>
          {confirmText}
        </button>
        <button className="btn modal-cancel-btn" onClick={onCancel}>
          {cancelText}
        </button>
      </div>
    </div>
  );
}
