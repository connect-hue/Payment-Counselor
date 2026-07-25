const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const handleResponse = async (response) => {
  if (!response.ok) {
    let errorMessage = "An error occurred while communicating with the server.";
    try {
      const data = await response.json();
      errorMessage = data.message || errorMessage;
    } catch (e) {
      // response is not JSON
    }
    throw new Error(errorMessage);
  }

  try {
    return await response.json();
  } catch (e) {
    return null;
  }
};

export const apiClient = {
  get: async (endpoint) => {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "GET",
      headers: {
        "Accept": "application/json",
      },
      credentials: "include",
    });
    return handleResponse(response);
  },

  post: async (endpoint, data, isMultipart = false) => {
    const headers = {
      "Accept": "application/json",
    };

    if (!isMultipart) {
      headers["Content-Type"] = "application/json";
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "POST",
      headers,
      credentials: "include",
      body: isMultipart ? data : JSON.stringify(data),
    });
    return handleResponse(response);
  },

  patch: async (endpoint, data, isMultipart = false) => {
    const headers = {
      "Accept": "application/json",
    };

    if (!isMultipart) {
      headers["Content-Type"] = "application/json";
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "PATCH",
      headers,
      credentials: "include",
      body: isMultipart ? data : JSON.stringify(data),
    });
    return handleResponse(response);
  },

  delete: async (endpoint) => {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "DELETE",
      headers: {
        "Accept": "application/json",
      },
      credentials: "include",
    });
    return handleResponse(response);
  },
};
