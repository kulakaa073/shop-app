import { nanoid } from 'nanoid';

export default function ProductCommentEdit({
  productId,
  onCommentAdd,
  toggleCommentAdd,
}) {
  const handleSubmit = event => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const comment = formData.get('comment');

    onCommentAdd({
      id: nanoid(),
      productId: productId,
      date: new Date().toLocaleDateString(),
      description: comment,
    });
    event.target.reset();
    toggleCommentAdd();
  };

  return (
    <div>
      <h3>Add new comment</h3>
      <form onSubmit={handleSubmit}>
        <p>Comment:</p>
        <textarea name="comment" rows="4"></textarea>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}
