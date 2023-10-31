import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { AdminDashboardState, Customer, Product } from "../types/auth/adminDashboard";
import { fetchCustomersAsync } from "../thunks/adminDashboardThunks";

// Extend the state to include products
interface AdminDashboardStateExtended extends AdminDashboardState {
    products: Product[];
}

const initialState: AdminDashboardStateExtended = {
    customers: [],
    products: [], // Add products array
    loading: false,
    error: null,
};

const adminDashboardSlice = createSlice({
    name: 'admindashboard',
    initialState,
    reducers: {
        setProducts: (state, action: PayloadAction<Product[]>) => {
            state.products = action.payload;
        },
        // Add more actions for product management if necessary
    },
    extraReducers(builder) {
        builder.addCase(fetchCustomersAsync.pending, (state, action) => {
            state.customers = [];
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchCustomersAsync.fulfilled, (state, action) => {
            state.customers = action.payload?.users;
            state.loading = false;
            state.error = null;
            // Update products from the received data
            if (action.payload?.products) {
                state.products = action.payload.products;
            }
        }).addCase(fetchCustomersAsync.rejected, (state, action: any) => {
            state.customers = [];
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export const { setProducts } = adminDashboardSlice.actions;

export default adminDashboardSlice.reducer;
