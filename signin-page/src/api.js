const API = "http://localhost:5000/api";

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const signup = async (payload) => {
  const res = await fetch(`${API}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return res.json();
};

export const signin = async (payload) => {
  const res = await fetch(`${API}/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  console.log("SIGNIN RESPONSE:", data);
  return data;
};

export const addTask = async (payload) => {
  const res = await fetch(`${API}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(),
    },
    body: JSON.stringify(payload),
  });
  return res.json();
};

export const getTasks = async () => {
  const res = await fetch(`${API}/tasks`, {
    headers: {
      ...getAuthHeader(),
    },
  });
  return res.json();
};

export const updateTask = async (id, payload) => {
  const res = await fetch(`${API}/tasks/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(),
    },
    body: JSON.stringify(payload),
  });
  return res.json();
};

export const deleteTask = async (id) => {
  try {
    const res = await fetch(`${API}/tasks/${id}`, {
      method: "DELETE",
      headers: {
        ...getAuthHeader(),
      },
    });
    return await res.json();
  } catch (err) {
    console.error("Failed to delete task", err);
    return { msg: "Deletion failed" };
  }
};
