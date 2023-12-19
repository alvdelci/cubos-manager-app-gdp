import api from ".";

const postBilling = async (billingData) => {
  try {
    const token = localStorage.getItem("token");

    const response = await api.post("/billing", billingData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return { data: response.data, status: response.status };
  } catch (error) {
    return { error };
  }
};

const getBilling = async (id) => {
  try {
    const token = localStorage.getItem("token");

    const response = await api.get(`/billing/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return { data: response.data, status: response.status };
  } catch (error) {
    return { error };
  }
};

const getBillings = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await api.get("/billing", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return { data: response.data, status: response.status };
  } catch (error) {
    return { error };
  }
};

const filterBillings = async (data) => {
  try {
    const token = localStorage.getItem("token");

    const response = await api.get("/filter/billing", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return { data: response.data, status: response.status };
  } catch (error) {
    return { error };
  }
};

const getOverview = async (data) => {
  try {
    const token = localStorage.getItem("token");

    const response = await api.get("/overview", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return { data: response.data, status: response.status };
  } catch (error) {
    return { error };
  }
};

export { postBilling, getBilling, getBillings, filterBillings, getOverview };
