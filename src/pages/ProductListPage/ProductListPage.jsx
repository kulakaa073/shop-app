import { ProductList } from '../../components/ProductList/ProductList';
import { ProductListControls } from '../../components/ProductList/ProductListControls/ProductListControls';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect, useState } from 'react';
import { fetchProducts, deleteProduct } from '../../redux/productOps';
import {
  selectProductsError,
  selectProductsIsLoading,
} from '../../redux/productsSlice';
import { useSearchParams } from 'react-router-dom';

export default function ProductListPage() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectProductsIsLoading);
  const error = useSelector(selectProductsError);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get('_sort');

  useEffect(() => dispatch(fetchProducts(sortBy)), [dispatch, sortBy]);

  const handleOpenDeleteModal = useCallback(
    id => {
      setSearchParams(prev => {
        const next = new URLSearchParams(prev);
        next.set('delete', id);
        return next;
      });
      setIsDeleteModalOpen(true);
    },
    [setSearchParams]
  );

  const handleDelete = () => {
    dispatch(deleteProduct(searchParams.get('delete')));
    setIsDeleteModalOpen(false);
  };

  const handleCancel = () => {
    const nextSearchParams = new URLSearchParams(searchParams);
    nextSearchParams.delete('delete');
    setSearchParams(nextSearchParams);
    setIsDeleteModalOpen(false);
  };

  return (
    <div>
      <h2>Product List</h2>
      <ProductListControls />
      {isLoading && !error && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <ProductList onProductDelete={handleOpenDeleteModal} />
      {isDeleteModalOpen && (
        <DeleteConfirmationModal
          onDelete={handleDelete}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
}
