import { useState } from "react";
import { useForm } from "react-hook-form";

import Close from "../../assets/icon-close.svg";
import Acc from "../../assets/client.svg";

import "./styles.css";
import { updateCustomer } from "../../api/customer";

const CustomerUpdate = ({ show, handleClose, userId }) => {
  const [availableCpf, setAvailableCpf] = useState(true);
  const [availableEmail, setAvailableEmail] = useState(true);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      cpf: "",
      cep: "",
      city: "",
      uf: "",
      address: "",
      complement: "",
      neighborhood: "",
    },
  });

  const onSubmit = async (data) => {
    await updateCustomer(data);
  };

  const handleCep = async (param) => {
    if (param.length == 8) {
      const response = await (
        await fetch(`https://viacep.com.br/ws/${param}/json/`)
      ).json();
      setValue("city", response.localidade);
      setValue("uf", response.uf);
    }
  };

  return (
    <>
      <div
        className="close-section"
        style={{
          display: show ? "block" : "none",
        }}
      />
      <div
        className="customer-register-container"
        style={{
          display: show ? "flex" : "none",
        }}
      >
        <div className="title">
          <img src={Acc} alt="" />
          <h1>Editar Cliente</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>Nome*</label>
          <input
            type="text"
            name="name"
            placeholder="Digite o nome"
            {...register("name", { required: true })}
            style={errors.name && { border: "1px solid #E70000" }}
          />
          {errors.name && <span>Este campo deve ser preenchido</span>}
          <label>E-mail*</label>
          <input
            type="email"
            name="email"
            placeholder="Digite o e-mail"
            {...register("email", { required: true })}
            style={
              errors.email || !availableEmail
                ? { border: "1px solid #E70000" }
                : {}
            }
          />
          {errors.email && <span>Este campo deve ser preenchido</span>}
          {!availableEmail && <span>E-mail já cadastrado</span>}

          <div className="cpf-phone">
            <div>
              <label>CPF*</label>
              <input
                type="text"
                name="cpf"
                placeholder="Digite o CPF"
                {...register("cpf", { required: true })}
                style={
                  errors.cpf || !availableCpf
                    ? { border: "1px solid #E70000" }
                    : {}
                }
              />
              {errors.cpf && <span>Este campo deve ser preenchido</span>}
              {!availableCpf && <span>CPF já cadastrado</span>}
            </div>
            <div>
              <label>Telefone*</label>
              <input
                type="text"
                name="phone"
                placeholder="Digite o telefone"
                {...register("phone", { required: true })}
                style={errors.phone && { border: "1px solid #E70000" }}
              />
              {errors.phone && <span>Este campo deve ser preenchido</span>}
            </div>
          </div>

          <label>Endereço</label>
          <input
            type="text"
            name="address"
            placeholder="Digite o endereço"
            {...register("address")}
          />
          <label>Complemento</label>
          <input
            type="text"
            name="complement"
            placeholder="Digite o complemento"
            {...register("complement")}
          />

          <div className="cep-bairro">
            <div>
              <label>CEP</label>
              <input
                type="number"
                name="cep"
                placeholder="Digite o CEP"
                {...register("cep")}
                onChange={(e) => handleCep(e.target.value)}
              />
            </div>
            <div>
              <label>Bairro</label>
              <input
                type="text"
                name="neighborhood"
                placeholder="Digite o bairro"
                {...register("neighborhood")}
              />
            </div>
          </div>

          <div className="cidade-uf">
            <div>
              <label>Cidade</label>
              <input
                type="text"
                name="city"
                placeholder="Digite a cidade"
                {...register("city")}
              />
            </div>
            <div>
              <label>UF</label>
              <input
                className="uf"
                type="text"
                name="uf"
                placeholder="Digite a UF"
                {...register("uf")}
              />
            </div>
          </div>

          <div className="buttons">
            <button onClick={handleClose} type="reset" className="cancel">
              Cancelar
            </button>
            <button type="submit" className="submit">
              Aplicar
            </button>
          </div>
        </form>

        <img className="icon-close" onClick={handleClose} src={Close} alt="" />
      </div>
    </>
  );
};

export default CustomerUpdate;
