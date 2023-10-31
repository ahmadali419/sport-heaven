import { createSlice } from "@reduxjs/toolkit";
import { AuthState, User } from "../types/auth/auth";
import { adminloginAsync, loginAsync, registerAsync } from "../thunks/authThunks";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import { toast } from "react-toastify";

const initialState: AuthState = {
    user: null,
    admin: null,
    loading: false,
    error: null,
};
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            const id = toast.loading("Please wait...")
            toast.update(id, { render: "User logout successfully", type: "success", isLoading: false });
            setTimeout(() => {
                toast.dismiss(id);
            }, 500);
            // Reset the authentication state to its initial values
            state.user = null;
            state.loading = false;
            state.error = null;
        },
    },
    extraReducers(builder) {
        builder.addCase(loginAsync.pending, (state) => {
            state.loading = true;
            state.error = null
        })
        builder.addCase(loginAsync.fulfilled, (state, action) => {
            state.loading = false,
                state.error = null,
                state.user = action.payload?.user
        }).addCase(loginAsync.rejected, (state, action: any) => {
            state.loading = false,
                state.user = null,
                state.error = action.payload
        })


        builder.addCase(adminloginAsync.pending, (state) => {
            state.loading = true;
            state.error = null
        })
        builder.addCase(adminloginAsync.fulfilled, (state, action) => {
            state.loading = false,
                state.error = null,
                state.admin = action.payload?.user
        }).addCase(adminloginAsync.rejected, (state, action: any) => {
            state.loading = false,
                state.admin = null,
                state.error = action.payload
        })
        builder.addCase(registerAsync.pending, (state) => {
            state.loading = true;
            state.error = null
        })
        builder.addCase(registerAsync.fulfilled, (state, action) => {
            state.loading = false,
                state.error = null,
                state.user = action.payload?.user
        }).addCase(registerAsync.rejected, (state, action: any) => {
            state.loading = false,
                state.user = null,
                state.error = action.payload
        })
    },
});

const rootPersistConfig = {
    key: 'root',
    storage: storage,
    blacklist: ['navigation', 'auth'],
}
export const { logout } = authSlice.actions;
export default persistReducer(rootPersistConfig, authSlice.reducer);