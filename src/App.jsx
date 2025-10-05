import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import ItemListContainer from "./components/ItemListContainer";
import ProductDetail from "./components/ProductDetail";
import CartContainer from "./components/CartContainer";
import Checkout from "./components/Checkout";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<ItemListContainer greeting="¡Bienvenido a nuestra tienda!" />} />
        <Route path="/category/:categoryName" element={<ItemListContainer greeting="Filtrando por categoría" />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/contacto" element={<h2 style={{ textAlign: "center", marginTop: "2rem" }}>Sección de Contacto</h2>} />
        <Route path="/cart" element={<CartContainer />} />
        <Route path="/checkout" element={<Checkout />} />    
      </Routes>
    </Router>
  );
}

export default App;
