import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import ItemListContainer from "./components/ItemListContainer";
import ProductDetail from "./components/ProductDetail";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<ItemListContainer greeting="¡Bienvenido a nuestra tienda!" />} />
        <Route path="/category/:categoryName" element={<ItemListContainer greeting="Filtrando por categoría" />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/contacto" element={<h2 style={{ textAlign: "center", marginTop: "2rem" }}>Sección de Contacto</h2>} />
      </Routes>
    </Router>
  );
}

export default App;
