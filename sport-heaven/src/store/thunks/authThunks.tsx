import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { axiosInstance } from "../api/axiosInstance";
import axios from 'axios';
const baseURL = 'http://localhost:3001/api';
export const loginAsync = createAsyncThunk(
    'auth/login',
    async (credentials: { email: string; password: string }, { rejectWithValue }) => {
        const id = toast.loading("Please wait...")
        try {
            const response = await axiosInstance.post('/login', { ...credentials, isAdmin: false });

            toast.update(id, { render: response.data.message, type: "success", isLoading: false });
            setTimeout(() => {
                toast.dismiss(id);
            }, 500);
            localStorage.setItem('userToken', response.data?.token)
            return response.data;
        } catch (error: any) {
            toast.update(id, { render: error.response?.data?.message, type: "error", isLoading: false });
            setTimeout(() => {
                toast.dismiss(id);
            }, 500);
            return false;
            // return rejectWithValue(error.response?.data?.message);
        }
    }
);


export const adminloginAsync = createAsyncThunk(
    'auth/adminlogin',
    async (credentials: { email: string; password: string }, { rejectWithValue }) => {
        const id = toast.loading("Please wait...")
        try {
            const response = await axiosInstance.post('/login', { ...credentials, isAdmin: true });
            toast.update(id, { render: response.data.message, type: "success", isLoading: false });
            setTimeout(() => {
                toast.dismiss(id);
            }, 500);
            localStorage.setItem('adminToken', response.data?.token)
            return response.data;
        } catch (error: any) {
            toast.update(id, { render: error.response?.data?.message, type: "error", isLoading: false });
            setTimeout(() => {
                toast.dismiss(id);
            }, 500);
            return false;
            // return rejectWithValue(error.response?.data?.message);
        }
    }
);


export const registerAsync = createAsyncThunk(
    'auth/register',
    async (credentials: { name: string, email: string; password: string }, { rejectWithValue }) => {
        const id = toast.loading("Please wait...")
        try {
            const response = await axiosInstance.post('/register', credentials);
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
// const token = localStorage.getItem('adminToken'); // Replace this with your actual method of getting the token

// export const productAsync = createAsyncThunk(
//     'dashboard/product/create',
//     async (credentials: { name: string, price: string; description: string }, { rejectWithValue }) => {
//         const id = toast.loading("Please wait...")
//         try {
            
//             const response = await axiosInstance.post('/dashboard/product/create', credentials);
//             toast.update(id, { render: response.data.message, type: "success", isLoading: false });
//             setTimeout(() => {
//                 toast.dismiss(id);
//             }, 3000);
//             return response.data;
//         } catch (error: any) {
//             toast.update(id, { render: error.response?.data?.message, type: "error", isLoading: false });
//             setTimeout(() => {
//                 toast.dismiss(id);
//             }, 3000);
//             return false;
//             // return rejectWithValue(error.response?.data?.message);
//         }
//     }
// );

export const productAsync = createAsyncThunk(
    'dashboard/product/create',
    async (formData: FormData, { rejectWithValue }) => {
      const token = localStorage.getItem('adminToken');
  
      const id = toast.loading("Please wait...");
  
      try {
        const axiosInstance = axios.create({
          baseURL: baseURL,
          headers: {
            'Authorization': `Bearer ${token}`,
            // Don't need to specify 'Content-Type': 'application/json' as you're using FormData
          },
        });
  
        const response = await axiosInstance.post('/dashboard/product/create', formData);
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
      }
    }
  );
