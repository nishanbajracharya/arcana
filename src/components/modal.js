import React from 'react';
import styles from './Modal.module.css'; // Import CSS for styling

const Modal = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div>{title}</div>
        <span className={styles.closeButton} onClick={onClose}>×</span>
        {children}
      </div>
    </div>
  );
};

export default Modal;