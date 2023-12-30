// src/components/Card.js
import React from 'react';
import { useDrag } from 'react-dnd';

const Card = ({ id, name, age }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'CARD',
    item: { id, name, age },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        border: '1px dashed #000',
        padding: '10px',
        marginBottom: '10px',
        backgroundColor: '#fff',
        cursor: 'move',
      }}
    >
      <h5>{name}</h5>
      <p>Age: {age}</p>
    </div>
  );
};

export default Card;
