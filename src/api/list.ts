import { apiInstance } from "./instance";

export const getList = (id: number) => {
  return apiInstance.get(`/lists/${id}`).then((res) => res.data);
};

export const getLists = () => {
  return apiInstance.get("/lists").then((res) => res.data);
};

export const createListRequest = (listData: {
  title: string;
  description?: string;
  userId: number;
}) => {
  return apiInstance.post("/lists", listData).then((res) => res.data);
};

export const removeListRequest = (id: number) => {
  return apiInstance.delete(`/lists/${id}`).then((res) => res.data);
};

export const updateListRequest = (
  listData: { title: string; description?: string },
  id: number
) => {
  return apiInstance.put(`/lists/${id}`, listData).then((res) => res.data);
};
