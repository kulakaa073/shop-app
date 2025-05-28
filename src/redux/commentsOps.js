import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'http://localhost:3000/'; // Replace with your API base URL

export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async (selectedProductId, thunkAPI) => {
    try {
      const responce = await axios.get(
        `/comments?productId=${selectedProductId}`
      );
      if (!responce.data) {
        throw new Error('No comments found');
      }
      return responce.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addComment = createAsyncThunk(
  'comments/addComment',
  async (comment, thunkAPI) => {
    try {
      // Need to update product comments array too
      const responce = await axios.post('/comments', comment);
      //console.log('addComment', responce);
      return responce.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteComment = createAsyncThunk(
  'comments/deleteComment',
  async (commentId, thunkAPI) => {
    try {
      // Get the comment before deleting to know its productId
      const { data: comment } = await axios.get(`/comments/${commentId}`);
      await axios.delete(`/comments/${commentId}`);
      // Return the deleted comment object (with id and productId)
      return comment;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
