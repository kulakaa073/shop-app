export default function DeleteConfirmationModal({ onDelete, onCancel }) {
  const handleDelete = () => {
    onDelete();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Are you sure you want to delete this product?</h2>
        <button onClick={handleDelete}>Delete</button>
        <button onClick={() => onCancel()}>Cancel</button>
      </div>
    </div>
  );
}
