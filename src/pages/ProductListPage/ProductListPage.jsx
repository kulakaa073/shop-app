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
import DeleteConfirmationModal from '../../components/ProductList/DeleteConfirmationModal/DeleteConfirmationModal';

export default function ProductListPage() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectProductsIsLoading);
  const error = useSelector(selectProductsError);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get('sort') || '';
  const isSortAsc = searchParams.get('order') !== 'desc';

  //console.log('prodcut list page: ', isSortAsc);

  useEffect(() => {
    dispatch(fetchProducts({ sortBy, isSortAsc }));
    //console.log('effect called');
  }, [dispatch, sortBy, isSortAsc]);

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
    setSearchParams(prev => {
      const next = new URLSearchParams(prev);
      next.delete('delete');
      return next;
    });
    setIsDeleteModalOpen(false);
  };

  const handleCancel = () => {
    setSearchParams(prev => {
      const next = new URLSearchParams(prev);
      next.delete('delete');
      return next;
    });
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
