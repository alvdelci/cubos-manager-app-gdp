// import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import HomePage from "./components/HomePage";
import Charges from "./components/Charges";
import Clients from "./components/Clients";
import DetailCustomer from "../../components/DetailCustomer";

const TabStyle = {
  fontFamily: "Nunito",
  fontWeight: "600",
  textTransform: "none",
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{}}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default function Dashboard() {
  const [value, setValue] = useState(0);
  const [openDetail, setOpenDetail] = useState(false);

  const handleOpenDetail = () => {
    setOpenDetail(true);
  };
  const handleCloseDetail = () => {
    setOpenDetail(false);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const goToChargesTab = () => {
    setValue(2);
  };

  const goToClient = () => {
    setValue(1);
  };

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
      }}
    >
      <Tabs
        orientation="vertical"
        value={value}
        onChange={handleChange}
        sx={{
          paddingTop: "3rem",
          backgroundColor: "#F0F0F5",
          width: "6rem",
        }}
      >
        <Tab label="Home" icon={<HomeOutlinedIcon />} sx={{ ...TabStyle }} />
        <Tab
          label="Clientes"
          icon={<PeopleOutlinedIcon />}
          sx={{ ...TabStyle }}
          onClick={handleCloseDetail}
        />
        <Tab
          label="Cobranças"
          icon={<InsertDriveFileOutlinedIcon />}
          sx={{ ...TabStyle }}
        />
      </Tabs>
      <TabPanel value={value} index={0}>
        <HomePage goToChargesTab={goToChargesTab} goToClient={goToClient} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        {openDetail ? (
          <DetailCustomer handleCloseDetail={handleCloseDetail} />
        ) : (
          <Clients handleOpenDetail={handleOpenDetail} />
        )}
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Charges />
      </TabPanel>
    </Box>
  );
}
