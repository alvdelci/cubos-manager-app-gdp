import Modal from "@mui/material/Modal";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import InputAdornment from "@mui/material/InputAdornment";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, FormProvider, Controller } from "react-hook-form";
import schemaPutBilling from "../../schemas/schemaPutBilling";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateField } from "@mui/x-date-pickers/DateField";
import IconCharges from "../../assets/charges.svg";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "35rem",
  height: "45rem",
  borderRadius: "30px",
  bgcolor: "background.paper",
  display: "flex",
  flexDirection: "column",
  padding: "3rem",
  justifyContent: "center",
  alignItems: "center",
};

const TitleStyle = {
  display: "flex",
  justifyContent: "flex",
  fontFamily: "Montserrat",
  fontStyle: "normal",
  fontWeight: "700",
  lineHeight: "130%",
};

export const ModalPutBilling = ({ handleClose, open }) => {
  const [selectedOption, setSelectedOption] = useState();

  const putBillingForm = useForm({
    defaultValues: {
      name: "",
      description: "",
      dueDate: "",
      value: "",
      status: "",
    },
    mode: "all",
    resolver: yupResolver(schemaPutBilling),
  });
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = putBillingForm;

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const onSubmit = async (data) => {
    try {
      console.log(data);
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
    }
  };

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            ...style,
            justifyContent: "flex-start",
            paddingTop: "4rem",
            alignItems: "flex-start",
          }}
        >
          <IconButton
            edge="end"
            onClick={handleClose}
            aria-label="close"
            sx={{
              position: "absolute",
              top: "0",
              right: "0",
              paddingRight: "1.8rem",
              paddingTop: "1rem",
              color: "#3F3F55",
            }}
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ...TitleStyle }} variant="h4">
            <img src={IconCharges} alt="iconCharges" />
            Edição de Cobrança
          </Typography>
          <FormProvider {...putBillingForm}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                margin="normal"
                required
                id="name"
                label="Nome"
                placeholder="Digite o nome do Cliente"
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
                id="description"
                label="Descrição"
                placeholder="Digite a descrição"
                multiline
                rows={2}
                {...register("description")}
                sx={{ width: "100%", paddingBottom: "2rem" }}
              />
              <Box sx={{ display: "flex", flexDirection: "row", gap: 4 }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateField
                    required
                    label="Vencimento"
                    format="DD/MM/YYYY"
                    {...register("dueDate")}
                  />
                </LocalizationProvider>
                <TextField
                  required
                  type="number"
                  id="valor"
                  label="Valor"
                  placeholder="Digite o Valor"
                  autoComplete="off"
                  onChange={(e) => {
                    e.target.value = e.target.value.replace(/[^0-9]/g, "");
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">R$</InputAdornment>
                    ),
                  }}
                  {...register("value")}
                />
              </Box>
              <FormControl>
                <FormLabel
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    marginTop: "1rem",
                    width: "100%",
                  }}
                  id="status-label"
                >
                  Status
                </FormLabel>
                <Controller
                  name="status"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <RadioGroup
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        marginTop: "1rem",
                        gap: "1rem",
                        width: "100%",
                      }}
                      value={field.value}
                      onChange={(e) => field.onChange(e.target.value)}
                    >
                      <FormControlLabel
                        sx={{
                          display: "flex",
                          borderRadius: "10px",
                          backgroundColor: "#F0F0F5",
                          width: "100%",
                        }}
                        value="Paga"
                        control={
                          <Radio
                            sx={{ "&.Mui-checked": { color: "#0E8750" } }}
                          />
                        }
                        label="Cobrança Paga"
                      />
                      <FormControlLabel
                        sx={{
                          display: "flex",
                          borderRadius: "10px",
                          backgroundColor: "#F0F0F5",
                          width: "30rem",
                        }}
                        value=""
                        control={
                          <Radio
                            sx={{ "&.Mui-checked": { color: "#0E8750" } }}
                          />
                        }
                        label="Cobrança Pendente"
                      />
                    </RadioGroup>
                  )}
                />
              </FormControl>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  marginTop: "6rem",
                  gap: "3rem",
                }}
              >
                <Button
                  onClick={handleClose}
                  variant="contained"
                  sx={{
                    width: "13rem",
                    display: "flex",
                    justifyContent: "center",
                    color: "#0E8750",
                    border: "1px solid #DEDEE9",
                    background: "#F8F8F9",
                    "&:hover": {
                      "&:hover": {
                        background: "rgba(248, 248, 249, 0.2)",
                      },
                    },
                  }}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    width: "13rem",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  Aplicar
                </Button>
              </Box>
            </form>
          </FormProvider>
        </Box>
      </Modal>
    </>
  );
};
