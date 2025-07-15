import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetProductByIdQuery,
  useUpdateProductMutation,
} from "../../api/productApi";

const ProductEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: product, isLoading } = useGetProductByIdQuery(Number(id));
  const [updateProduct] = useUpdateProductMutation();

  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    brand: "",
    category: "",
    completed: false,
  });

  useEffect(() => {
    if (product) {
      setFormData(product);
    }
  }, [product]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProduct({ ...formData, id: Number(id) });
    navigate("/products");
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Chỉnh sửa sản phẩm</h2>
      <form onSubmit={handleSubmit} className="space-y-4 mt-4">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Tên sản phẩm"
          className="border p-2 w-full"
        />
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Giá"
          className="border p-2 w-full"
        />
        <input
          type="text"
          name="brand"
          value={formData.brand}
          onChange={handleChange}
          placeholder="Thương hiệu"
          className="border p-2 w-full"
        />
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="Loại"
          className="border p-2 w-full"
        />

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => navigate("/")}
        >
          Cập nhật
        </button>
      </form>
    </div>
  );
};

export default ProductEdit;
