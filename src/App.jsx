import './App.css';

import ProductEditModal from './components/ProductModal/ProductModal';

//import { postData } from './utils';
import { lazy, Suspense } from 'react';

import { Provider, useDispatch, useSelector } from 'react-redux';
//import { store } from './redux/store';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { selectProductModalMode } from './redux/productModalSlice';
import { addProduct, editProduct } from './redux/productOps';

const ProductListPage = lazy(() =>
  import('./pages/ProductListPage/ProductListPage')
);
const ProductPage = lazy(() => import('./pages/ProductPage/ProductPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage/NotFoundPage'));
const ProductModal = lazy(() =>
  import('./components/ProductModal/ProductModal')
);
const ProductCommentSection = lazy(() =>
  import('./components/Product/ProductCommentSection/ProductCommentSection')
);

// enum
const ActiveModal = Object.freeze({
  Add: 'add',
  Edit: 'edit',
  None: 'none',
});

function App() {
  const dispatch = useDispatch();
  const activeModal = useSelector(selectProductModalMode);

  const handleAddProduct = product => {
    dispatch(addProduct(product));
  };

  const handleEditProduct = (productId, product) => {
    dispatch(editProduct(productId, product));
  };

  // move selecting object data to app too?
  // or move add/edit handlers to modal?
  return (
    <BrowserRouter>
      <h1>Shop product management app</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<ProductListPage />} />
          <Route path="/products/:productId" element={<ProductPage />}>
            <Route path="comments" element={<ProductCommentSection />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        {activeModal === ActiveModal.Add && (
          <ProductModal onSubmit={handleAddProduct} />
        )}
        {activeModal === ActiveModal.Edit && (
          <ProductModal onSubmit={handleEditProduct} />
        )}
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
