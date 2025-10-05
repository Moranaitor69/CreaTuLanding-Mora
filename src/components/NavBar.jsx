import { useState, useEffect } from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getCategories } from "../firebase/db";
import CartWidget from "./CartWidget";

function NavBar({ onCategoryChange }) {
  const [activeKey, setActiveKey] = useState("/");
  const [cats, setCats] = useState([]);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const raw = await getCategories();
        // Normalizamos: siempre { id, categoryName }
        const normalized = (Array.isArray(raw) ? raw : []).map((c, idx) => {
          if (typeof c === "string") {
            return { id: String(idx), categoryName: c };
          }
          return { id: c.id ?? String(idx), categoryName: c.categoryName ?? "" };
        }).filter(c => c.categoryName);
        if (alive) setCats(normalized);
      } catch (e) {
        console.error("No se pudieron cargar categorías:", e);
        if (alive) setCats([]);
      }
    })();
    return () => { alive = false; };
  }, []);

  const handleSelect = (selectedKey, category) => {
    setActiveKey(selectedKey);
    onCategoryChange?.(category);
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
      <Container>
        <Navbar.Brand as={Link} to="/" onClick={() => handleSelect("/", null)}>
          SPECIAL
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto" activeKey={activeKey} onSelect={(k) => setActiveKey(k)}>
            <Nav.Link as={Link} to="/" eventKey="/" onClick={() => handleSelect("/", null)}>
              Inicio
            </Nav.Link>

            <NavDropdown title="Productos" id="productos-dropdown" menuVariant="dark">
              <NavDropdown.Item as={Link} to="/" onClick={() => handleSelect("/", null)}>
                Todos los productos
              </NavDropdown.Item>
              <NavDropdown.Divider />

              {cats.map(({ id, categoryName }) => (
                <NavDropdown.Item
                  key={id || categoryName}
                  as={Link}
                  to={`/category/${encodeURIComponent(categoryName)}`}
                  onClick={() => handleSelect(`/category/${categoryName}`, categoryName)}
                >
                  {categoryName}
                </NavDropdown.Item>
              ))}
            </NavDropdown>

            <Nav.Link
              as={Link}
              to="/contacto"
              eventKey="/contacto"
              onClick={() => handleSelect("/contacto", null)}
            >
              Contacto
            </Nav.Link>
          </Nav>

          <Nav className="ms-auto">
            <CartWidget />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
