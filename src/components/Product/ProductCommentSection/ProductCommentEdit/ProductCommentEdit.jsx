import { nanoid } from 'nanoid';
import css from './ProductCommentEdit.module.css';

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
    <div className={css.modal}>
      <div className={css.modalContent}>
        <h3>Add new comment</h3>
        <form onSubmit={handleSubmit} className={css.form}>
          <p>Comment:</p>
          <textarea name="comment" rows="4"></textarea>
          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  );
}
