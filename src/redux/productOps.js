import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000/'; // Replace with your API base URL

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async ({ sortBy, isSortAsc }, thunkAPI) => {
    const params = { sort: isSortAsc ? sortBy : '-' + sortBy };
    //console.log('fetchproucts params', params);
    //console.log(isSortAsc);
    try {
      const responce = await axios.get(`/products?_sort=${params.sort}`);
      //console.log('fetchproucts responce', responce);
      return responce.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchProductById = createAsyncThunk(
  'products/fetchpProductById',
  async (productId, thunkAPI) => {
    try {
      const responce = await axios.get(`/products/${productId}`);
      return responce.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addProduct = createAsyncThunk(
  'products/addProduct',
  async (product, thunkAPI) => {
    //console.log('addProduct', product);
    try {
      const responce = await axios.post('/products', product);
      //console.log('addProduct resp', responce);
      return responce.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const editProduct = createAsyncThunk(
  'products/editProduct',
  async (product, thunkAPI) => {
    //console.log('editProduct', product, productId);
    try {
      const responce = await axios.patch(`/products/${product.id}`, product);
      return responce.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (productId, thunkAPI) => {
    try {
      const responce = await axios.delete(`/products/${productId}`);
      return responce.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
