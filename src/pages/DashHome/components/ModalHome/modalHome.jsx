import "./styles.css";
import edit from "../../../../assets/edit.svg";
import exit from "../../../../assets/exit.svg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { ModalPutUser } from "../../../../components/ModalPutUser";

const ModalHome = ({ isOpen, onRequestClose }) => {
  const navigate = useNavigate();
  function handleLogout(event) {
    event.preventDefault();
    localStorage.removeItem("token");
    navigate("/login");
  }

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const openEditModal = () => {
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  return (
    <div className="containerModalHome">
      <section className="containerEditAndExit">
        <div className="containerEditHome" onClick={openEditModal}>
          <a>
            <img src={edit} alt="edit image" />
            <p className="textModalHome">Editar</p>
          </a>
        </div>
        <div className="containerExitHome" onClick={handleLogout}>
          <a href="">
            <img src={exit} alt="edit image" />
            <p>Sair</p>
          </a>
        </div>
      </section>

      {isEditModalOpen && (
        <ModalPutUser handleClose={closeEditModal} open={isEditModalOpen} />
      )}
    </div>
  );
};

export default ModalHome;
