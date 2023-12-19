import React from "react";
import DeleteIcon from "../../assets/delete.svg";
import EditIcon from "../../assets/edit.svg";
import "./styles.css";

//Rebe os valores vencida, pendente, ou paga e retorna as caracteristicas dos componentes
const CustomerStatus = ({ status }) => {
  switch (status) {
    case "vencida":
      return (
        <div
          style={{
            color: "#971D1D",
            backgroundColor: "rgba(255, 239, 239, 1)",
          }}
        >
          Vencida
        </div>
      );
    case "pendente":
      return (
        <div
          style={{
            color: "#C5A605",
            backgroundColor: "rgba(252, 246, 220, 1)",
          }}
        >
          Pendente
        </div>
      );
    case "paga":
      return (
        <div
          style={{
            color: "#1FA7AF",
            backgroundColor: "rgba(238, 246, 246, 1)",
          }}
        >
          Paga
        </div>
      );
    default:
      return <></>;
  }
};

const ChargeCard = ({
  id,
  data,
  value,
  status,
  description,
  clickEdit,
  clickDelete,
}) => {
  return (
    <div className="charge-card-container">
      <div className="id">{id}</div>
      <div className="data">{data}</div>
      <div className="value">{value}</div>
      <div className="status">
        <CustomerStatus status={status} />
      </div>
      <div className="description">{description}</div>
      <div className="icons">
        <div className="edit" onClick={clickEdit}>
          <img src={EditIcon} alt="" />
          <span>Editar</span>
        </div>
        <div className="delete" onClick={clickDelete}>
          <img src={DeleteIcon} alt="" />
          <span>Excluir</span>
        </div>
      </div>
    </div>
  );
};

export default ChargeCard;
