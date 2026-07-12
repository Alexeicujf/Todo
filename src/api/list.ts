import { apiInstance } from "@/api/instance";

export interface ListData {
  id: number;
  title: string;
  description?: string;
  userId: number;
}

export const getList = (id: number) => {
  return apiInstance.get<ListData>(`/lists/${id}`).then((res) => res.data);
};

export const getLists = (userId: number) => {
  return apiInstance
    .get<ListData[]>("/lists", { params: { userId } })
    .then((res) => res.data);
};
export const createListRequest = (listData: {
  title: string;
  description?: string;
  userId: number;
}) => {
  return apiInstance.post<ListData>("/lists", listData).then((res) => res.data);
};

export const removeListRequest = (id: number) => {
  return apiInstance
    .delete<{ success: boolean; id: number }>(`/lists/${id}`)
    .then((res) => res.data);
};

export const updateListRequest = (
  listData: { title: string; description?: string },
  id: number
) => {
  return apiInstance
    .put<ListData>(`/lists/${id}`, listData)
    .then((res) => res.data);
};
