import "./styles.css";
import React, { useState, useRef } from "react";
import CustomerUpdate from "../CustomerUpdate";
import ChargeCard from "../ChargeCard";
import ClientIcon from "../../assets/client.svg";
import EditIcon from "../../assets/edit.svg";
import AddIcon from "../../assets/add.svg";
import SwapIcon from "../../assets/swap.svg";
import ModalHome from "../../pages/DashHome/components/ModalHome/modalHome";
import downArrow from "../../assets/downArrow.svg";

const DetailCustomer = ({ handleCloseDetail }) => {
  const [showEditCustomerModal, setShowEditCustomerModal] = useState(false);
  const downArrowRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleShowEditCustomerModal = () => {
    setShowEditCustomerModal(!showEditCustomerModal);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="containerHomeClientDetail">
      <div className="containerSummariesDataClientDetail">
        <header className="collectionTitleClientDetail">
          <div className="collectionTitleRoutesClientDetail">
            <h1 className="clientDetailTitle" onClick={handleCloseDetail}>
              Clientes
            </h1>
            <p>{">"}</p>
            <p>Detalhes do cliente</p>
          </div>
          <div className="abbreviationAndNameCLient">
            <h3 className="abreviationClient">LR</h3>
            <h3 className="nameHeaderClient">Lorena</h3>
            <img
              ref={downArrowRef}
              className="downArrowClient"
              src={downArrow}
              alt="Down Arrow image"
              onClick={isModalOpen ? closeModal : openModal}
            />
          </div>
        </header>
        {isModalOpen && (
          <div
            className="containerModal"
            style={getModalStyle(downArrowRef.current)}
          >
            <ModalHome
              className="modalHome"
              isOpen={isModalOpen}
              onRequestClose={closeModal}
            />
          </div>
        )}
        <div className="detail-customer-container">
          <div className="header-container">
            <img src={ClientIcon} alt="" />
            <span>Sara Lage Silva</span>
          </div>
          <div className="body-container">
            <div className="customer-info">
              <div className="header-customer-info">
                <span>Dados do Cliente</span>
                <button onClick={toggleShowEditCustomerModal}>
                  <img src={EditIcon} alt="" />
                  <span>Editar Cliente</span>
                </button>
              </div>
              <div className="customer-data">
                <div style={{ width: "22%" }} className="data">
                  <label>E-mail</label>
                  <span>sarasilva@mail.com</span>
                </div>
                <div style={{ width: "18%" }} className="data">
                  <label>Telefone</label>
                  <span>71 9 83374 8475</span>
                </div>
                <div className="data">
                  <label>CPF</label>
                  <span>049.584.864-29</span>
                </div>
              </div>
              <div className="address">
                <div style={{ width: "22%" }} className="data">
                  <label>Endereço</label>
                  <span>Ruas das cornélias 84</span>
                </div>
                <div style={{ width: "18%" }} className="data">
                  <label>Bairro</label>
                  <span>Oliveiras</span>
                </div>
                <div style={{ width: "18%" }} className="data">
                  <label>Complemento</label>
                  <span>Ap: 503</span>
                </div>
                <div style={{ width: "18%" }} className="data">
                  <label>CEP</label>
                  <span>44.380-000</span>
                </div>
                <div style={{ width: "18%" }} className="data">
                  <label>Cidade</label>
                  <span>Salvador</span>
                </div>
                <div className="data">
                  <label>UF</label>
                  <span>BA</span>
                </div>
              </div>
            </div>
            <div className="customer-charges">
              <div className="header-customer-charges">
                <h2>Cobranças do Cliente</h2>
                <button onClick={() => console.log("Adicionar cobrança")}>
                  <img src={AddIcon} alt="" />
                  <span>Nova Cobrança</span>
                </button>
              </div>
              <div className="header-charges-table">
                <div className="column-title">
                  <img src={SwapIcon} alt="" />
                  <label>ID Cob.</label>
                </div>
                <div className="column-title">
                  <img src={SwapIcon} alt="" />
                  <label>Data de venc.</label>
                </div>
                <label className="column-title">Valor</label>
                <label className="column-title">Status</label>
                <label className="column-title">Descrição</label>
              </div>
              <div className="charges-table">
                <ChargeCard
                  id={"34834587385"}
                  data={"24/07/2023"}
                  value={"R$ 4790,74"}
                  description={
                    "lorem ipsum lorem ipsum lorem ipsuipsum lorem ips eufndeui idme i"
                  }
                  status={"pendente"}
                  clickEdit={() => console.log("Editar")}
                  clickDelete={() => console.log("Deletar")}
                />
                <ChargeCard
                  id={"424323432738"}
                  data={"14/04/2023"}
                  value={"R$ 2800,00"}
                  description={
                    "lorem ipsum lorem ipsum lorem ipsuipsum lorem ips eufndeui idme i"
                  }
                  status={"vencida"}
                  clickEdit={() => console.log("Editar")}
                  clickDelete={() => console.log("Deletar")}
                />
                <ChargeCard
                  id={"423342433348"}
                  data={"21/09/2023"}
                  value={"R$ 5800,80"}
                  description={
                    "lorem ipsum lorem ipsum lorem ipsuipsum lorem ips eufndeui idme i"
                  }
                  status={"paga"}
                  clickEdit={() => console.log("Editar cobrança")}
                  clickDelete={() => console.log("Deletar cobrança")}
                />
              </div>
            </div>
          </div>
        </div>
        {showEditCustomerModal && (
          <CustomerUpdate
            show={showEditCustomerModal}
            handleClose={toggleShowEditCustomerModal}
            userId={1}
          />
        )}
      </div>
    </div>
  );
};

function getModalStyle(downArrowElement) {
  if (!downArrowElement) return {};

  const rect = downArrowElement.getBoundingClientRect();
  const topPosition = rect.bottom + window.scrollY;
  const leftPosition = rect.left + window.scrollX;

  return {
    position: "absolute",
    top: `${topPosition}px`,
    left: `${leftPosition}px`,
  };
}

export default DetailCustomer;
