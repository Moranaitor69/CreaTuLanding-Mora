import { Navbar, Nav, Container } from "react-bootstrap";
import CartWidget from "./CartWidget";

function NavBar() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
      <Container>
       
        <Navbar.Brand href="#">SPECIAL</Navbar.Brand>

       
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          
          <Nav className="mx-auto">
            <Nav.Link href="#">Inicio</Nav.Link>
            <Nav.Link href="#">Productos</Nav.Link>
            <Nav.Link href="#">Contacto</Nav.Link>
          </Nav>

          {}
          <Nav className="ms-auto">
            <CartWidget />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
