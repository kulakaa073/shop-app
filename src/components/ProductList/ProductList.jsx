import { ProductListItem } from './ProductListItem/ProductListItem';

import { useSelector } from 'react-redux';
import { selectProducts } from '../../redux/productsSlice';
import { memo } from 'react';

export const ProductList = memo(function ProductList({ onProductDelete }) {
  const products = useSelector(selectProducts);

  if (!products.length) {
    return <p>No products found</p>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Count</th>
          <th>Size</th>
          <th>Weight</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.map(product => (
          <tr key={product.id}>
            <ProductListItem data={product} onProductDelete={onProductDelete} />
          </tr>
        ))}
      </tbody>
    </table>
  );
});
