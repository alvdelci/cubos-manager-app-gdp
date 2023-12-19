import api from ".";

const customerCheckEmailAvailability = async (email) => {
  try {
    const response = await api.get("/customer/checkemail", email);

    return { data: response.data, status: response.status };
  } catch (error) {
    return { error };
  }
};

const postCustomer = async (customerData) => {
  try {
    const token = localStorage.getItem("token");

    const response = await api.post("/customer", customerData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);
    return { data: response.data, status: response.status };
  } catch (error) {
    return { error };
  }
};

const getCustomer = async (id) => {
  try {
    const token = localStorage.getItem("token");

    const response = await api.get(`/customer/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return { data: response.data, status: response.status };
  } catch (error) {
    return { error };
  }
};

const getCustomers = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await api.get("/customer", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return { data: response.data, status: response.status };
  } catch (error) {
    return { error };
  }
};

const updateCustomer = async (customerData) => {
  try {
    const token = localStorage.getItem("token");

    const response = await api.put("/customer", customerData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return { data: response.data, status: response.status };
  } catch (error) {
    return { error };
  }
};

const filterCustomers = async (data) => {
  try {
    const token = localStorage.getItem("token");

    const response = await api.get("/filter/customer", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return { data: response.data, status: response.status };
  } catch (error) {
    return { error };
  }
};

export {
  customerCheckEmailAvailability,
  postCustomer,
  getCustomer,
  getCustomers,
  updateCustomer,
  filterCustomers,
};
