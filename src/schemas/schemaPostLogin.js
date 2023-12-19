
import * as Yup from "yup";

const schemaPostLogin = Yup.object().shape({
  email: Yup.string()
    .email("Formato inválido de email")
    .required("O campo email é obrigatório")
    .max(255, "O campo email pode ter no máximo 255 caracteres"),

  password: Yup.string()
    .required("O campo senha é obrigatório")
    .min(8, "A senha precisa ter no mínimo 8 caracteres")
    .max(255, "O campo senha pode ter no máximo 255 caracteres"),
});

export default schemaPostLogin;