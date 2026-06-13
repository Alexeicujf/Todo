import { createSlice } from "@reduxjs/toolkit";
import { useAppSelector } from "../hooks/useAppSelector";

export interface List {
  id: number;
  title: string;
  description: string;
}
export interface ListSlice {
  list: List[];
  isCreateModalOpen: boolean;
}
const data = localStorage.getItem("list_data");
const initialState: ListSlice = data
  ? JSON.parse(data)
  : { list: [], isCreateModalOpen: false };

export const ListsTodo = createSlice({
  name: "list",
  initialState,
  reducers: {
    addList: (state, action) => {
      state.list.push({
        id: Date.now(),
        title: action.payload.title,
        description: action.payload.description,
      });
    },
    removeList: (state, action) => {
      state.list = state.list.filter((list) => list.id !== action.payload);
    },
    editList: (state, action) => {
      const item = state.list.find((item) => item.id === action.payload.id);
      if (item) {
        item.title = action.payload.title;
        item.description = action.payload.description;
      }
    },
    setModalOpen: (state, action) => {
      state.isCreateModalOpen = action.payload;
    },
  },
});

export const { addList, editList, setModalOpen, removeList } =
  ListsTodo.actions;
export default ListsTodo.reducer;
export const useOpenModal = () =>
  useAppSelector((state) => state.list.isCreateModalOpen);
export const useList = () => useAppSelector((state) => state.list.list);
