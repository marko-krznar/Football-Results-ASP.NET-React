import { configureStore } from "@reduxjs/toolkit";
import matchesReducer from "./slices/matchesSlice";
import { playersApi } from "./api/playersApi";

export const store = configureStore({
	reducer: {
		matches: matchesReducer,
		[playersApi.reducerPath]: playersApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(playersApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

