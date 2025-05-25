import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000/'; // Replace with your API base URL

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (sortBy, thunkAPI) => {
    try {
      const responce = await axios.get('/products?_sort=sortBy');
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
    try {
      const responce = await axios.get('/products', product);
      return responce.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const editProduct = createAsyncThunk(
  'products/addProduct',
  async (product, thunkAPI) => {
    try {
      const responce = await axios.get('/products', product);
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
      const responce = await axios.get(`/products/${productId}`);
      return responce.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async (selectedProductId, thunkAPI) => {
    try {
      const responce = await axios.get(
        `/comments?productId=${selectedProductId}`
      );
      if (!responce.data) {
        return thunkAPI.rejectWithValue('No comments found');
      }
      return responce.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addComment = createAsyncThunk(
  'comments/fetchComments',
  async (comment, thunkAPI) => {
    try {
      // Need to update product comments array too
      const responce = await axios.post('/comments', comment);
      return responce.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteComment = createAsyncThunk(
  'comments/fetchComments',
  async (commentId, thunkAPI) => {
    try {
      // Need to update product comments array too
      const responce = await axios.delete(`/comments/${commentId}`);
      return responce.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
