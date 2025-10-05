import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProducts, getProductsCategories } from "../firebase/db"; 
import { Container, Row, Col, Card, Button, Spinner } from "react-bootstrap";
import "./ItemListContainer.css";

function ItemListContainer({ greeting }) {
  const { categoryName } = useParams(); 
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);

        
        const cat = categoryName ? decodeURIComponent(categoryName) : null;
        const data = cat
          ? await getProductsCategories(cat) 
          : await getProducts();

        if (mounted) setProducts(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error("Error cargando productos:", e);
        if (mounted) setProducts([]);
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => { mounted = false; };
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
      {greeting && <h2 className="text-center mb-4">{greeting}</h2>}
      {categoryName && (
        <h5 className="text-center text-muted mb-3">
          Categoría: {decodeURIComponent(categoryName)}
        </h5>
      )}

      <Row className="g-4 justify-content-center mx-auto" style={{ maxWidth: "1200px", width: "100%" }}>
        {products.map((p) => (
          <Col key={p.id} xs={12} sm={6} md={4} lg={3}>
            <Card className="h-100 shadow-sm product-card">
              {p.image && (
                <Card.Img
                  variant="top"
                  src={p.image}
                  alt={p.name}
                  className="product-image"
                />
              )}
              <Card.Body className="d-flex flex-column">
                <Card.Title className="fs-6">{p.name}</Card.Title>
                {p.category && (
                  <Card.Title className="fs-6 text-muted">{p.category}</Card.Title>
                )}
                <Card.Text className="fw-bold">
                  ${(p.price ?? 0).toLocaleString()}
                </Card.Text>
                <Button
                  as={Link}
                  to={`/product/${p.id}`}
                  variant="secondary"
                  className="mt-auto"
                >
                  Ver más
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}

        {!products.length && (
          <Col xs="12" className="text-center">
            <p>No hay productos</p>
          </Col>
        )}
      </Row>
    </Container>
  );
}

export default ItemListContainer;
