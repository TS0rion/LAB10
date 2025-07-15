import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import "./App.css";
import ProductList from "./components/products/ProductList";
import ProductEdit from "./components/products/ProductEdit";
import ProductDetail from "./components/products/ProductDetail";
import AddProduct from "./components/products/AddProduct";

function App() {
  return (
    <>
      <BrowserRouter>
        <h1>
          <Link to="/products">Xem danh sách sản phẩm</Link>
        </h1>
        <Routes>
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/products/add" element={<AddProduct />} />
          <Route path="/products/:id/edit" element={<ProductEdit />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
