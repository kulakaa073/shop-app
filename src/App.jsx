import './App.css';

import ProductEditModal from './components/ProductModal/ProductModal';

import { fetchData } from './utils';
//import { postData } from './utils';
import { useState, useEffect, useRef, Suspense } from 'react';

import { Provider } from 'react-redux';
import store from './store/store';

import { BrowserRouter } from 'react-router-dom';

function App() {
  const initialFetch = useRef(false);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isProductViewOpen, setIsProductViewOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [comments, setComments] = useState([]);

  // Fetch data on page load
  useEffect(() => {
    async function onInitialFetch() {
      if (initialFetch.current) return;
      initialFetch.current = true;

      await fetchData('products')
        .then(response => {
          console.log(response);
          if (response.data.length === 0) {
            throw new Error('No products found');
          }
          return response.data;
        })
        .then(data => {
          setProducts(data);
        })
        .catch(err => {
          console.error(err);
          //it will error cuz there is no proper backend yet
          //load from json file
          setProducts(backupData.products);
        });

      // Fetch comments on page load
      await fetchData('comments')
        .then(response => {
          console.log(response);
          if (response.data.length === 0) {
            throw new Error('No comments found');
          }
          return response.data;
        })
        .then(data => {
          setComments(data);
        })
        .catch(err => {
          console.error(err);
          //it will error cuz there is no proper backend yet
          //load from json file
          setComments(backupData.comments);
        });
    }
    onInitialFetch();
  }, []);

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);
  useEffect(() => {
    localStorage.setItem('comments', JSON.stringify(comments));
  }, [comments]);

  // Update products on change
  // Look at it later
  /*   useEffect(() => {
    postData('products', products)
      .then(response => {
        console.log('Products updated successfully:', response.data);
      })
      .catch(err => {
        console.error('Error updating products:', err);
      });
  }, [products]); */

  const selectProduct = product => {
    setSelectedProduct(product);
    setIsProductViewOpen(true);
  };

  const closeProductView = () => {
    setSelectedProduct(null);
    setIsProductViewOpen(false);
  };

  const addProduct = product => {
    setProducts(prevProducts => {
      return [...prevProducts, product];
    });
  };

  const editProduct = editedProduct => {
    setProducts(prevProducts => {
      return prevProducts.map(product =>
        product.id === editedProduct.id ? editedProduct : product
      );
    });
    if (selectedProduct && selectedProduct.id === editedProduct.id) {
      setSelectedProduct(editedProduct);
    }
  };

  const deleteProduct = productId => {
    setProducts(prevProducts => {
      return prevProducts.filter(product => product.id !== productId);
    });
  };

  const addComment = comment => {
    setComments(prevComments => {
      return [...prevComments, comment];
    });
  };

  const deleteComment = commentId => {
    setComments(prevComments => {
      return prevComments.filter(comment => comment.id !== commentId);
    });
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Provider store={store}>
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
          </Suspense>
          {isModalOpen && (
            <ProductEditModal
              product={selectedProduct}
              onProductAdd={addProduct}
              onProductEdit={editProduct}
              onModalClose={closeModal}
            />
          )}
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
