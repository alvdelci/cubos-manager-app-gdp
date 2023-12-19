import api from ".";

const postLogin = async (email, password) => {
  try {
    const response = await api.post("/login", {
      email,
      password,
    });

    return { data: response.data, status: response.status };
  } catch (error) {
    return { error };
  }
};

export default postLogin;
