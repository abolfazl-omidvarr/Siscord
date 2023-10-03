import { createSlice } from "@reduxjs/toolkit";

// import type { PayloadAction } from "@reduxjs/toolkit";

export interface CounterState {
	isCreateServerOpen: boolean;
}

const initialState: CounterState = {
	isCreateServerOpen: false
};

export const modalSlice = createSlice({
	name: "modal",
	initialState,
	reducers: {
		openCreateServer: (state) => {
			state.isCreateServerOpen = true;
		},
		closeCreateServer: (state) => {
			state.isCreateServerOpen = false;
		}
		// incrementByAmount: (state, action: PayloadAction<number>) => {
		// 	state.value += action.payload;
		// }
	}
});

// Action creators are generated for each case reducer function
export const { openCreateServer, closeCreateServer } = modalSlice.actions;

export default modalSlice.reducer;