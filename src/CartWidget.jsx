import { FaShoppingCart } from "react-icons/fa";
import Badge from "react-bootstrap/Badge";
import "./NavBar.css";

function CartWidget() {
  return (
    <div className="cart-widget">
      <FaShoppingCart />
      <Badge bg="danger" pill className="cart-badge">
        3
      </Badge>
    </div>
  );
}

export default CartWidget;
