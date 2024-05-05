// ConfirmModal.js
import React from 'react';

const ConfirmModal = ({ isOpen, message, onConfirm, onCancel }) => {
    return (
        <div className={`modal ${isOpen ? 'is-active' : ''}`}>
            <div className="modal-background" onClick={onCancel}></div>
            <div className="modal-content">
                <div className="box">
                    <p>{message}</p>
                    <button className="button is-danger" onClick={onConfirm}>
                        Confirm
                    </button>
                    <button className="button" onClick={onCancel}>
                        Cancel
                    </button>
                </div>
            </div>
            <button className="modal-close is-large" aria-label="close" onClick={onCancel}></button>
        </div>
    );
};

export default ConfirmModal;
