import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useFormContext } from "react-hook-form";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";

export const FormPostUserPassword = ({ onSubmit }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClickShowPassword = (field) => {
    if (field === "password") {
      setShowPassword((show) => !show);
    } else if (field === "confirmPassword") {
      setShowConfirmPassword((show) => !show);
    }
  };

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
        Escolha uma senha
      </Typography>

      <TextField
        margin="normal"
        required
        id="password"
        label="Senha"
        autoComplete="password"
        placeholder="Digite sua senha"
        autoFocus
        sx={{
          fontFamily: "Nunito",
          width: "100%",
        }}
        {...register("password")}
        error={!!errors.password}
        helperText={errors.password?.message || ""}
        type={showPassword ? "text" : "password"}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => handleClickShowPassword("password")}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <TextField
        margin="normal"
        required
        label="Repita a senha"
        id="confirmPassword"
        placeholder="Confirme sua senha"
        autoComplete="password"
        sx={{
          fontFamily: "Nunito",
          width: "100%",
        }}
        {...register("confirmPassword")}
        error={!!errors.confirmPassword}
        helperText={errors.confirmPassword?.message || ""}
        type={showConfirmPassword ? "text" : "password"}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => handleClickShowPassword("confirmPassword")}
                edge="end"
              >
                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <Button
        type="submit"
        disabled={Object.keys(errors).length > 0}
        variant="contained"
        sx={{
          margin: "auto",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Nunito",
          textTransform: "none",
          borderRadius: "10px",
          marginTop: "10px",
          padding: "4px 40px",
        }}
      >
        Finalizar cadastro
      </Button>

      <Typography
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "10px",
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
