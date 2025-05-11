const BASE_URL = "http://localhost:5000/api" || `${import.meta.env.VITE_BACKEND_URL}/api`;

// Helper to handle fetch responses
async function handleFetch(url, options) {
  const res = await fetch(url, options);
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Something went wrong");
  return data;
}

export const getSections = () => handleFetch(`${BASE_URL}/sections`);
export const createSection = (title) =>
  handleFetch(`${BASE_URL}/sections`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });

export const getTasks = () => handleFetch(`${BASE_URL}/tasks`);
export const createTask = (task) =>
  handleFetch(`${BASE_URL}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });

export const updateTask = (id, data) =>
  handleFetch(`${BASE_URL}/tasks/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

export const deleteTask = (id) =>
  handleFetch(`${BASE_URL}/tasks/${id}`, { method: "DELETE" });
