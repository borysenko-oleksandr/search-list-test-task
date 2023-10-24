import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import FetchService from "../../services/FetchService";
import { Item, State } from "../../types/redux";
// @ts-ignore
import { API_URL } from "@dotenv";

enum Types {
  Name = "List",
  FetchList = "FetchList",
  FetchMoreList = "FetchMoreList",
}

export interface InitialState {
  items: Item[];
  page: number;
  total: number | null;
}

const initialState: InitialState = {
  items: [],
  page: 1,
  total: null,
};

export const fetchList = createAsyncThunk(
  `${Types.Name}/${Types.FetchList}`,
  async (searchValue: string | null, thunkAPI) => {
    const state = await thunkAPI.getState();
    return await FetchService.getData(API_URL, {
      limit: 10,
      p: (state as State).list.page,
      q: searchValue ?? "",
      world: "de",
    });
  }
);

export const fetchMoreList = createAsyncThunk(
  `${Types.Name}/${Types.FetchMoreList}`,
  async (arg, thunkAPI) => {
    const state = await thunkAPI.getState();
    return await FetchService.getData(API_URL, {
      limit: 10,
      p: (state as State).list.page,
      q: "",
      world: "de",
    });
  }
);

const ListSlice = createSlice({
  name: Types.Name,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchList.fulfilled, (state, action) => {
      state.items = action.payload?.data?.items?.materials;
      state.page = state.page + 1;
      state.total = action.payload?.data?.total;
    });
    builder.addCase(fetchMoreList.fulfilled, (state, action) => {
      state.items.push(...action.payload?.data?.items?.materials);
      state.page = state.page + 1;
    });
  },
});

export default ListSlice.reducer;
