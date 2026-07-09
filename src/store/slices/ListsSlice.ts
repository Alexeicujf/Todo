import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useAppSelector } from "../hooks/useAppSelector";
import {
  getLists,
  createListRequest,
  removeListRequest,
  updateListRequest,
} from "@/api/list";
import axios from "axios";

export interface List {
  id: number;
  title: string;
  description: string;
}

export interface ListSlice {
  lists: List[];
  isCreateModalOpen: boolean;
  isLoading: boolean;
  error: string | null;
  activeListId: number | null;
}

export const getListsAsync = createAsyncThunk(
  "lists/fetchAll",
  async (_, thunkAPI) => {
    try {
      const data = await getLists();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        axios.isAxiosError(error)
          ? error.response?.data?.error
          : "Ошибка сервера"
      );
    }
  }
);

export const createListAsync = createAsyncThunk(
  "list/create",
  async (listData: { title: string; description?: string }, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as Record<
        string,
        Record<string, unknown>
      >;
      const userState = state.auth || state.user;
      const userId = Number(userState?.id || 1);
      const data = await createListRequest({ ...listData, userId });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        axios.isAxiosError(error)
          ? error.response?.data?.error
          : "Ошибка сервера"
      );
    }
  }
);

export const removeListAsync = createAsyncThunk(
  "list/remove",
  async (id: number, thunkAPI) => {
    try {
      await removeListRequest(id);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        axios.isAxiosError(error)
          ? error.response?.data?.error
          : "Ошибка сервера"
      );
    }
  }
);

export const updateListAsync = createAsyncThunk(
  "list/update",
  async (
    {
      id,
      title,
      description,
    }: { id: number; title: string; description?: string },
    thunkAPI
  ) => {
    try {
      const data = await updateListRequest({ title, description }, id);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        axios.isAxiosError(error)
          ? error.response?.data?.error
          : "Ошибка сервера"
      );
    }
  }
);

const savedLists = localStorage.getItem("saved_lists");
const initialState: ListSlice = {
  lists: savedLists ? JSON.parse(savedLists) : [],
  isCreateModalOpen: false,
  isLoading: false,
  error: null,
  activeListId: localStorage.getItem("active_list_id")
    ? Number(localStorage.getItem("active_list_id"))
    : null,
};

export const ListsTodo = createSlice({
  name: "list",
  initialState,
  reducers: {
    setModalOpen: (state, action) => {
      state.isCreateModalOpen = action.payload;
    },
    setActiveListId: (state, action) => {
      state.activeListId = action.payload;
      if (action.payload) {
        localStorage.setItem("active_list_id", String(action.payload));
      } else {
        localStorage.removeItem("active_list_id");
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getListsAsync.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getListsAsync.fulfilled, (state, action) => {
      state.isLoading = false;
      const rawLists = Array.isArray(action.payload)
        ? action.payload
        : action.payload?.lists || action.payload?.data || [];
      state.lists = rawLists.map((item: unknown) => {
        const row = item as Record<string, unknown>;
        return {
          id: Number(row.id || row.Id || 0),
          title: String(
            row.title ||
              row.Title ||
              row.name ||
              row.Name ||
              row.text ||
              row.Text ||
              ""
          ),
          description: String(row.description || row.Description || ""),
        };
      });
      localStorage.setItem("saved_lists", JSON.stringify(state.lists));

      if (state.activeListId === null && state.lists.length > 0) {
        state.activeListId = state.lists[0].id;
        localStorage.setItem("active_list_id", String(state.lists[0].id));
      }
    });
    builder.addCase(createListAsync.fulfilled, (state, action) => {
      const payloadObj = action.payload as Record<string, unknown> | undefined;
      const createdItem = (payloadObj?.list || payloadObj) as
        | Record<string, unknown>
        | undefined;
      if (createdItem) {
        const newList = {
          id: Number(createdItem.id || createdItem.Id || 0),
          title: String(
            createdItem.title ||
              createdItem.Title ||
              createdItem.name ||
              createdItem.Name ||
              createdItem.text ||
              createdItem.Text ||
              ""
          ),
          description: String(
            createdItem.description || createdItem.Description || ""
          ),
        };
        state.lists.push(newList);
        localStorage.setItem("saved_lists", JSON.stringify(state.lists));

        if (!state.activeListId) {
          state.activeListId = newList.id;
          localStorage.setItem("active_list_id", String(newList.id));
        }
      }
    });
    builder.addCase(removeListAsync.fulfilled, (state, action) => {
      state.lists = state.lists.filter((item) => item.id !== action.payload);
      localStorage.setItem("saved_lists", JSON.stringify(state.lists));

      if (state.activeListId === action.payload) {
        if (state.lists.length > 0) {
          state.activeListId = state.lists[0].id;
          localStorage.setItem("active_list_id", String(state.lists[0].id));
        } else {
          state.activeListId = null;
          localStorage.removeItem("active_list_id");
        }
      }
    });
    builder.addCase(updateListAsync.fulfilled, (state, action) => {
      const payloadObj = action.payload as Record<string, unknown> | undefined;
      const updatedItem = (payloadObj?.list || payloadObj) as
        | Record<string, unknown>
        | undefined;
      if (!updatedItem) return;
      const targetId = Number(updatedItem.id || updatedItem.Id || 0);
      const index = state.lists.findIndex((item) => item.id === targetId);
      if (index !== -1) {
        state.lists[index] = {
          id: targetId,
          title: String(
            updatedItem.title ||
              updatedItem.Title ||
              updatedItem.name ||
              updatedItem.Name ||
              updatedItem.text ||
              updatedItem.Text ||
              ""
          ),
          description: String(
            updatedItem.description || updatedItem.Description || ""
          ),
        };
        localStorage.setItem("saved_lists", JSON.stringify(state.lists));
      }
    });
  },
});

export const { setModalOpen, setActiveListId } = ListsTodo.actions;
export const useOpenModal = () =>
  useAppSelector((state) => state.list.isCreateModalOpen);
export const useList = () => useAppSelector((state) => state.list.lists);
export default ListsTodo.reducer;
