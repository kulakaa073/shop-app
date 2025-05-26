import { ProductComment } from './ProductComment/ProductComment';
import ProductCommentEdit from './ProductCommentEdit/ProductCommentEdit';
import css from './ProductCommentSection.module.css';
import { memo, useState } from 'react';

export const ProductCommentSection = memo(function ProductCommentSection({}) {
  const [IsCommentAddOpen, setIsCommentAddOpen] = useState(false);

  const toggleCommentAdd = () => {
    setIsCommentAddOpen(prevState => !prevState);
  };

  return (
    <div className={css.container}>
      <button onClick={() => toggleCommentAdd()}>Add Comment</button>
      <ul className={css.commentList}>
        {comments.map(comment => (
          <li key={comment.id}>
            <ProductComment
              comment={comment}
              onCommentDelete={onCommentDelete}
            />
          </li>
        ))}
      </ul>
      {IsCommentAddOpen && (
        <ProductCommentEdit
          productId={productId}
          onCommentAdd={onCommentAdd}
          toggleCommentAdd={toggleCommentAdd}
        />
      )}
    </div>
  );
});
