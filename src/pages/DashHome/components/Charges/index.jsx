import "./styles.css";
import { useNavigate } from "react-router-dom";
import downArrow from "../../../../assets/downArrow.svg";
import chargesDash from "../../../../assets/chargesDash.svg";
import ChargesTable from "../TablesCharges";
import Filter from "../../../../assets/filter.svg";
import IconSeacher from "../../../../assets/iconseacher.svg";
import { TextField, InputAdornment } from "@mui/material";
import ModalHome from "../../../DashHome/components/ModalHome/modalHome";
import { useState, useRef, useEffect } from "react";
import SearchNotFound from "../../../../components/SearchNotFound";

import { getBillings } from "../../../../api/billings";

function Charges() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const downArrowRef = useRef(null);
  const [searchTermBilling, setSearchTermBilling] = useState("");

  const [rows, setRows] = useState([]);

  const [hasSearchChangedBilling, setHasSearchChangedBilling] = useState(false);

  const [filteredRows, setFilteredRows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, status, error } = await getBillings();

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
  }, []);

  useEffect(() => {
    // Filter rows based on the search term
    const filtered = rows.filter((row) =>
      row.customer.name.toLowerCase().includes(searchTermBilling.toLowerCase())
    );
    setFilteredRows(filtered);
  }, [searchTermBilling, rows]); // Atualize os resultados filtrados quando o termo de pesquisa ou as linhas mudarem

  const handleSearchChange = (e) => {
    setSearchTermBilling(e.target.value);
    setHasSearchChangedBilling(true);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="containerHomeCharges">
      <div className="containerSummariesData">
        <header className="collectionTitleCharges">
          <h1>Cobranças</h1>
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

        <main className="containerMainCharges">
          <section className="summariesCharges">
            <div className="titleSummariesCharges">
              <div>
                <img src={chargesDash} alt="Paid Charges Image" />
              </div>
              <div>
                <h3>Cobranças</h3>
              </div>
            </div>
            <div className="summariesFilterCharges">
              <div>
                <img
                  className="filterCharges"
                  src={Filter}
                  alt="Paid Charges Image"
                />
              </div>
              <div className="searcher">
                <TextField
                  value={searchTermBilling}
                  onChange={handleSearchChange}
                  sx={{ borderRadius: "10px" }}
                  size="small"
                  placeholder="Pesquisa"
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
          {hasSearchChangedBilling && filteredRows.length === 0 ? (
            <SearchNotFound />
          ) : (
            <ChargesTable
              searchTermBilling={searchTermBilling}
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

export default Charges;
