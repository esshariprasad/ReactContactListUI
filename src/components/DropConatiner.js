// src/components/DropContainer.js
import React, { useState } from 'react';
import { useDrop } from 'react-dnd';
import Card from './Card';

const DropContainer = () => {
  const [cards, setCards] = useState([]);

  const [{ isOver }, drop] = useDrop({
    accept: 'CARD',
    drop: (item) => {
      setCards([...cards, { id: item.id, text: `Card ${item.id + 1}` }]);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <div
      ref={drop}
      style={{
        border: `2px dashed ${isOver ? 'green' : 'black'}`,
        padding: '20px',
        marginBottom: '20px',
      }}
    >
      <h2>Drop Zone</h2>
      {cards.map((card) => (
        <Card key={card.id} id={card.id} text={card.text} />
      ))}
    </div>
  );
};

export default DropContainer;
