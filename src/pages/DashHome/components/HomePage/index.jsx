import "./styles.css";
import { useState, useRef, useEffect } from "react";
import ModalHome from "../ModalHome/modalHome";
import downArrow from "../../../../assets/downArrow.svg";
import paidCharges from "../../../../assets/paidCharges.svg";
import overdueCharges from "../../../../assets/overdueCharges.svg";
import expectedCharges from "../../../../assets/expectedCharges.svg";
import defauters from "../../../../assets/defauters.svg";
import current from "../../../../assets/current.svg";
import { getOverview } from "../../../../api/billings";

export default function HomePage({ goToChargesTab, goToClient }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [chargesData, setChargesData] = useState([]);
  const [clientsData, setClientsData] = useState([]);

  const downArrowRef = useRef(null);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, status, error } = await getOverview();

        if (status === 200) {
          console.log(data);
        } else {
          console.error("Erro ao obter dados do servidor:", error);
        }
      } catch (error) {
        console.error("Erro ao obter dados:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="containerHome">
      <div className="containerSummariesData">
        <header className="collectionTitle">
          <h1>Resumo das cobranças</h1>

          <div className="abbreviationAndNameCharges">
            <h3 className="abreviationCharges">LR</h3>
            <h3 className="nameHeaderCharges">Lorena</h3>
            <img
              ref={downArrowRef}
              className="downArrowCharges"
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
        <main className="containerMain">
          <section className="summaries">
            <div className="summariesPaid">
              <div>
                <img src={paidCharges} alt="Paid Charges Image" />
              </div>
              <div>
                <h3>Cobranças Pagas</h3>
                <h3>R$ 30.000</h3>
              </div>
            </div>
            <div className="summariesOverdue">
              <div>
                <img src={overdueCharges} alt="Paid Charges Image" />
              </div>
              <div>
                <h3>Cobranças Vencidas</h3>
                <h3>R$ 7.000</h3>
              </div>
            </div>
            <div className="summariesExpected">
              <div>
                <img src={expectedCharges} alt="Paid Charges Image" />
              </div>
              <div>
                <h3>Cobranças Previstas</h3>
                <h3>R$ 10.000</h3>
              </div>
            </div>
          </section>
          <section className="containerCardsCharges">
            <section>
              <div className="charges">
                <h2>Cobranças Pagas</h2>
                <h2
                  className="count"
                  style={{ backgroundColor: "#EEF6F6", color: "#1FA7AF" }}
                >
                  10
                </h2>
              </div>
              <div className="titlesCollections">
                <h3>Cliente</h3>
                <h3>ID da cob.</h3>
                <h3>Valor</h3>
              </div>
              {chargesData.map((charge) => (
                <div className="client" key={charge.id}>
                  <h3>{charge.clientName}</h3>
                  <h3>{charge.cobrancaId}</h3>
                  <h3>{charge.valor}</h3>
                </div>
              ))}
              <div className="seeAll">
                <h3 onClick={goToChargesTab}>Ver todos</h3>
              </div>
            </section>
            <section className="billingStatus">
              <div className="charges">
                <h2>Cobranças vencidas</h2>
                <h2 className="count">08</h2>
              </div>
              <div className="titlesCollections">
                <h3>Cliente</h3>
                <h3>ID da cob.</h3>
                <h3>Valor</h3>
              </div>
              {chargesData.map((charge) => (
                <div className="client" key={charge.id}>
                  <h3>{charge.clientName}</h3>
                  <h3>{charge.cobrancaId}</h3>
                  <h3>{charge.valor}</h3>
                </div>
              ))}
              <div className="seeAll">
                <h3 onClick={goToChargesTab}>Ver todos</h3>
              </div>
            </section>
            <section className="clientsStatus">
              <div className="charges">
                <h2>Cobranças Previstas</h2>
                <h2
                  className="count"
                  style={{ backgroundColor: "#FCF6DC", color: "#C5A605" }}
                >
                  05
                </h2>
              </div>
              <div className="titlesCollections">
                <h3>Cliente</h3>
                <h3>ID da cob.</h3>
                <h3>Valor</h3>
              </div>
              {chargesData.map((charge) => (
                <div className="client" key={charge.id}>
                  <h3>{charge.clientName}</h3>
                  <h3>{charge.cobrancaId}</h3>
                  <h3>{charge.valor}</h3>
                </div>
              ))}
              <div className="seeAll">
                <h3 onClick={goToChargesTab}>Ver todos</h3>
              </div>
            </section>
          </section>
          <section>
            <section className="containerStatusClient">
              <section>
                <div className="defauter">
                  <div className="defauterImg">
                    <img src={defauters} alt="" />
                    <h2>Clientes Inadimplentes</h2>
                  </div>
                  <h2 className="defaultersCont">10</h2>
                </div>
                <div className="cardsClient">
                  <h3>Clientes</h3>
                  <h3>ID do clie.</h3>
                  <h3>CPF</h3>
                </div>
                {clientsData.map((client) => (
                  <div className="client" key={client.id}>
                    <h3>{client.name}</h3>
                    <h3>{client.id}</h3>
                    <h3>{client.cpf}</h3>
                  </div>
                ))}
                <div className="seeAllClients">
                  <h3 onClick={goToClient}>Ver todos</h3>
                </div>
              </section>
              <section>
                <div className="defauter">
                  <div className="defauterImg">
                    <img src={current} alt="" />
                    <h2>Clientes em dia</h2>
                  </div>
                  <h2
                    className="defaultersCont"
                    style={{ backgroundColor: "#EEF6F6", color: "#1FA7AF" }}
                  >
                    08
                  </h2>
                </div>
                <div className="cardsClient">
                  <h3>Clientes</h3>
                  <h3>ID do clie.</h3>
                  <h3>CPF</h3>
                </div>
                {clientsData.map((client) => (
                  <div className="client" key={client.id}>
                    <h3>{client.name}</h3>
                    <h3>{client.id}</h3>
                    <h3>{client.cpf}</h3>
                  </div>
                ))}
                <div className="seeAllClients">
                  <h3 onClick={goToClient}>Ver todos</h3>
                </div>
              </section>
            </section>
          </section>
        </main>
      </div>
    </div>
  );
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
}
