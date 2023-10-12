import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Server } from "@prisma/client";

// import type { PayloadAction } from "@reduxjs/toolkit";

export interface CounterState {
	isCreateServerOpen: boolean;
	isInviteOpen: boolean;
	isEditServerOpen: boolean;
	editServerInitialData: {
		name: string,
		imageUrl: string,
		id: string
	};
	inviteData: {
		inviteCode: string,
		serverId: string
	},
}

const initialState: CounterState = {
	isCreateServerOpen: false,
	//
	isEditServerOpen: false,
	editServerInitialData: { imageUrl: "", name: "", id: "" },
	//
	isInviteOpen: false,
	inviteData: { inviteCode: "", serverId: "" }
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
		openInvite: (state) => {
			state.isInviteOpen = true;
		},
		closeInvite: (state) => {
			state.isInviteOpen = false;
		},
		setInviteModalData: (state, action: PayloadAction<{
			inviteCode: string,
			serverId: string
		}>) => {
			state.inviteData = action.payload;
		},
		openEditServer: (state) => {
			state.isEditServerOpen = true;
		},
		closeEditServer: (state) => {
			state.isEditServerOpen = false;
		},
		setEditServerInitialData: (state, action: PayloadAction<{
			name: string,
			imageUrl: string,
			id: string
		}>) => {
			state.editServerInitialData = action.payload;
		}
	}
});

export const {
	openCreateServer,
	closeCreateServer,
	openInvite,
	closeInvite,
	setInviteModalData,
	openEditServer,
	closeEditServer,
	setEditServerInitialData
} = modalSlice.actions;

export default modalSlice.reducer;