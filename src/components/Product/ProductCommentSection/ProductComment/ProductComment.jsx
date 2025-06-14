import { memo } from 'react';

export const ProductComment = memo(function ProductComment({
  comment,
  onCommentDelete,
}) {
  const handleDelete = () => {
    onCommentDelete(comment.id);
  };

  return (
    <div>
      <p>{comment.date}</p>
      <p>{comment.description}</p>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
});
