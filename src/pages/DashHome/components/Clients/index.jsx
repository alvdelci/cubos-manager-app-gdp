import "./styles.css";
import { useNavigate } from "react-router-dom";
import downArrow from "../../../../assets/downArrow.svg";
import iconClient from "../../../../assets/iconClient.svg";
import ClientTable from "../TablesClient";
import Filter from "../../../../assets/filter.svg";
import IconSeacher from "../../../../assets/iconseacher.svg";
import { TextField, InputAdornment } from "@mui/material";
import ModalHome from "../ModalHome/modalHome";
import { useState, useRef } from "react";
import CustomerRegister from "../../../../components/CustomerRegister";
import SearchNotFound from "../../../../components/SearchNotFound";
import { useEffect } from "react";
import { getCustomers } from "../../../../api/customer";

function Clients({ handleOpenDetail }) {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [show, setShow] = useState(false);
  const downArrowRef = useRef(null);
  const [searchTermCustomer, setSearchTermCustomer] = useState("");
  const [rows, setRows] = useState([]);

  const [hasSearchChangedCustomer, setHasSearchChangedCustomer] =
    useState(false);

  const [filteredRows, setFilteredRows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, status, error } = await getCustomers();

        if (status === 200) {
          setRows(data);
        } else {
          console.error("Erro ao obter dados do servidor:", error);
        }
      } catch (error) {
        console.error("Erro ao obter dados:", error);
      }
    };

    fetchData();
  }, []); // Include searchTermCustomer as a dependency

  useEffect(() => {
    // Filter rows based on the search term
    const filtered = rows.filter((row) =>
      row.name.toLowerCase().includes(searchTermCustomer.toLowerCase())
    );
    setFilteredRows(filtered);
  }, [searchTermCustomer, rows]); // Atualize os resultados filtrados quando o termo de pesquisa ou as linhas mudarem

  const handleSearchChange = (e) => {
    setSearchTermCustomer(e.target.value);
    setHasSearchChangedCustomer(true);
  };

  function handleClose() {
    setShow(false);
  }

  function handleAddClient() {
    setShow(true);
  }

  function openModal() {
    setIsModalOpen(true);
  }

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="containerHomeClient">
      <CustomerRegister
        show={show}
        setShow={setShow}
        handleClose={handleClose}
      />
      <div className="containerSummariesDataClient">
        <header className="collectionTitleClient">
          <h1>Clientes</h1>
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

        <main className="containerMainClient">
          <section className="summariesClient">
            <div className="titleSummariesClient">
              <div>
                <img src={iconClient} alt="Paid Charges Image" />
              </div>
              <div>
                <h3>Clientes</h3>
              </div>
            </div>
            <div className="summariesFilterClient">
              <div>
                <button className="buttonAddCustomer" onClick={handleAddClient}>
                  + Adicionar cliente
                </button>
              </div>
              <div>
                <img
                  className="filterCharges"
                  src={Filter}
                  alt="Paid Charges Image"
                />
              </div>
              <div className="searcher">
                <TextField
                  value={searchTermCustomer}
                  onChange={handleSearchChange}
                  sx={{ borderRadius: "10px" }}
                  placeholder="Pesquisa"
                  size="small"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <img src={IconSeacher} alt="iconSearch" />
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
            </div>
          </section>
          {hasSearchChangedCustomer && filteredRows.length === 0 ? (
            <SearchNotFound />
          ) : (
            <ClientTable
              handleOpenDetail={handleOpenDetail}
              searchTermCustomer={searchTermCustomer}
              filteredRows={filteredRows}
              rows={rows}
            />
          )}
        </main>
      </div>
    </div>
  );
}

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

export default Clients;
