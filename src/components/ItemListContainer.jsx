import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Row, Col, Card, Button, Spinner } from "react-bootstrap";
import "./ItemListContainer.css"; // tu CSS personalizado

function ItemListContainer({ greeting }) {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    const url = categoryName
      ? `https://dummyjson.com/products/category/${categoryName}`
      : `https://dummyjson.com/products?limit=20`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products || data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error cargando productos:", err);
        setLoading(false);
      });
  }, [categoryName]);

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  return (
    <Container fluid className="products-container mt-5 pt-4">
      <Row className="g-4 justify-content-center mx-auto" style={{ maxWidth: "1200px", width: "100%" }}>
        {products.map((product) => (
          <Col key={product.id} xs={12} sm={6} md={4} lg={3}>
            <Card className="h-100 shadow-sm product-card">
              <Card.Img
                variant="top"
                src={product.thumbnail}
                alt={product.title}
                className="product-image"
              />
              <Card.Body className="d-flex flex-column">
                <Card.Title className="fs-6">{product.title}</Card.Title>
                <Card.Text className="fw-bold">${product.price}</Card.Text>
                <Button
                  as={Link}
                  to={`/product/${product.id}`}
                  variant="secondary"
                  className="mt-auto"
                >
                  Ver más
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default ItemListContainer;
