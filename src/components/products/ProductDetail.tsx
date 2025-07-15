import { useNavigate, useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "../../api/productApi";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: products, isLoading } = useGetProductByIdQuery(Number(id));

  if (!products) return <p>Sản phẩm không tồn tại</p>;
  if (isLoading) return <p>... Loading</p>;

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white shadow-md rounded-lg overflow-hidden">
      <h2 className="text-2xl font-bold text-center text-gray-800 py-4 border-b">
        Chi tiết sản phẩm
      </h2>

      <table className="table-auto w-full text-left border-collapse">
        <tbody className="text-gray-700">
          <tr className="border-b">
            <th className="px-6 py-3 w-1/3 font-medium bg-gray-50">ID</th>
            <td className="px-6 py-3">{products?.id}</td>
          </tr>
          <tr className="border-b">
            <th className="px-6 py-3 bg-gray-50">Tên sản phẩm</th>
            <td className="px-6 py-3">{products?.name}</td>
          </tr>
          <tr className="border-b">
            <th className="px-6 py-3 bg-gray-50">Giá</th>
            <td className="px-6 py-3 text-red-600 font-semibold">
              {products?.price} ₫
            </td>
          </tr>
          <tr className="border-b">
            <th className="px-6 py-3 bg-gray-50">Thương hiệu</th>
            <td className="px-6 py-3">{products?.brand}</td>
          </tr>
          <tr className="border-b">
            <th className="px-6 py-3 bg-gray-50">Loại</th>
            <td className="px-6 py-3">{products?.category}</td>
          </tr>
        </tbody>
      </table>

      <div className="text-center py-4">
        <button
          onClick={() => navigate("/products")}
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition"
        >
          Quay về
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
