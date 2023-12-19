
import * as Yup from "yup";

const schemaPostUser = Yup.object().shape({
  name: Yup.string()
    .required("O campo nome é obrigatório")
    .min(4, "O campo nome precisa ter no mínimo 4 caracteres")
    .max(255, "O campo nome pode ter no máximo 255 caracteres"),

  email: Yup.string()
    .email("Formato inválido de email")
    .required("O campo email é obrigatório")
    .max(255, "O campo email pode ter no máximo 255 caracteres"),

  password: Yup.string()
    .required("O campo senha é obrigatório")
    .min(8, "A senha precisa ter pelo menos 8 caracteres")
    .max(255, "O campo senha pode ter no máximo 255 caracteres"),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "As senhas precisam ser iguais")
    .required("Campo obrigatório"),
});

export default schemaPostUser;