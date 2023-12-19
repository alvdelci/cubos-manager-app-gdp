import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Arrows from "../../../../assets/arrows.svg";
import pinkCharges from "../../../../assets/pinkCharges.svg";

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
  padding: "0px",
  borderRadius: "8px",
  background: "#FFEFEF",
  color: "#971D1D",
  fontFamily: "Nunito",
  fontSize: "14px",
  fontStyle: "normal",
  fontWeight: "600",
};

const tableStatusPaga = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "0px",
  borderRadius: "8px",
  background: "#EEF6F6",
  color: "#1FA7AF",
  fontFamily: "Nunito",
  fontSize: "14px",
  fontStyle: "normal",
  fontWeight: "600",
};

function getStatusStyle(billing) {
  const status = billing.length > 0 ? billing[0].status : ""; // Access the status from the first item in the billing array
  switch (status) {
    case "Vencida":
      return tableStatusVencida;
    case "Em dia":
      return tableStatusPaga;
    default:
      return {};
  }
}

export default function ClientTable({
  handleOpenDetail,
  searchTermCustomer,
  rows,
}) {
  const filteredRows = rows.filter((row) =>
    row.name.toLowerCase().includes(searchTermCustomer.toLowerCase())
  );

  return (
    <TableContainer sx={tableContainer} component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={tableStylesTitle}>
              <img src={Arrows} alt="setas" /> Cliente
            </TableCell>
            <TableCell sx={tableStylesTitle} align="left">
              CPF
            </TableCell>
            <TableCell sx={tableStylesTitle} align="left">
              E-mail
            </TableCell>
            <TableCell sx={tableStylesTitle} align="left">
              Telefone
            </TableCell>
            <TableCell sx={tableStylesTitle} align="center">
              Status
            </TableCell>
            <TableCell sx={tableStylesTitle} align="center">
              Criar Cobrança
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredRows.map((row) => (
            <TableRow
              key={row.id}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
                cursor: "pointer",
              }}
            >
              <TableCell
                sx={tableStylesText}
                component="th"
                scope="row"
                onClick={handleOpenDetail}
              >
                {row.name}
              </TableCell>
              <TableCell
                sx={tableStylesText}
                align="left"
                onClick={handleOpenDetail}
              >
                {row.cpf}
              </TableCell>
              <TableCell
                sx={tableStylesText}
                align="left"
                onClick={handleOpenDetail}
              >
                {row.email}
              </TableCell>
              <TableCell
                sx={tableStylesText}
                align="left"
                onClick={handleOpenDetail}
              >
                {row.phone}
              </TableCell>
              <TableCell align="left">
                <TableCell sx={getStatusStyle(row.billing)} align="left">
                  {row.billing.length > 0 ? row.billing[0].status : ""}
                </TableCell>
              </TableCell>
              <TableCell align="center">
                {row.create_charges}
                <button
                  style={{
                    border: "none",
                    background: "none",
                    cursor: "pointer",
                  }}
                >
                  <img src={pinkCharges} alt="create charges" />
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
