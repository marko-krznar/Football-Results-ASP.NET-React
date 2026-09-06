import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface SeasonState {
	selectedSeasonId: number | null;
}

const initialState: SeasonState = {
	selectedSeasonId: null,
};

export const seasonSlice = createSlice({
	name: "season",
	initialState,
	reducers: {
		setSelectedSeasonId: (state, action: PayloadAction<number | null>) => {
			state.selectedSeasonId = action.payload;
		},
	},
});

export const { setSelectedSeasonId } = seasonSlice.actions;
export default seasonSlice.reducer;
