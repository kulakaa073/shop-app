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

export const ProductCommentSection = memo(function ProductCommentSection() {
  const [IsCommentAddOpen, setIsCommentAddOpen] = useState(false);
  const [comments, setComments] = useState([]);
  //const dispatch = useDispatch();
  const productId = useParams();

  const toggleCommentAdd = () => {
    setIsCommentAddOpen(prevState => !prevState);
  };

  useEffect(() => {
    setComments(fetchComments(productId));
  }, [productId]);

  const handleAddComment = comment => {
    setComments(addComment(comment));
  };

  const handleDeleteComment = commentId => {
    setComments(deleteComment(commentId));
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
