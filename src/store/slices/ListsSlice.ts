import { createSlice } from "@reduxjs/toolkit";
import { useAppSelector } from "../hooks/useAppSelector";

export interface List {
    id: number;
    title: string,
}
interface ListSlice {
    list: List[]
}
const data = localStorage.getItem("list_data");
const initialState: ListSlice = data ? JSON.parse(data) : { list: [] };

export const ListsTodo = createSlice({
    name: "list",
    initialState,
    reducers: {
        addList: (state, action) => {
            state.list.push({id: Date.now(), title: action.payload.title})
        },
        removeList: (state, action) => {
            state.list = state.list.filter(list => list.id !== action.payload)
        }
    }
})

export const {addList, removeList} = ListsTodo.actions;
export default ListsTodo.reducer;

export const useList = () => useAppSelector(state => state.list.list)

