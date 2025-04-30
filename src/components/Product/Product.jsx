import ProductCommentSection from './ProductCommentSection/ProductCommentSection';

export default function Product({
  product,
  onProductViewClose,
  onEditButtonClick,
  comments,
  onCommentAdd,
  onCommentDelete,
}) {
  return (
    <div>
      <button onClick={() => onProductViewClose()}>Return</button>
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
      <button onClick={() => onEditButtonClick()}>Edit</button>
      <ProductCommentSection
        comments={comments}
        productId={product.id}
        onCommentAdd={onCommentAdd}
        onCommentDelete={onCommentDelete}
      />
    </div>
  );
}
