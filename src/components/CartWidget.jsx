import { useContext } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import Badge from "react-bootstrap/Badge";
import "./CartWidget.css";
import { CartContext } from "../context/CartContext";

function CartWidget() {
  const { getCount } = useContext(CartContext);
  const count = getCount();

  return (
    <Link to="/cart" className="cart-widget text-decoration-none text-light">
      <FaShoppingCart className="cart-icon" />
      {count > 0 && (
        <Badge bg="danger" pill className="cart-badge">
          {count}
        </Badge>
      )}
    </Link>
  );
}

export default CartWidget;
