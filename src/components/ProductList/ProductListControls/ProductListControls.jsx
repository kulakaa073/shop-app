import { memo } from 'react';
import { useSearchParams } from 'react-router-dom';

export const ProductListControls = memo(function ProductListControls() {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get('_sort') || '';
  const isSortAsc = searchParams.get('order') !== 'desc';

  const handleAddProduct = () => {
    setSearchParams(prev => {
      const next = new URLSearchParams(prev);
      next.set('modal', 'addProduct');
      return next;
    });
  };

  const handleSortChange = event => {
    const sorting = event.target.value;
    setSearchParams(prev => {
      const next = new URLSearchParams(prev);
      sorting ? next.set('_sort', sorting) : next.delete('_sort');
      return next;
    });
  };

  const toggleSortDirection = () => {
    setSearchParams(prev => {
      const next = new URLSearchParams(prev);
      next.set('order', isSortAsc ? 'desc' : 'asc');
      return next;
    });
  };

  return (
    <div>
      <button onClick={handleAddProduct}>Add Product</button>
      <select name="sort" value={sortBy} onChange={handleSortChange}>
        <option value="">Default sorting</option>
        <option value="name">Sort by Name</option>
        <option value="count">Sort by Count</option>
        <option value="weight">Sort by Weight</option>
      </select>
      <button onClick={toggleSortDirection}>
        Sort {isSortAsc ? 'ascending' : 'descending'}
      </button>
    </div>
  );
});
