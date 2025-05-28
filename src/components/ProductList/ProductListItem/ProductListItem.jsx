import { memo } from 'react';
import { useNavigate } from 'react-router-dom';

export const ProductListItem = memo(function ProductListItem({
  data,
  onProductDelete,
}) {
  const navigate = useNavigate();

  const handleSelect = () => {
    navigate(`/products/${data.id}`);
  };

  const handleDelete = () => {
    onProductDelete(data.id);
  };
  //console.log('ProductListItem', data);

  return (
    <>
      <td>{data.name}</td>
      <td>{data.count}</td>
      <td>
        {data.size.width}x{data.size.height}
      </td>
      <td>{data.weight}</td>
      <td>
        <button onClick={handleSelect}>View</button>
        <button onClick={handleDelete}>Delete</button>
      </td>
    </>
  );
});
