import { configureStore } from "@reduxjs/toolkit";
import { playersApi } from "./api/playersApi";
import { seasonsApi } from "./api/seasonsApi";
import { teamsApi } from "./api/teamsApi";
import { teamMembersApi } from "./api/teamMembersApi";
import { matchesApi } from "./api/matchesApi";
import { setsApi } from "./api/setsApi";
import { matchPlayersApi } from "./api/matchPlayersApi";
import { authApi } from "./api/authApi";

import seasonReducer from "./seasonSlice";

export const store = configureStore({
	reducer: {
		season: seasonReducer,
		[playersApi.reducerPath]: playersApi.reducer,
		[seasonsApi.reducerPath]: seasonsApi.reducer,
		[teamsApi.reducerPath]: teamsApi.reducer,
		[teamMembersApi.reducerPath]: teamMembersApi.reducer,
		[matchesApi.reducerPath]: matchesApi.reducer,
		[setsApi.reducerPath]: setsApi.reducer,
		[matchPlayersApi.reducerPath]: matchPlayersApi.reducer,
		[authApi.reducerPath]: authApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware()
			.concat(playersApi.middleware)
			.concat(seasonsApi.middleware)
			.concat(teamsApi.middleware)
			.concat(teamMembersApi.middleware)
			.concat(matchesApi.middleware)
			.concat(setsApi.middleware)
			.concat(matchPlayersApi.middleware)
			.concat(authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
