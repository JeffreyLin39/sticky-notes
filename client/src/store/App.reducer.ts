// Redux
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface INote {
	id: string;
	title: string;
}

export interface IAccount {
	_id: string;
	email: string;
	password: string;
	notes: INote[];
}

export interface IAppState {
	isLoggedIn: boolean;
	user: undefined | IAccount;
}

const initialState: IAppState = {
	isLoggedIn: false,
	user: undefined,
};

export const appSlice = createSlice({
	name: "app",
	initialState,
	reducers: {
		loadLogin: (state, action: PayloadAction<boolean>) => {
			state.isLoggedIn = action.payload;
		},
		loadUser: (state, action: PayloadAction<IAccount>) => {
			state.user = action.payload;
		},
		loadNote: (state, action: PayloadAction<INote>) => {
			state.user?.notes.push(action.payload);
		},
		removeNote: (state, action: PayloadAction<string>) => {
			if (state.user) {
				state.user.notes = state.user.notes.filter(
					(note) => note.id !== action.payload
				);
			}
		},
	},
});

export const { loadLogin, loadUser, loadNote, removeNote } = appSlice.actions;

export default appSlice.reducer;
