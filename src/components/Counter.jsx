import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import "./Counter.css";

function Counter({ initial = 1, stock = 10, onAdd }) {
  const [count, setCount] = useState(initial)

  const handleAdd = () => {
    if (count < stock) {
      setCount(count + 1)
    }
  }

  const handleSub = () => {
    if (count > 1) {
      setCount(count - 1)
    }
  }

  const handleConfirm = () => {
    onAdd?.(count) 
    console.log(`Agregado al carrito: ${count} unidades`)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxWidth: '200px' }}>
      <p style={{ textAlign: 'center', margin: 0 }}>{count}</p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
        <Button onClick={handleSub} variant="danger">-</Button>
        <Button onClick={handleAdd} variant="success">+</Button>
      </div>
      <Button onClick={handleConfirm} variant="primary">
        Agregar al carrito
      </Button>
    </div>
  )
}

export default Counter
