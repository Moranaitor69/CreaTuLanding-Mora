import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { Card, Button, Spinner, Container, Toast, ToastContainer } from "react-bootstrap";
import { getProductById } from "../firebase/db";
import { CartContext } from "../context/CartContext";
import Counter from "./Counter";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { addItem } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);


  const [toastMsg, setToastMsg] = useState("");
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoading(true);
        const data = await getProductById(id);
        if (alive) setProduct(data);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, [id]);

  const handleAddToCart = (qty) => {
    if (!product || qty <= 0) return;
    addItem(
      { id: product.id, name: product.name, image: product.image, price: product.price },
      qty
    );
    
    setToastMsg(`Se añadieron ${qty} unidad(es) de "${product.name}" al carrito.`);
    setShowToast(true);
  };

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
        <Spinner animation="border" />
      </Container>
    );
  }

  if (!product) {
    return (
      <Container className="text-center mt-5">
        <h2>Producto no encontrado</h2>
        <Button variant="secondary" onClick={() => navigate("/")}>
          Volver al inicio
        </Button>
      </Container>
    );
  }

  const { name, description, image, price, stock } = product;

  return (
    <>
     
      <ToastContainer position="top-end" className="p-3">
        <Toast
          bg="success"
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={2500}
          autohide
        >
          <Toast.Header closeButton>
            <strong className="me-auto">Carrito</strong>
            <small>Ahora</small>
          </Toast.Header>
          <Toast.Body className="text-white">{toastMsg}</Toast.Body>
        </Toast>
      </ToastContainer>

      <Container className="d-flex justify-content-center" style={{ marginTop: "120px" }}>
        <Card style={{ width: "30rem" }} className="shadow-lg p-3">
          {image && (
            <Card.Img
              variant="top"
              src={image}
              alt={name}
              style={{ height: "300px", objectFit: "cover" }}
            />
          )}
          <Card.Body>
            <Card.Title>{name}</Card.Title>
            {description && <Card.Text className="mb-2 text-muted">{description}</Card.Text>}

            <div className="d-flex align-items-center justify-content-between mb-3">
              <h4 className="text-success mb-0">${(price ?? 0).toLocaleString()}</h4>
              <Counter
                ini={0}                 
                stocks={stock ?? 10}
                onAdd={handleAddToCart}
              />
            </div>

            <div className="d-flex gap-2">
              <Button variant="dark" onClick={() => navigate("/")}>
                Volver al inicio
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}
