import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Member, Profile, Server } from "@prisma/client";

export type serializedServerMemberDataOnlyType = Omit<Profile, "createdAt" | "updatedAt">

export interface CounterState {
	isCreateServerOpen: boolean;
	//
	isInviteOpen: boolean;
	inviteData: {
		inviteCode: string,
		serverId: string
	},
	//
	isEditServerOpen: boolean;
	editServerInitialData: {
		name: string,
		imageUrl: string,
		id: string
	};
	//
	isManageMemberOpen: boolean
	manageMemberData: {
		name: string,
		imageUrl: string,
		id: string
		serverMember: { profile: serializedServerMemberDataOnlyType, id: string }[]
	}
}

const initialState: CounterState = {
	isCreateServerOpen: false,
	//
	isEditServerOpen: false,
	editServerInitialData: { imageUrl: "", name: "", id: "" },
	//
	isInviteOpen: false,
	inviteData: { inviteCode: "", serverId: "" },
	//
	isManageMemberOpen: false,
	manageMemberData: { imageUrl: "", name: "", id: "", serverMember: [] }
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
		},
		//
		openMangeMember: (state) => {
			state.isManageMemberOpen = true;
		},
		closeMangeMember: (state) => {
			state.isManageMemberOpen = false;
		},
		setManageMemberData: (state, action: PayloadAction<{
			name: string,
			imageUrl: string,
			id: string
			serverMember: { profile: serializedServerMemberDataOnlyType, id: string }[]
		}>) => {
			state.manageMemberData = action.payload;
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
	setEditServerInitialData,
	openMangeMember,
	closeMangeMember,
	setManageMemberData
} = modalSlice.actions;

export default modalSlice.reducer;