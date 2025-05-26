import { ProductCommentSection } from './ProductCommentSection/ProductCommentSection';
import { Product } from '../../components/Product/Product';
import { useNavigate, useParams, Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { selectProductById } from '../../redux/productsSlice';
import { fetchProductById } from '../../redux/productOps';
import { openProductModal } from '../../redux/productModalSlice';

export default function ProductPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { productId } = useParams();

  // if we cant find product in the store, we fetch it
  // for cases when we navigate directly to the product page
  let product = selectProductById(productId);
  if (!product) {
    product = dispatch(fetchProductById(productId));
  }

  const handleEditProduct = () => {
    dispatch(openProductModal({ productId, mode: 'edit' }));
  };

  return (
    <div>
      <button onClick={() => navigate('/')}>Return</button>
      <button onClick={handleEditProduct}>Edit</button>
      <Product product={product} />
      <button onClick={() => navigate('comments')}>Show Comments</button>
      <Outlet>
        <ProductCommentSection />
      </Outlet>
    </div>
  );
}
