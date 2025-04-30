import './App.css';

import ProductList from './components/ProductList/ProductList';
import Product from './components/Product/Product';
import ProductEditModal from './components/ProductEditModal/ProductEditModal';

import backupData from './db.json';
import { fetchData } from './utils';
//import { postData } from './utils';
import { useState, useEffect, useRef } from 'react';
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
      <h1>Shop product management app</h1>
      {!isProductViewOpen && (
        <ProductList
          products={products}
          onAddButtonClick={openModal}
          onProductDelete={deleteProduct}
          onProductSelect={selectProduct}
        />
      )}
      {isProductViewOpen && (
        <Product
          product={selectedProduct}
          onProductViewClose={closeProductView}
          onEditButtonClick={openModal}
          comments={comments.filter(
            comment => comment.productId === selectedProduct.id
          )}
          onCommentAdd={addComment}
          onCommentDelete={deleteComment}
        />
      )}
      {isModalOpen && (
        <ProductEditModal
          product={selectedProduct}
          onProductAdd={addProduct}
          onProductEdit={editProduct}
          onModalClose={closeModal}
        />
      )}
    </>
  );
}

export default App;
