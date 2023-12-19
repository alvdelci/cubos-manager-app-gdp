import Modal from "@mui/material/Modal";
import { useState } from "react";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import Button from "@mui/material/Button";

import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { TextField } from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import InputAdornment from "@mui/material/InputAdornment";

import { yupResolver } from "@hookform/resolvers/yup";

import { useForm, FormProvider } from "react-hook-form";

import schemaPutUser from "../../schemas/schemaPutUser";

import { updateUser, userCheckEmailAvailability } from "../../api/user";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "32rem",
  height: "40rem",
  borderRadius: "30px",
  bgcolor: "background.paper",

  boxShadow: 24,
  display: "flex",
  flexDirection: "column",
  padding: "3rem",
  justifyContent: "center",
  alignItems: "center",
};

const TitleStyle = {
  fontFamily: "Montserrat",
  fontStyle: "normal",
  fontWeight: "700",
  lineHeight: "130%",
};

export const ModalPutUser = ({ handleClose, open }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClickShowPassword = (field) => {
    if (field === "password") {
      setShowPassword((show) => !show);
    } else if (field === "confirmPassword") {
      setShowConfirmPassword((show) => !show);
    }
  };

  const putUserForm = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "all",
    resolver: yupResolver(schemaPutUser),
  });
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = putUserForm;

  const onSubmit = async (param) => {
    try {
      const { email, ...paramWithoutConfirmPassword } = param;

      const { data } = await userCheckEmailAvailability(email);

      console.log(data);

      // const { data } = await updateUser(paramWithoutConfirmPassword);
    } catch (error) {
      console.log(error);
      console.error("Erro ao atualizar usuário:", error);
    }
  };

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Box sx={{ ...style, justifyContent: "center" }}>
          <IconButton
            edge="end"
            color="#3F3F55"
            onClick={handleClose}
            aria-label="close"
            sx={{
              position: "absolute",
              top: "0",
              right: "0",
              paddingRight: "1.8rem",
              paddingTop: "1rem",
            }}
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ...TitleStyle }} variant="h4">
            Edite seu cadastro
          </Typography>
          <FormProvider {...putUserForm}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                margin="normal"
                required
                id="name"
                label="Nome"
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
                sx={{
                  fontFamily: "Nunito",
                  width: "100%",
                }}
                {...register("email")}
                error={errors?.email ? true : false}
                helperText={errors?.email ? errors.email.message : null}
              />
              <div
                style={{
                  display: "flex",
                  gap: 20,
                }}
              >
                <TextField
                  margin="normal"
                  id="cpf"
                  label="CPF"
                  placeholder="Digite seu CPF"
                  sx={{
                    fontFamily: "Nunito",
                  }}
                  {...register("cpf")}
                  error={errors?.cpf ? true : false}
                  helperText={errors?.cpf ? errors.cpf.message : null}
                  onChange={(e) => {
                    e.target.value = e.target.value.replace(/[^0-9]/g, "");
                  }}
                />
                <TextField
                  margin="normal"
                  label="Telefone"
                  type="phone"
                  id="phone"
                  placeholder="Digite seu telefone"
                  sx={{
                    fontFamily: "Nunito",
                  }}
                  {...register("phone")}
                  error={errors?.phone ? true : false}
                  helperText={errors?.phone ? errors.phone.message : null}
                  onChange={(e) => {
                    e.target.value = e.target.value.replace(/[^0-9]/g, "");
                  }}
                />
              </div>
              <TextField
                margin="normal"
                id="password"
                label="Nova Senha"
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
              <TextField
                margin="normal"
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
                        onClick={() =>
                          handleClickShowPassword("confirmPassword")
                        }
                        edge="end"
                      >
                        {showConfirmPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                type="submit"
                variant="contained"
                sx={{
                  width: "10rem",
                  display: "flex",
                  justifyContent: "center",
                  margin: "auto",
                }}
              >
                Aplicar
              </Button>
            </form>
          </FormProvider>
        </Box>
      </Modal>
    </>
  );
};
