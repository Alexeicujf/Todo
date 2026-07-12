import { apiInstance } from "@/api/instance";

export interface TodoData {
  id: number;
  title: string;
  description?: string;
  check: boolean;
  list: number;
  userId: number;
}

export const getTodo = (id: number) => {
  return apiInstance.get<TodoData>(`/todos/${id}`).then((res) => res.data);
};

export const getTodos = (userId: number) => {
  return apiInstance
    .get<TodoData[]>("/todos", { params: { userId } })
    .then((res) => res.data);
};

export const createTodoRequest = (todoData: {
  title: string;
  description?: string;
  list: number;
  userId: number;
}) => {
  return apiInstance.post<TodoData>("/todos", todoData).then((res) => res.data);
};

export const checkTodoRequest = (id: number, check: boolean) => {
  return apiInstance
    .patch<TodoData>(`/todos/${id}`, { check })
    .then((res) => res.data);
};

export const removeTodoRequest = (id: number) => {
  return apiInstance
    .delete<{ success: boolean; id: number }>(`/todos/${id}`)
    .then((res) => res.data);
};

export const updateTodoRequest = (
  todoData: { title: string; description?: string },
  id: number
) => {
  return apiInstance
    .patch<TodoData>(`/todos/${id}`, todoData)
    .then((res) => res.data);
};
