import "./styles.css";
import { useState } from "react";
import close from "../../assets/close.svg";
import attention from "../../assets/attention.svg";
import IconDeleteCharges from "../../assets/deleteCharges.svg";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {children}
        <button className="close-button" onClick={onClose}>
          {" "}
          <img src={close} alt="" />
        </button>
      </div>
    </div>
  );
};

const AttentionModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <button className="button-delete" onClick={openModal}>
        {" "}
        <img
          style={{ cursor: "pointer" }}
          src={IconDeleteCharges}
          alt="Delete"
        />
      </button>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <section className="containerModalAttention">
          <img src={attention} alt="attention image" />
          <p className="textAttention">
            Tem certeza que deseja excluir esta cobrança?
          </p>
          <div className="containerconfirmation">
            <button onClick={closeModal} className="disagree">
              Não
            </button>
            <button className="agree">Sim</button>
          </div>
        </section>
      </Modal>
    </div>
  );
};

export default AttentionModal;
