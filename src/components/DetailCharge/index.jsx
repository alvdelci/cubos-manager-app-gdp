import Close from "../../assets/icon-close.svg";
import Charge from "../../assets/charge.svg";

import "./styles.css";

const ChargeStatus = ({ status }) => {
  switch (status) {
    case "Vencida":
      return (
        <div
          style={{
            color: "#971D1D",
            backgroundColor: "rgba(255, 239, 239, 1)",
            width: "fit-content",
            paddingLeft: 8,
            paddingRight: 8,
            borderRadius: 8,
            fontFamily: "Nunito",
            fontWeight: 600,
          }}
        >
          Vencida
        </div>
      );
    case "Pendente":
      return (
        <div
          style={{
            color: "#C5A605",
            backgroundColor: "rgba(252, 246, 220, 1)",
            width: "fit-content",
            paddingLeft: 8,
            paddingRight: 8,
            borderRadius: 8,
            fontFamily: "Nunito",
            fontWeight: 600,
          }}
        >
          Pendente
        </div>
      );
    case "Paga":
      return (
        <div
          style={{
            color: "#1FA7AF",
            backgroundColor: "rgba(238, 246, 246, 1)",
            width: "fit-content",
            paddingLeft: 8,
            paddingRight: 8,
            borderRadius: 8,
            fontFamily: "Nunito",
            fontWeight: 600,
          }}
        >
          Paga
        </div>
      );
    default:
      return <></>;
  }
};

const formatData = (data) => {
  const splited = data.substr(0, 10).split("-");

  return `${splited[2]}/${splited[1]}/${splited[0]}`;
};

const DetailCharge = ({
  show,
  handleClose,
  name,
  description,
  data,
  id,
  value,
  status,
}) => {
  return (
    <>
      <div
        className="close-section"
        style={{
          display: show ? "block" : "none",
        }}
      />
      <div
        className="charge-register-container"
        style={{
          display: show ? "flex" : "none",
        }}
      >
        <div className="title">
          <img src={Charge} alt="" />
          <h1>Detalhe da Cobrança</h1>
        </div>

        <div className="content">
          <label>Nome</label>
          <span>{name}</span>

          <label>Descrição</label>
          <span>{description}</span>

          <div className="section">
            <div className="info-section">
              <label>Vencimento</label>
              <span>{formatData(data)}</span>

              <label>ID Cobranças</label>
              <span>{id}</span>
            </div>

            <div className="info-section">
              <label>Valor</label>
              <span>R$ {value / 100}</span>

              <label>Status</label>
              <ChargeStatus status={status} />
            </div>
          </div>
        </div>

        <img className="icon-close" onClick={handleClose} src={Close} alt="" />
      </div>
    </>
  );
};

export default DetailCharge;
