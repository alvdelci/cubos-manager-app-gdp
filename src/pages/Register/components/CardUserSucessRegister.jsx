import { Box, Button, Container, Typography } from "@mui/material";
import RegisterSucessImg from "../../../assets/registerSucess.svg";

function CardUserSucessRegister() {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "24px",
      }}
    >
      <Container sx={{ display: "flex" }}>
        <Box
          sx={{
            flexGrow: 1,
          }}
        >
          <Container
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "24px",
              width: "30rem",
              height: "30rem",
              borderRadius: "30px",
              backgroundColor: "#F0F0F5",
            }}
          >
            <img src={RegisterSucessImg} alt="RegisterSucess" />
            <Typography
              variant="h6"
              align="center"
              sx={{
                fontFamily: "Montserrat",
                color: "title",
                fontWeight: "700",
                lineHeight: "130%",
              }}
            >
              Cadastro realizado com sucesso!
            </Typography>
          </Container>
        </Box>
      </Container>
      <Button
        href="/login"
        sx={{
          fontFamily: "Nunito",
          textTransform: "none",
          borderRadius: "10px",
          padding: "4px 40px",
        }}
        variant="contained"
        size="small"
      >
        Ir para Login
      </Button>
    </Container>
  );
}

export default CardUserSucessRegister;
