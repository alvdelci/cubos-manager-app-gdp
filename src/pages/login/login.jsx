import { useNavigate } from "react-router-dom";
import isValidToken from "../../functions/isValidToken";
import postLogin from "../../api/postLogin";
import { useState } from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import schemaPostLogin from "../../schemas/schemaPostLogin";

import { FormProvider } from "react-hook-form";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Link } from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import bannerLogin from "../../assets/bannerLogin.png";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const methods = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "all",
    resolver: yupResolver(schemaPostLogin),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = methods;

  const passwordValue = watch("password");
  const emailValue = watch("email");

  const isFormValid =
    !errors.email && !errors.password && passwordValue && emailValue;

  const handleClickShowPassword = (field) => {
    if (field === "password") {
      setShowPassword((show) => !show);
    }
  };

  const handleSubmitData = async (data) => {
    const { email, password } = data;

    try {
      const { data } = await postLogin(email, password);

      data === undefined &&
        toast.error("Email e/ou senha inválidos", {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: false,
        });

      const { token } = data;

      localStorage.setItem("token", token);

      const userToken = localStorage.getItem("token");
      {
        isValidToken(userToken) && navigate("/home");
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <Grid
        item
        sm={4}
        md={4}
        sx={{
          display: "flex",
          backgroundImage: `url(${bannerLogin})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      ></Grid>
      <Grid
        item
        xs={12}
        sm={8}
        md={8}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        component={Paper}
        elevation={6}
        square
      >
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(handleSubmitData)}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-between",
                width: "400px",
              }}
            >
              <Typography
                component="h1"
                variant="h4"
                sx={{
                  fontFamily: "Montserrat",
                  fontWeight: 700,
                }}
              >
                Faça seu login!
              </Typography>
              <TextField
                autoFocus
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
                error={!!errors.email}
                helperText={errors?.email?.message || ""}
              />
              <TextField
                margin="normal"
                required
                id="password"
                label="Senha"
                autoComplete="password"
                placeholder="Digite sua senha"
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
              <Button
                type="submit"
                variant="contained"
                disabled={!isFormValid}
                sx={{
                  fontFamily: "Nunito",
                  textTransform: "none",
                  borderRadius: "10px",
                  marginTop: "10px",
                  padding: "4px 40px",
                }}
              >
                Entrar
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
                <Link
                  href="/register"
                  sx={{ paddingLeft: "4px", fontWeight: 600 }}
                >
                  {"Cadastre-se"}
                </Link>
              </Typography>
            </Box>
          </form>
        </FormProvider>

        <ToastContainer />
      </Grid>
    </Grid>
  );
}

export default Login;
