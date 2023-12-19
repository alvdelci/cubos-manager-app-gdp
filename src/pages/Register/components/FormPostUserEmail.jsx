import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useFormContext } from "react-hook-form";

export const FormPostUserEmail = ({ incrementStep }) => {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext();

  const nameValue = watch("name");
  const emailValue = watch("email");

  const isFormValid = !errors.name && !errors.email && nameValue && emailValue;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Typography
        component="h1"
        variant="h4"
        sx={{
          fontFamily: "Montserrat",
          fontWeight: 700,
          color: "secondary",
        }}
      >
        Adicione seus dados
      </Typography>

      <TextField
        margin="normal"
        required
        id="name"
        label="Nome"
        autoComplete="name"
        placeholder="Digite seu nome"
        autoFocus
        sx={{
          fontFamily: "Nunito",
          width: "100%",
        }}
        {...register("name")}
        error={errors?.name ? true : false}
        helperText={errors?.name ? errors.name.message : null}
      />
      <TextField
        margin="normal"
        required
        label="Email"
        type="email"
        id="email"
        placeholder="Digite seu e-mail"
        autoComplete="email"
        sx={{
          fontFamily: "Nunito",
          width: "100%",
        }}
        {...register("email")}
        error={errors?.email ? true : false}
        helperText={errors?.email ? errors.email.message : null}
      />
      <Button
        variant="contained"
        disabled={!isFormValid}
        onClick={incrementStep}
        sx={{
          fontFamily: "Nunito",
          textTransform: "none",
          borderRadius: "10px",
          marginTop: "10px",
          padding: "4px 40px",
        }}
      >
        Continuar
      </Button>

      <Typography
        sx={{
          marginTop: "10px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Já possui uma conta? Faça seu
        <Link href="/login" sx={{ paddingLeft: "4px", fontWeight: 600 }}>
          {"Login"}
        </Link>
      </Typography>
    </Box>
  );
};
