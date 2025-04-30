import ProductListItem from './ProductListItem/ProductListItem';
import DeleteConfirmationModal from './DeleteConfirmationModal/DeleteConfirmationModal';
import { useState } from 'react';

export default function ProductList({
  products,
  onProductDelete,
  onProductSelect,
  onAddButtonClick,
}) {
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
    useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState(null);
  const [sortBy, setSortBy] = useState('name');
  const [isSortAsc, setIsSortAsc] = useState(true);

  const sortedProducts = [...products].sort((a, b) => {
    let primaryComparison = 0;

    if (sortBy === 'name') {
      primaryComparison = a.name.localeCompare(b.name);
    } else if (sortBy === 'count') {
      primaryComparison = b.count - a.count;
    } else if (sortBy === 'weight') {
      primaryComparison = parseFloat(b.weight) - parseFloat(a.weight);
    }

    if (primaryComparison === 0) {
      if (sortBy === 'name') {
        return b.count - a.count;
      } else if (sortBy === 'count') {
        return parseFloat(b.weight) - parseFloat(a.weight);
      } else if (sortBy === 'weight') {
        return a.name.localeCompare(b.name);
      }
    }

    return isSortAsc ? primaryComparison : -primaryComparison;
  });

  const handleSortChange = event => {
    setSortBy(event.target.value);
  };

  const toggleSortDirection = () => {
    setIsSortAsc(prevState => !prevState);
  };

  const handleDeleteClick = productId => {
    setProductIdToDelete(productId);
    toogleDeleteConfirmation();
  };

  const handleDeleteConfirmation = () => {
    onProductDelete(productIdToDelete);
    setProductIdToDelete(null);
    toogleDeleteConfirmation();
  };

  const handleCancelDelete = () => {
    setProductIdToDelete(null);
    toogleDeleteConfirmation();
  };

  const toogleDeleteConfirmation = () => {
    setIsDeleteConfirmationOpen(prevState => !prevState);
  };

  return (
    <div>
      <h2>Product List</h2>
      <button onClick={() => onAddButtonClick()}>Add Product</button>
      <select name="sort" value={sortBy} onChange={handleSortChange}>
        <option value="name">Sort by Name</option>
        <option value="count">Sort by Count</option>
        <option value="weight">Sort by Weight</option>
      </select>
      <button onClick={() => toggleSortDirection()}>
        Sort {isSortAsc ? 'ascending' : 'descending'}
      </button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Count</th>
            <th>Size</th>
            <th>Weight</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedProducts.map(product => (
            <tr key={product.id}>
              <ProductListItem
                product={product}
                onProductDelete={handleDeleteClick}
                onProductSelect={onProductSelect}
              />
            </tr>
          ))}
        </tbody>
      </table>
      {isDeleteConfirmationOpen && (
        <DeleteConfirmationModal
          onDelete={handleDeleteConfirmation}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
}
