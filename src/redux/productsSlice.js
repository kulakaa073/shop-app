import { createSlice, createSelector } from '@reduxjs/toolkit';
import {
  fetchProducts,
  fetchProductById,
  addProduct,
  deleteProduct,
  editProduct,
} from './productOps';

const handlePending = state => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const slice = createSlice({
  name: 'products',
  initialState: { items: [], isLoading: false, error: null, sorting: 'none' },
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, handlePending)
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, handleRejected)
      .addCase(fetchProductById.pending, handlePending)
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const index = state.items.findIndex(
          product => product.id === action.payload.id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        } else {
          state.items.push(action.payload);
        }
      })
      .addCase(fetchProductById.rejected, handleRejected)
      .addCase(addProduct.pending, handlePending)
      .addCase(addProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items.push(action.payload);
      })
      .addCase(addProduct.rejected, handleRejected)
      .addCase(editProduct.pending, handlePending)
      .addCase(editProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const index = state.items.findIndex(
          item => item.id === action.payload.id
        );
        if (index !== -1) {
          state.items[index] = {
            ...state.items[index],
            ...action.payload,
          };
        }
      })
      .addCase(editProduct.rejected, handleRejected)
      .addCase(deleteProduct.pending, handlePending)
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = state.items.filter(
          product => product.id !== action.payload.id
        );
      })
      .addCase(deleteProduct.rejected, handleRejected);
  },
});

export default slice.reducer;

export const selectProducts = state => state.products.items;
export const selectProductsIsLoading = state => state.products.isLoading;
export const selectProductsError = state => state.products.error;

export const selectProductById = productId =>
  createSelector([selectProducts], products =>
    products.find(product => product.id === productId)
  );
