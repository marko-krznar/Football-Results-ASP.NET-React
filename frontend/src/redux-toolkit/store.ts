import { configureStore } from "@reduxjs/toolkit";
import matchesReducer from "./slices/matchesSlice";
import { playersApi } from "./api/playersApi";
import { seasonsApi } from "./api/seasonsApi";

export const store = configureStore({
	reducer: {
		matches: matchesReducer,
		[playersApi.reducerPath]: playersApi.reducer,
		[seasonsApi.reducerPath]: seasonsApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware()
			.concat(playersApi.middleware)
			.concat(seasonsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

