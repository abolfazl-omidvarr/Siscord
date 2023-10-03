import { configureStore } from "@reduxjs/toolkit";
import modalSliceReducers from "@/redux/slices/modalSlice";

export const store = configureStore({
	reducer: {
		modal: modalSliceReducers
	}
});


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch