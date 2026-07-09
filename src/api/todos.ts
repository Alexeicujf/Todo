import { apiInstance } from "./instance";

export const getTodo = (id: number) => {
  return apiInstance.get(`/todos/${id}`).then((res) => res.data);
};

export const getTodos = (userId: number) => {
  return apiInstance
    .get("/todos", { params: { userId } })
    .then((res) => res.data);
};

export const createTodoRequest = (todoData: {
  title: string;
  description?: string;
  list: number;
  userId: number;
}) => {
  return apiInstance.post("/todos", todoData).then((res) => res.data);
};

export const checkTodoRequest = (id: number, check: boolean) => {
  return apiInstance.patch(`/todos/${id}`, { check }).then((res) => res.data);
};

export const removeTodoRequest = (id: number) => {
  return apiInstance.delete(`/todos/${id}`).then((res) => res.data);
};

export const updateTodoRequest = (
  todoData: { title: string; description?: string },
  id: number
) => {
  return apiInstance.patch(`/todos/${id}`, todoData).then((res) => res.data);
};
