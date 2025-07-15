import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useAddProductMutation,
  useGetProductsQuery,
} from "../../api/productApi";

const AddProduct = () => {
  const navigate = useNavigate();
  const { data: products = [] } = useGetProductsQuery(); // lấy danh sách hiện có
  const [addProduct] = useAddProductMutation();

  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    brand: "",
    category: "",
    completed: false,
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    const isDuplicate = products.some(
      (p) => p.name.toLowerCase().trim() === formData.name.toLowerCase().trim()
    );

    if (isDuplicate) {
      setError("Tên sản phẩm đã tồn tại");
      return;
    }

    try {
      await addProduct(formData).unwrap();
      setSuccess(true);
      setFormData({
        name: "",
        price: 0,
        brand: "",
        category: "",
        completed: false,
      });

      // Redirect sau 1s nếu cần
      setTimeout(() => {
        navigate("/products");
      }, 1000);
    } catch (err) {
      setError("Đã có lỗi xảy ra khi thêm sản phẩm" + err);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h2 className="text-2xl font-semibold mb-4">Thêm sản phẩm mới</h2>

      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-600">Thêm sản phẩm thành công!</p>}

      <form onSubmit={handleSubmit} className="space-y-4 mt-4">
        <input
          type="text"
          name="name"
          placeholder="Tên sản phẩm"
          value={formData.name}
          onChange={handleChange}
          className="border w-full p-2"
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Giá"
          value={formData.price}
          onChange={handleChange}
          className="border w-full p-2"
          required
        />
        <input
          type="text"
          name="brand"
          placeholder="Thương hiệu"
          value={formData.brand}
          onChange={handleChange}
          className="border w-full p-2"
        />
        <input
          type="text"
          name="category"
          placeholder="Loại"
          value={formData.category}
          onChange={handleChange}
          className="border w-full p-2"
        />

        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Thêm sản phẩm
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
