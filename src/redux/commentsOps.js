import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000/'; // Replace with your API base URL

export const fetchComments = async selectedProductId => {
  try {
    const responce = await axios.get(
      `/comments?productId=${selectedProductId}`
    );
    if (!responce.data) {
      throw new Error('No comments found');
    }
    return responce.data;
  } catch (error) {
    return error.message;
  }
};

export const addComment = async comment => {
  try {
    // Need to update product comments array too
    const responce = await axios.post('/comments', comment);
    //console.log('addComment', responce);
    return responce.data;
  } catch (error) {
    return error.message;
  }
};

export const deleteComment = async commentId => {
  try {
    // Need to update product comments array too
    // Question: what does it returns?
    const responce = await axios.delete(`/comments/${commentId}`);
    //console.log('deleteComment', responce);
    return responce.data;
  } catch (error) {
    return error.message;
  }
};
