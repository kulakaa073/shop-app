import { memo } from 'react';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { openProductModal } from '../../../redux/productModalSlice';

export const ProductListControls = memo(function ProductListControls() {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get('sort') || '';
  const isSortAsc = searchParams.get('order') !== 'desc';

  const handleAddProduct = () => {
    dispatch(openProductModal({ mode: 'add' }));
  };

  const handleSortChange = event => {
    const sorting = event.target.value;
    setSearchParams(prev => {
      const next = new URLSearchParams(prev);
      // on default sorting remove param to not clutter the link
      sorting && sorting !== 'default'
        ? next.set('sort', sorting)
        : next.delete('sort');
      return next;
    });
  };

  const toggleSortDirection = () => {
    setSearchParams(prev => {
      const next = new URLSearchParams(prev);
      // on ascending sort remove param to not clutter since its default
      isSortAsc ? next.set('order', 'desc') : next.delete('order');
      return next;
    });
  };

  return (
    <div>
      <button onClick={handleAddProduct}>Add Product</button>
      <select name="sort" value={sortBy} onChange={handleSortChange}>
        <option value="default">Default sorting</option>
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
