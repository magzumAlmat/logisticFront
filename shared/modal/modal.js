import { IconButton } from "@mui/material";
import { X } from "lucide-react";
import React from "react";
import ReactDOM from "react-dom";

const Modal = ({ children, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-backdrop" onClick={onClose} />
      <div className="modal-content">
        {children}
        <IconButton
          sx={{ position: "absolute", top: 8, right: 8 }}
          onClick={onClose}
        >
          <X />
        </IconButton>
      </div>
    </div>
  );
};

export default Modal;
