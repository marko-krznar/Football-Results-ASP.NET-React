import { configureStore } from "@reduxjs/toolkit";
import matchesReducer from "./slices/matchesSlice";
import { playersApi } from "./api/playersApi";
import { seasonsApi } from "./api/seasonsApi";
import { teamsApi } from "./api/teamsApi";
import { teamMembersApi } from "./api/teamMembersApi";
import { matchesApi } from "./api/matchesApi";

export const store = configureStore({
	reducer: {
		matches: matchesReducer,
		[playersApi.reducerPath]: playersApi.reducer,
		[seasonsApi.reducerPath]: seasonsApi.reducer,
		[teamsApi.reducerPath]: teamsApi.reducer,
		[teamMembersApi.reducerPath]: teamMembersApi.reducer,
		[matchesApi.reducerPath]: matchesApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware()
			.concat(playersApi.middleware)
			.concat(seasonsApi.middleware)
			.concat(teamsApi.middleware)
			.concat(teamMembersApi.middleware)
			.concat(matchesApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
