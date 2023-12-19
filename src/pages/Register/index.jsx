import "./styles.css";
import { useState } from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { FormPostUserEmail } from "./components/FormPostUserEmail";

import { yupResolver } from "@hookform/resolvers/yup";

import { useForm, FormProvider } from "react-hook-form";

import Box from "@mui/material/Box";
import { FormPostUserPassword } from "./components/FormPostUserPassword";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Typography from "@mui/material/Typography";
import schemaPostUser from "../../schemas/schemaPostUser";
import { makeStyles } from "@material-ui/core";

import { ToastContainer } from "react-toastify";
import { postUser } from "../.../../../api/user";
import CardUserSucessRegister from "./components/CardUserSucessRegister";
import useMediaQuery from "@mui/material/useMediaQuery";

const steps = [
  {
    label: "Cadastre-se",
    description: `Por favor, escreva seu nome e e-mail`,
  },
  {
    label: "Escolha uma senha",
    description: "Escolha uma senha segura",
  },
  {
    label: "Cadastro realizado com sucesso",
    description: `E-mail e senha cadastrados com sucesso`,
  },
];

const useStyles = makeStyles(() => ({
  root: {
    "& .Mui-active .MuiStepIcon-root": { color: "#0E8750" },
    "& .Mui-completed .MuiStepIcon-root": {
      color: "#0E8750",
    },
    "& .Mui-disabled .MuiStepIcon-root": {
      color: "#F0F0F5",
    },
  },
}));

function UserRegister() {
  const [activeStep, setActiveStep] = useState(0);
  const methods = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "all",
    resolver: yupResolver(schemaPostUser),
  });
  const { handleSubmit } = methods;

  const incrementStep = () => {
    setActiveStep((activeStep) => activeStep + 1);
  };

  const onSubmit = async ({ name, email, password }) => {
    try {
      const { data } = await postUser(name, email, password);
      console.log(data);
      incrementStep();
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
    }
  };

  const isSmallScreen = useMediaQuery("(max-width:600px)");

  const stepperStyle = useStyles();

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <Grid
        item
        sm={4}
        md={4}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {!isSmallScreen && (
            <Stepper
              className={stepperStyle.root}
              activeStep={activeStep}
              orientation="vertical"
            >
              {steps.map((step) => (
                <Step key={step.label}>
                  <StepLabel>
                    <label className="step-label">{step.label}</label>
                  </StepLabel>
                  <StepContent>
                    <Typography className="step-description">
                      {step.description}
                    </Typography>
                  </StepContent>
                </Step>
              ))}
            </Stepper>
          )}
        </Box>
      </Grid>
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
          <form onSubmit={handleSubmit(onSubmit)}>
            {activeStep === 0 && (
              <FormPostUserEmail incrementStep={incrementStep} />
            )}
            {activeStep === 1 && <FormPostUserPassword onSubmit={onSubmit} />}
            {activeStep === 2 && <CardUserSucessRegister />}
          </form>
        </FormProvider>
      </Grid>
      <ToastContainer />
    </Grid>
  );
}

export default UserRegister;
