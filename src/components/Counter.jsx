import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import "./Counter.css";

function Counter({ ini = 0, stocks = 1000, onAdd }) {
  const [count, setCount] = useState(ini);

  // Si cambia el valor inicial desde el padre, sincronizamos
  useEffect(() => {
    setCount(ini);
  }, [ini]);

  const handleAdd = () => {
    setCount((c) => Math.min(stocks, c + 1));
  };

  const handleSub = () => {
    setCount((c) => Math.max(0, c - 1));
  };

  const handleConfirm = () => {
    if (count <= 0) return;           // no agregamos 0
    onAdd?.(count);
    setCount(0);                      // 🔁 reinicia a 0 después de agregar
    // Si prefieres volver al inicial: setCount(ini);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, maxWidth: 200 }}>
      <p style={{ textAlign: "center", margin: 0 }}>{count}</p>

      <div style={{ display: "flex", justifyContent: "center", gap: 8 }}>
        <Button onClick={handleSub} variant="danger" disabled={count <= 0}>-</Button>
        <Button onClick={handleAdd} variant="success" disabled={count >= stocks}>+</Button>
      </div>

      <Button onClick={handleConfirm} variant="primary" disabled={count <= 0}>
        Agregar al carrito
      </Button>
    </div>
  );
}

export default Counter;
