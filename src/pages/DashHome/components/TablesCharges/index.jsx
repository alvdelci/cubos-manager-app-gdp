import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Arrows from "../../../../assets/arrows.svg";
import EditCharges from "../../../../assets/editCharges.svg";
import DetailCharge from "../../../../components/DetailCharge";
import DeleteCharges from "../../../../components/AttentionModal";
import { ModalPutBilling } from "../../../../components/ModalPutBilling";

const tableContainer = {
  display: "flex",
  padding: "12px 23px",
  gap: "10px",
  borderRadius: "30px",
  background: "#FFF",
};

const tableStylesTitle = {
  color: "#3F3F55",
  fontFamily: "Nunito",
  fontSize: "16px",
  fontStyle: "normal",
  fontWeight: "700",
  lineHeight: "50px",
};

const tableStylesText = {
  color: "#6E6E85",
  fontFamily: "Nunito",
  fontSize: "14px",
  fontStyle: "normal",
  fontWeight: "400",
  lineHeight: "40px",
  letterSpacing: "0.07px",
};

const tableStatusVencida = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "0px 5px",
  borderRadius: "8px",
  background: "#FFEFEF",
  color: "#971D1D",
  fontFamily: "Nunito",
  fontSize: "14px",
  fontStyle: "normal",
  fontWeight: "600",
  lineHeight: "normal",
};

const tableStatusPendente = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "0px 5px",
  borderRadius: "8px",
  background: "#FCF6DC",
  color: "#C5A605",
  fontFamily: "Nunito",
  fontSize: "14px",
  fontStyle: "normal",
  fontWeight: "600",
  lineHeight: "normal",
};

const tableStatusPaga = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "0px 5px",
  borderRadius: "8px",
  background: "#EEF6F6",
  color: "#1FA7AF",
  fontFamily: "Nunito",
  fontSize: "14px",
  fontStyle: "normal",
  fontWeight: "600",
  lineHeight: "normal",
};

function getStatusStyle(status) {
  switch (status) {
    case "Vencida":
      return tableStatusVencida;
    case "Pendente":
      return tableStatusPendente;
    case "Paga":
      return tableStatusPaga;
    default:
      return {};
  }
}

export default function ChargesTable({
  searchTermBilling,
  rows,
  filteredRows,
}) {
  const [showDetail, setShowDetail] = useState(false);
  const [details, setDetails] = useState({
    customer: {
      name: "",
    },
    description: "",
    dueDate: "",
    id: "",
    status: "",
    value: "",
  });

  const [showEditModal, setShowEditModal] = useState(false);
  const [editDetails, setEditDetails] = useState({
    customer: {
      name: "",
    },
    description: "",
    dueDate: "",
    id: "",
    status: "",
    value: "",
  });

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const formatData = (data) => {
    const splited = data.substr(0, 10).split("-");

    return `${splited[2]}/${splited[1]}/${splited[0]}`;
  };

  const toggleShowDetail = () => {
    setShowDetail(!showDetail);
  };

  const toggleShowEditModal = () => {
    setIsEditModalOpen(!isEditModalOpen);
  };

  const handleEditClick = (row) => {
    setEditDetails(row);
    toggleShowEditModal();
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  return (
    <TableContainer sx={tableContainer} component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={tableStylesTitle}>
              <img src={Arrows} alt="setas" /> Cliente
            </TableCell>
            <TableCell sx={tableStylesTitle} align="left">
              <img src={Arrows} alt="setas" />
              ID Cob.
            </TableCell>
            <TableCell sx={tableStylesTitle} align="left">
              Valor
            </TableCell>
            <TableCell sx={tableStylesTitle} align="left">
              Data de venc.
            </TableCell>
            <TableCell sx={tableStylesTitle} align="center">
              Status
            </TableCell>
            <TableCell sx={tableStylesTitle} align="left">
              Descrição
            </TableCell>
            <TableCell sx={tableStylesTitle} align="right"></TableCell>
            <TableCell sx={tableStylesTitle} align="left"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredRows.map((row) => (
            <TableRow
              key={row.id}
              sx={{
                "&:last-child td, &:last-child th": {
                  border: 0,
                },
                cursor: "pointer",
              }}
            >
              <TableCell
                onClick={() => {
                  setDetails(row);
                  toggleShowDetail();
                }}
                sx={tableStylesText}
                component="th"
                scope="row"
              >
                {row.customer.name}
              </TableCell>
              <TableCell
                onClick={() => {
                  setDetails(row);
                  toggleShowDetail();
                }}
                sx={tableStylesText}
                align="left"
              >
                {row.id}
              </TableCell>
              <TableCell
                onClick={() => {
                  setDetails(row);
                  toggleShowDetail();
                }}
                sx={tableStylesText}
                align="left"
              >
                <span>R$</span>
                {row.value / 100}
              </TableCell>
              <TableCell
                onClick={() => {
                  setDetails(row);
                  toggleShowDetail();
                }}
                sx={tableStylesText}
                align="left"
              >
                {formatData(row.dueDate)}
              </TableCell>
              <TableCell
                onClick={() => {
                  setDetails(row);
                  toggleShowDetail();
                }}
                align="left"
              >
                <TableCell sx={getStatusStyle(row.status)} align="left">
                  {row.status}
                </TableCell>
              </TableCell>
              <TableCell
                onClick={() => {
                  setDetails(row);
                  toggleShowDetail();
                }}
                sx={tableStylesText}
                align="left"
              >
                {row.description}
              </TableCell>
              <TableCell sx={tableStylesText} align="right">
                <img
                  src={EditCharges}
                  alt="Edit"
                  onClick={() => handleEditClick(row)}
                  style={{ cursor: "pointer" }}
                />
              </TableCell>
              <TableCell sx={tableStylesText} align="left">
                <DeleteCharges> </DeleteCharges>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {showDetail && (
        <DetailCharge
          show={showDetail}
          handleClose={toggleShowDetail}
          name={details.customer.name}
          description={details.description}
          data={details.dueDate}
          id={details.id}
          value={details.value}
          status={details.status}
        />
      )}
      {isEditModalOpen && (
        <ModalPutBilling open={isEditModalOpen} handleClose={closeEditModal} />
      )}
    </TableContainer>
  );
}
