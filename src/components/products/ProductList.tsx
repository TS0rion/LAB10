import { useNavigate } from "react-router-dom";
import {
  useDeleteProductMutation,
  useGetProductsQuery,
} from "../../api/productApi";

const ProductList = () => {
  const navigate = useNavigate();
  const { data: products, isLoading } = useGetProductsQuery();
  const [deleteProduct] = useDeleteProductMutation();

  if (isLoading) return <p>... Loading</p>;
  return (
    <div>
      <h2>Danh sách sản phẩm </h2>
      <button onClick={() => navigate("/products/add")}>Thêm sản phẩm</button>

      <table className="mt-8 w-full table-auto border border-gray-300 rounded-md ">
        <thead>
          <tr className="text-left">
            <th className="px-4 py-2 border">Tên</th>
            <th className="px-4 py-2 border">Giá</th>
            <th className="px-4 py-2 border">Thương hiệu</th>
            <th className="px-4 py-2 border">Loại</th>
            <th className="px-4 py-2 border">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {products?.map((product) => (
            <tr key={product.id}>
              <td className="px-4 py-2 border">{product.name}</td>
              <td className="px-4 py-2 border">{product.price}</td>
              <td className="px-4 py-2 border">{product.brand}</td>
              <td className="px-4 py-2 border">{product.category}</td>
              <td className="px-4 py-2 border space-x-2">
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded "
                  onClick={() => navigate(`/products/${product.id}`)}
                >
                  Xem
                </button>
                <button
                  className="bg-yellow-400 text-white px-3 py-1 rounded"
                  onClick={() => navigate(`/products/${product.id}/edit`)}
                >
                  Sửa
                </button>
                <button
                  onClick={() => deleteProduct(product.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
