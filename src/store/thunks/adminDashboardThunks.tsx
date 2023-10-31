import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { axiosAdminInstance } from "../api/axiosInstance";

export const fetchCustomersAsync = createAsyncThunk(
    'admindashboard/customers',
    async (_, { rejectWithValue }) => {
        const id = toast.loading("Please wait...")
        try {
            const response = await axiosAdminInstance.get('/dashboard/customers');
            toast.update(id, { render: response.data.message, type: "success", isLoading: false });
            setTimeout(() => {
                toast.dismiss(id);
            }, 3000);
            console.log('response.data',response.data);
            return response.data;
        } catch (error: any) {
            toast.update(id, { render: error.response?.data?.message, type: "error", isLoading: false });
            setTimeout(() => {
                toast.dismiss(id);
            }, 3000);
            return false;
            // return rejectWithValue(error.response?.data?.message);
        }
    }
);
export const fetchProductsAsync = createAsyncThunk(
    'dashboard/products',
    async (_, { rejectWithValue }) => {
        const id = toast.loading("Please wait...")
        try {
            const response = await axiosAdminInstance.get('/dashboard/products');
            toast.update(id, { render: response.data.message, type: "success", isLoading: false });
            setTimeout(() => {
                toast.dismiss(id);
            }, 3000);
            return response.data;
        } catch (error: any) {
            toast.update(id, { render: error.response?.data?.message, type: "error", isLoading: false });
            setTimeout(() => {
                toast.dismiss(id);
            }, 3000);
            return false;
            // return rejectWithValue(error.response?.data?.message);
        }
    }
);