import { asyncThunkCreator, buildCreateSlice } from "@reduxjs/toolkit";
import type { AsyncThunk } from "@reduxjs/toolkit";
import { store } from "./store";

export type RootState = ReturnType<typeof store.getState>;

export const createAppSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});
//feat: Added typed slice and async thunk creators for improved type safety
export type AppAsyncThunk<Returned, ThunkArg = void> = AsyncThunk<
  Returned,
  ThunkArg,
  { state: RootState }>;
