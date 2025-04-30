export default function ProductListItem({
  product,
  onProductDelete,
  onProductSelect,
}) {
  const handleDelete = () => {
    onProductDelete(product.id);
  };

  const handleSelect = () => {
    onProductSelect(product);
  };

  return (
    <>
      <td>{product.name}</td>
      <td>{product.count}</td>
      <td>
        {product.size.width}x{product.size.height}
      </td>
      <td>{product.weight}</td>
      <td>
        <button onClick={handleSelect}>View</button>
        <button onClick={handleDelete}>Delete</button>
      </td>
    </>
  );
}
