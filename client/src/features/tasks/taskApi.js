import API from "../../api/axios.js"; // your axios instance

export const getTasks = async () => {
  const res = await API.get("/tasks");
  return res.data;
};

export const createTask = async (task) => {
  const res = await API.post("/tasks", task);
  return res.data;
};

export const updateTask = async (task) => {
  const { _id, ...rest } = task; // separate ID from data
  const res = await API.put(`/tasks/${_id}`, rest); // ID goes in URL
  return res.data;
};

export const deleteTask = async (id) => {
  const res = await API.delete(`/tasks/${id}`);
  return res.data;
};