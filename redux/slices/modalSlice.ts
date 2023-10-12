import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// import type { PayloadAction } from "@reduxjs/toolkit";

export interface CounterState {
	isCreateServerOpen: boolean;
	isEditServerOpen: boolean;
	editServerInitialData: { name: string, imageUrl: string, id: string };
}

const initialState: CounterState = {
	isCreateServerOpen: false,
	isEditServerOpen: false,
	editServerInitialData: { imageUrl: "", name: "", id: "" }
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
		},
		openEditServer: (state) => {
			state.isEditServerOpen = true;
		},
		closeEditServer: (state) => {
			state.isEditServerOpen = false;
		},
		setEditServerInitialData: (state, action: PayloadAction<{ name: string, imageUrl: string, id: string }>) => {
			state.editServerInitialData = action.payload;
		}
		// incrementByAmount: (state, action: PayloadAction<number>) => {
		// 	state.value += action.payload;
		// }
	}
});

export const {
	openCreateServer,
	closeCreateServer,
	openEditServer,
	closeEditServer,
	setEditServerInitialData
} = modalSlice.actions;

export default modalSlice.reducer;