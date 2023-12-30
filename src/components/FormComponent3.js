// src/components/FormComponent.js
import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DropContainer from './DropConatiner';


const FormComponent3 = () => {
  return (
    <div>
      <h1>Movable Cards</h1>
      <DndProvider backend={HTML5Backend}>
       <DropContainer/>
      </DndProvider>
    </div>
  );
};

export default FormComponent3;
