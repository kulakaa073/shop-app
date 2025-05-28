import './App.css';

import { lazy, Suspense } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { selectProductModalMode } from './redux/productModalSlice';
import { addProduct, editProduct } from './redux/productOps';
import { ProductCommentSection } from './components/Product/ProductCommentSection/ProductCommentSection';

const ProductListPage = lazy(() =>
  import('./pages/ProductListPage/ProductListPage')
);
const ProductPage = lazy(() => import('./pages/ProductPage/ProductPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage/NotFoundPage'));
const ProductModal = lazy(() =>
  import('./components/ProductModal/ProductModal')
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

  const handleEditProduct = product => {
    dispatch(editProduct(product));
  };

  // move selecting object data to app from modal too?
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
