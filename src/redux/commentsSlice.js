import { createSlice, createSelector } from '@reduxjs/toolkit';
import { fetchComments, addComment, deleteComment } from './commentsOps';

const handlePending = state => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const slice = createSlice({
  name: 'comments',
  initialState: { items: [], loading: false, error: null },
  extraReducers: builder => {
    builder
      .addCase(fetchComments.pending, handlePending)
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = action.payload;
      })
      .addCase(fetchComments.rejected, handleRejected)
      .addCase(addComment.pending, handlePending)
      .addCase(addComment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items.push(action.payload);
      })
      .addCase(addComment.rejected, handleRejected)
      .addCase(deleteComment.pending, handlePending)
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = state.items.filter(
          comment => comment.id !== action.payload.id
        );
      })
      .addCase(deleteComment.rejected, handleRejected);
  },
});

export default slice.reducer;

export const selectComments = state => state.comments.items;
export const selectCommentsIsLoading = state => state.comments.isLoading;
export const selectCommentsError = state => state.comments.error;

export const selectCommentsByProductId = createSelector(
  [selectComments, (state, productId) => productId],
  (comments, productId) =>
    comments.filter(comment => comment.productId === productId)
);
