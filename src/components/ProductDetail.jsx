import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card, Button, Spinner, Container } from "react-bootstrap";
import Counter from "./Counter"; // 
function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error cargando producto:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
        <Spinner animation="border" variant="primary" />
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

  // Cuando el usuario confirme "Agregar al carrito" desde el contador
  const handleAddToCart = (qty) => {
   
    console.log(`Agregar ${qty} x ${product.title} (id ${product.id})`);
    alert(`Se agregaron ${qty} unidad(es) de "${product.title}" al carrito`);
  };

  return (
    <Container className="d-flex justify-content-center" style={{ marginTop: "120px" }}>
      <Card style={{ width: "30rem" }} className="shadow-lg p-3">
        <Card.Img
          variant="top"
          src={product.thumbnail}
          alt={product.title}
          style={{ height: "300px", objectFit: "cover" }}
        />
        <Card.Body>
          <Card.Title>{product.title}</Card.Title>
          <Card.Text className="mb-2 text-muted">{product.brand}</Card.Text>
          <Card.Text>{product.description}</Card.Text>

          <div className="d-flex align-items-center justify-content-between mb-3">
            <h4 className="text-success mb-0">${product.price}</h4>
            {/* Contador de cantidad */}
            <Counter
              initial={0}
              stock={product.stock ?? 10}  
              onAdd={handleAddToCart}
            />
          </div>

          <div className="d-flex gap-2">
            <Button variant="dark" onClick={() => navigate("/")}>
              Volver al inicio
            </Button>
            {}
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default ProductDetail;
