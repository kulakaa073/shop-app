import css from './DeleteConfirmationModal.module.css';

export default function DeleteConfirmationModal({ onDelete, onCancel }) {
  const handleDelete = () => {
    onDelete();
  };

  return (
    <div className={css.modal}>
      <div className={css.modalContent}>
        <h2>Are you sure you want to delete this product?</h2>
        <button onClick={handleDelete}>Delete</button>
        <button onClick={() => onCancel()}>Cancel</button>
      </div>
    </div>
  );
}
