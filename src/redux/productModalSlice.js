import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'productModal',
  initialState: {
    isOpen: false,
    productId: null,
    mode: 'none', // 'none', 'edit', 'add'
  },
  reducers: {
    openProductModal(state, action) {
      state.productId = action.payload.productId || null;
      state.mode = action.payload.mode || 'none';
    },
    closeProductModal(state) {
      state.productId = null;
      state.mode = 'none';
    },
  },
});

export const { openProductModal, closeProductModal } = slice.actions;
export default slice.reducer;

export const selectProductModalProductId = state =>
  state.productModal.productId;
export const selectProductModalMode = state => state.productModal.mode;
