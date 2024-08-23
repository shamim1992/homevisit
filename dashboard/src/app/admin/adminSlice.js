import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Fetch all users
export const fetchUsers = createAsyncThunk('admin/fetchUsers', async (_, thunkAPI) => {
  try {
    const response = await axios.get('http://localhost:5002/api/admin/users');
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

// Fetch all orders
export const fetchOrders = createAsyncThunk('admin/fetchOrders', async (_, thunkAPI) => {
  try {
    const response = await axios.get('http://localhost:5002/api/admin/orders');
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

// Fetch all physiotherapists
export const fetchPhysiotherapists = createAsyncThunk('admin/fetchPhysiotherapists', async (_, thunkAPI) => {
  try {
    const response = await axios.get('http://localhost:5002/api/admin/physiotherapists');
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

// Fetch all services
export const fetchServices = createAsyncThunk('admin/fetchServices', async (_, thunkAPI) => {
  try {
    const response = await axios.get('http://localhost:5002/api/admin/services');
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    users: [],
    orders: [],
    physiotherapists: [],
    services: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.loading = false;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.loading = false;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(fetchPhysiotherapists.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPhysiotherapists.fulfilled, (state, action) => {
        state.physiotherapists = action.payload;
        state.loading = false;
      })
      .addCase(fetchPhysiotherapists.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(fetchServices.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.services = action.payload;
        state.loading = false;
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default adminSlice.reducer;
