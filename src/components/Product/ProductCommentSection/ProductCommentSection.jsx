//import { useDispatch } from 'react-redux';
import { ProductComment } from './ProductComment/ProductComment';
import CommentAddModal from './CommentAddModal/CommentAddModal';
import css from './ProductCommentSection.module.css';
import { memo, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  fetchComments,
  addComment,
  deleteComment,
} from '../../../redux/commentsOps';
import { useDispatch, useSelector } from 'react-redux';
import { selectCommentsByProductId } from '../../../redux/commentsSlice';

export const ProductCommentSection = memo(function ProductCommentSection() {
  const dispatch = useDispatch();
  const [IsCommentAddOpen, setIsCommentAddOpen] = useState(false);
  const { productId } = useParams();
  const comments = useSelector(state =>
    selectCommentsByProductId(state, productId)
  );

  //console.log('comment section', comments);
  const toggleCommentAdd = () => {
    setIsCommentAddOpen(prevState => !prevState);
  };

  useEffect(() => {
    dispatch(fetchComments(productId));
  }, [dispatch, productId]);

  const handleAddComment = comment => {
    dispatch(addComment(comment));
  };

  const handleDeleteComment = commentId => {
    dispatch(deleteComment(commentId));
  };

  return (
    <div className={css.container}>
      <button onClick={() => toggleCommentAdd()}>Add Comment</button>
      <ul className={css.commentList}>
        {comments.map(comment => (
          <li key={comment.id}>
            <ProductComment
              comment={comment}
              onCommentDelete={handleDeleteComment}
            />
          </li>
        ))}
      </ul>
      {IsCommentAddOpen && (
        <CommentAddModal
          productId={productId}
          onCommentAdd={handleAddComment}
          toggleCommentAdd={toggleCommentAdd}
        />
      )}
    </div>
  );
});
