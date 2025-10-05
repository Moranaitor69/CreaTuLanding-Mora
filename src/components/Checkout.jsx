import { useContext, useState, useMemo } from "react";
import { Container, Card, Form, Button, Alert, ListGroup, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { createOrder } from "../firebase/db";


const fmt = (v) => Number(v || 0).toLocaleString("es-CO", { style: "currency", currency: "COP" });

export default function Checkout() {
  const { cart, getTotal, clearCart } = useContext(CartContext);
  const total = getTotal();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [err, setErr] = useState("");

  
  const canSubmit = useMemo(() => cart.length > 0, [cart]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");

    if (!canSubmit) return;

    
    const form = e.target;
    const email = form.email.value.trim();
    const name  = form.name.value.trim();
    const phone = form.phone.value.trim();

    if (!email || !name || !phone) {
      setErr("Completa todos los campos.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setErr("Ingresa un correo válido.");
      return;
    }

   
    const order = {
      buyer: { name, email, phone },
      total,
      items: cart.map(({ id, name, price, count }) => ({
        id,
        name,
        price,
        quantity: count,
      })),
      
    };

    try {
      setLoading(true);
      const id = await createOrder(order);
      setOrderId(id);
      clearCart();
    } catch (ex) {
      console.error(ex);
      setErr("Ocurrió un error creando la orden. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };


  if (cart.length === 0 && !orderId) {
    return (
      <Container className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: "70vh", marginTop: "80px" }}>
        <p className="mb-3">Tu carrito está vacío.</p>
        <Button as={Link} to="/" variant="secondary">Ir a comprar</Button>
      </Container>
    );
  }

  
  if (orderId) {
    return (
      <Container style={{ marginTop: "100px" }}>
        <Card className="p-4 mx-auto" style={{ maxWidth: 560 }}>
          <h4 className="mb-3">¡Gracias por tu compra! 🎉</h4>
          <p className="mb-1">Tu número de orden es:</p>
          <Alert variant="success" className="fw-bold">{orderId}</Alert>
          <div className="d-flex gap-2">
            <Button as={Link} to="/" variant="dark">Volver al inicio</Button>
            <Button variant="outline-secondary" onClick={() => navigate(-1)}>Volver atrás</Button>
          </div>
        </Card>
      </Container>
    );
  }

  return (
    <Container style={{ marginTop: "100px", maxWidth: 720 }}>
      <Card className="p-4 mx-auto">
        <h4 className="mb-3">Checkout</h4>
        {err && <Alert variant="danger">{err}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control name="email" type="email" placeholder="tu@correo.com" required />
            <Form.Text className="text-muted">Nunca compartiremos tu email.</Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control name="name" type="text" placeholder="Pepito Pérez" required />
          </Form.Group>

          <Form.Group className="mb-4" controlId="phone">
            <Form.Label>Phone</Form.Label>
            <Form.Control name="phone" type="tel" placeholder="+57 300 000 0000" required />
          </Form.Group>

          <h6 className="mb-2">Resumen</h6>
          <ListGroup className="mb-3">
            {cart.map((it) => (
              <ListGroup.Item key={it.id} className="d-flex justify-content-between">
                <span>{it.name} × {it.count}</span>
                <strong>{fmt(Number(it.price) * it.count)}</strong>
              </ListGroup.Item>
            ))}
            <ListGroup.Item className="d-flex justify-content-between">
              <span>Total</span>
              <strong>{fmt(total)}</strong>
            </ListGroup.Item>
          </ListGroup>

          <Button type="submit" variant="dark" disabled={!canSubmit || loading}>
            {loading ? <><Spinner size="sm" className="me-2" />Procesando…</> : "Finalizar compra 🎉"}
          </Button>
          <Button className="ms-2" variant="outline-secondary" as={Link} to="/cart">
            Volver al carrito
          </Button>
        </Form>
      </Card>
    </Container>
  );
}
