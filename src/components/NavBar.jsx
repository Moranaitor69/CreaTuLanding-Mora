import { useState, useEffect } from "react";
import { Navbar, Nav, NavDropdown, Container, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import CartWidget from "./CartWidget";

function NavBar({ onCategoryChange }) {
  const [activeKey, setActiveKey] = useState("/");
  const [cats, setCats] = useState([]);
  const [loadingCats, setLoadingCats] = useState(true);
  const [errCats, setErrCats] = useState("");

  // Normaliza: DummyJSON a veces devuelve array de strings o de objetos {slug, name}
  const normalizeCategories = (raw) => {
    if (!raw) return [];
    if (Array.isArray(raw) && typeof raw[0] === "string") {
      return raw.map((s) => ({ slug: s, name: s }));
    }
    if (Array.isArray(raw) && typeof raw[0] === "object") {
      // puede venir como {slug, name}
      return raw.map((o) => ({ slug: o.slug || o.name || "", name: o.name || o.slug || "" }));
    }
    return [];
  };

  // Pretty label (de kebab-case a “Title Case”)
  const labelize = (s) =>
    (s || "")
      .replace(/-/g, " ")
      .replace(/\b\w/g, (m) => m.toUpperCase());

  useEffect(() => {
    let abort = false;
    (async () => {
      try {
        setLoadingCats(true);
        setErrCats("");
        const res = await fetch("https://dummyjson.com/products/categories");
        if (!res.ok) throw new Error("No se pudieron cargar las categorías");
        const data = await res.json();
        if (!abort) setCats(normalizeCategories(data));
      } catch (e) {
        if (!abort) {
          console.error(e);
          setErrCats("No se pudieron cargar las categorías");
          setCats([]);
        }
      } finally {
        if (!abort) setLoadingCats(false);
      }
    })();
    return () => { abort = true; };
  }, []);

  const handleSelect = (selectedKey, category) => {
    setActiveKey(selectedKey);
    onCategoryChange?.(category);
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
      <Container>
        <Navbar.Brand as={Link} to="/" onClick={() => handleSelect("/", null)}>SPECIAL</Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav
            className="mx-auto"
            activeKey={activeKey}
            onSelect={(selectedKey) => setActiveKey(selectedKey)}
          >
            {/* Inicio */}
            <Nav.Link
              as={Link}
              to="/"
              eventKey="/"
              onClick={() => handleSelect("/", null)}
            >
              Inicio
            </Nav.Link>

            {/* Productos dinámicos */}
            <NavDropdown
              title="Productos"
              id="productos-dropdown"
              menuVariant="dark"
            >
              {/* Ver todo */}
              <NavDropdown.Item
                as={Link}
                to="/"
                onClick={() => handleSelect("/", null)}
              >
                Todos los productos
              </NavDropdown.Item>
              <NavDropdown.Divider />

              {/* Estado de carga / error */}
              {loadingCats && (
                <NavDropdown.Item disabled>
                  <Spinner animation="border" size="sm" className="me-2" />
                  Cargando categorías…
                </NavDropdown.Item>
              )}
              {!!errCats && !loadingCats && (
                <NavDropdown.Item disabled>
                  {errCats}
                </NavDropdown.Item>
              )}

              {/* Lista real de categorías */}
              {!loadingCats && !errCats && cats.map((c) => (
                <NavDropdown.Item
                  key={c.slug}
                  as={Link}
                  to={`/category/${c.slug}`}
                  onClick={() => handleSelect(`/category/${c.slug}`, c.slug)}
                >
                  {labelize(c.name)}
                </NavDropdown.Item>
              ))}
            </NavDropdown>

            {/* Contacto */}
            <Nav.Link
              as={Link}
              to="/contacto"
              eventKey="/contacto"
              onClick={() => handleSelect("/contacto", null)}
            >
              Contacto
            </Nav.Link>
          </Nav>

          {/* Carrito */}
          <Nav className="ms-auto">
            <CartWidget />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
