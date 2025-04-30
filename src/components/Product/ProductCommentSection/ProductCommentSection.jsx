import ProductComment from './ProductComment/ProductComment';
import ProductCommentEdit from './ProductCommentEdit/ProductCommentEdit';
import { useState } from 'react';

export default function ProductCommentSection({
  comments,
  productId,
  onCommentAdd,
  onCommentDelete,
}) {
  const [IsCommentAddOpen, setIsCommentAddOpen] = useState(false);

  const toggleCommentAdd = () => {
    setIsCommentAddOpen(prevState => !prevState);
  };

  return (
    <div>
      <button onClick={() => toggleCommentAdd()}>Add Comment</button>
      <ul>
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
}
