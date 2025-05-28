import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './productsSlice';
import commentsReducer from './commentsSlice';
import productModalReducer from './productModalSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    comments: commentsReducer,
    productModal: productModalReducer,
  },
});
