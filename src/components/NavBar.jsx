import { useState } from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import CartWidget from "./CartWidget";

function NavBar() {
  const [activeKey, setActiveKey] = useState("#home");

  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
      <Container>
        <Navbar.Brand href="#home">SPECIAL</Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav
            className="mx-auto"
            activeKey={activeKey}
            onSelect={(selectedKey) => setActiveKey(selectedKey)}
          >
            <Nav.Link eventKey="#home" href="#home">Inicio</Nav.Link>
            
            {/* Productos como dropdown */}
            <NavDropdown title="Productos" id="productos-dropdown">
              <NavDropdown.Item eventKey="#Base camas" href="#baseCamas">Base camas</NavDropdown.Item>
              <NavDropdown.Item eventKey="#Colchones" href="#Colchones">Colchones</NavDropdown.Item>
              <NavDropdown.Item eventKey="#Cabeceros" href="#cabeceros">Cabeceros</NavDropdown.Item>
              <NavDropdown.Item eventKey="#Accesorios" href="#Accesorios">Accesorios</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item eventKey="#ofertas" href="#ofertas">Ofertas</NavDropdown.Item>
            </NavDropdown>

            <Nav.Link eventKey="#contacto" href="#contacto">Contacto</Nav.Link>
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
