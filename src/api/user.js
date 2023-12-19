import api from ".";

const userCheckEmailAvailability = async (email) => {
  try {
    const response = await api.get("/user/checkemail", { email });

    return { data: response.data, status: response.status };
  } catch (error) {
    return { error };
  }
};

const postUser = async (name, email, password) => {
  try {
    const response = await api.post("/user", { name, email, password });

    return { data: response.data, status: response.status };
  } catch (error) {
    return { error };
  }
};

const updateUser = async (userData) => {
  try {
    const token = localStorage.getItem("token");

    const response = await api.put("/user", userData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return { data: response.data, status: response.status };
  } catch (error) {
    return { error };
  }
};

export { userCheckEmailAvailability, postUser, updateUser };
