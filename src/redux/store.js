import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './productsSlice';
import commentsReducer from './commentsSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    comments: commentsReducer,
  },
});
