import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import { FaArrowLeft } from "react-icons/fa";

const fmt = (v) => Number(v || 0).toLocaleString("es-CO", { style: "currency", currency: "COP" });

export default function CartContainer() {
  const { cart, increase, decrease, removeItem, clearCart, getTotal } = useContext(CartContext);
  const total = getTotal();
  const navigate = useNavigate();

  
  const index = window.history.state && window.history.state.idx;
  const canGoBack = typeof index === "number" && index > 0;
  const handleBack = () => (canGoBack ? navigate(-1) : navigate("/"));

  if (cart.length === 0) {
    return (
      <Container className="d-flex flex-column align-items-start justify-content-center" style={{ minHeight: "70vh", marginTop: "80px" }}>
        <Button variant="link" className="mb-3 text-decoration-none" onClick={handleBack}>
          <FaArrowLeft className="me-2" /> Volver
        </Button>

        <div className="align-self-center">No tienes productitos en el carrito 🥺</div>
        <Button as={Link} to="/" variant="secondary" className="mt-3 align-self-center">
          Ir a comprar
        </Button>
      </Container>
    );
  }

  return (
    <Container style={{ marginTop: "90px" }}>
      <Button variant="link" className="mb-3 text-decoration-none" onClick={handleBack}>
        <FaArrowLeft className="me-2" /> Volver
      </Button>

      <div className="d-flex flex-column align-items-center">
        <ListGroup className="w-75">
          {cart.map((item) => (
            <ListGroup.Item key={item.id} className="d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center gap-3">
                {item.image && (
                  <Image src={item.image} alt={item.name} rounded style={{ width: 56, height: 56, objectFit: "cover" }} />
                )}
                <div>
                  <div className="fw-semibold">{item.name}</div>
                  <small className="text-muted">{fmt(item.price)}</small>
                </div>
              </div>

              <div className="d-flex align-items-center gap-2">
                <Button variant="outline-secondary" size="sm" onClick={() => decrease(item.id)}>-</Button>
                <span className="px-2">{item.count}</span>
                <Button variant="outline-secondary" size="sm" onClick={() => increase(item.id)}>+</Button>
              </div>

              <div className="d-flex align-items-center gap-3">
                <div className="fw-bold">{fmt(Number(item.price) * item.count)}</div>
                <Button variant="outline-danger" size="sm" onClick={() => removeItem(item.id)}>Eliminar</Button>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>

        <h4 className="mt-4">Total: {fmt(total)}</h4>

        <div className="d-flex gap-2 mt-3">
          <Button variant="secondary" onClick={clearCart}>Vaciar carrito</Button>
          <Button as={Link} to="/checkout" variant="success">Checkout</Button>
        </div>
      </div>
    </Container>
  );
}
