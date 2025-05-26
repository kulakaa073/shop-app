import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'productModal',
  initialState: {
    isOpen: false,
    productId: null,
    mode: 'view', // 'view', 'edit', 'add'
  },
  reducers: {
    openProductModal(state, action) {
      state.isOpen = true;
      state.productId = action.payload.productId || null;
      state.mode = action.payload.mode || 'view';
    },
    closeProductModal(state) {
      state.isOpen = false;
      state.productId = null;
      state.mode = 'view';
    },
  },
});

export const { openProductModal, closeProductModal } = slice.actions;
export default slice.reducer;

export const selectProductModalIsOpen = state => state.productModal.isOpen;
export const selectProductModalProductId = state =>
  state.productModal.productId;
export const selectProductModalMode = state => state.productModal.mode;
