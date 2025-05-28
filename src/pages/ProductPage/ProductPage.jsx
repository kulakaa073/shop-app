import { Product } from '../../components/Product/Product';
import { useNavigate, useParams, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectProductById } from '../../redux/productsSlice';
import { fetchProductById } from '../../redux/productOps';
import { openProductModal } from '../../redux/productModalSlice';
import { useEffect } from 'react';

export default function ProductPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { productId } = useParams();
  const product = useSelector(selectProductById(productId));

  //console.log('prodcut page');
  //console.log('product id: ', productId);
  // if we cant find product in the store, we fetch it
  // for cases when we navigate directly to the product page

  //console.log('product: ', product);

  useEffect(() => {
    if (!product && productId) {
      dispatch(fetchProductById(productId));
    }
  }, [dispatch, productId, product]);

  const handleEditProduct = () => {
    dispatch(openProductModal({ productId, mode: 'edit' }));
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div>
      <button onClick={() => navigate('/')}>Return</button>
      <button onClick={handleEditProduct}>Edit</button>
      <Product product={product} />
      <button onClick={() => navigate('comments')}>Show Comments</button>
      <Outlet />
    </div>
  );
}
