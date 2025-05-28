import css from './Product.module.css';
import { memo } from 'react';

export const Product = memo(function Product({ product }) {
  //console.log('product component: ', product);
  //console.log(product.name);
  return (
    <div className={css.container}>
      <div className={css.product}>
        <h2>{product.name}</h2>
        <img src={product.imageUrl} alt={product.name} />
        <ul>
          <li>Count: {product.count}</li>
          <li>
            Size:
            <ul>
              <li>Width: {product.size.width}</li>
              <li>Height: {product.size.height}</li>
            </ul>
          </li>
          <li>Weight: {product.weight}</li>
        </ul>
      </div>
    </div>
  );
});
