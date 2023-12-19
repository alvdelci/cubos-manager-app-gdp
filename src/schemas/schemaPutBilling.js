import * as Yup from "yup";

const schemaPutBilling = Yup.object().shape({
  name: Yup.string()
    .required("O campo nome é obrigatório")
    .min(4, "O campo nome precisa ter no mínimo 4 caracteres")
    .max(255, "O campo nome pode ter no máximo 255 caracteres"),

  description: Yup.string()
    .required()
    .min(5, "O campo descrição precisa ter no mínimo 4 caracteres")
    .max(255, "O campo pode ter no máximo 255 carateres"),

  dueDate: Yup.date().required(),

  value: Yup.number().required("O campo valor é obrigatório"),
  status: Yup.string()
    .required("O campo status é obrigatório")
    .min(3, "O campo status precisa ter no mínimo 3 caracteres")
    .max(255, "O campo pode ter no máximo 255 carateres"),
});

export default schemaPutBilling;
