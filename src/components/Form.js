// src/components/FormComponent.js
import React, { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const Card = ({ id, name, age, index, moveCard, handleEdit, handleDelete }) => {
  const [, ref] = useDrag({
    type: 'CARD',
    item: { id, index },
  });

  const [, drop] = useDrop({
    accept: 'CARD',
    hover: (item) => {
      if (item.index !== index) {
        moveCard(item.index, index);
        item.index = index;
      }
    },
  });

  return (
    <div ref={(node) => ref(drop(node))} className="card mb-2">
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">Age: {age}</p>
        <button className="btn btn-warning mr-2" onClick={() => handleEdit(index)}>
          Edit
        </button>
        <button className="btn btn-danger" onClick={() => handleDelete(index)}>
          Delete
        </button>
      </div>
    </div>
  );
};

const Form = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
  });

  const [formEntries, setFormEntries] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editIndex !== null) {
      // If editing, update the entry
      const updatedEntries = [...formEntries];
      updatedEntries[editIndex] = formData;
      setFormEntries(updatedEntries);
      setEditIndex(null);
    } else {
      // If not editing, add a new entry
      setFormEntries([...formEntries, formData]);
    }

    setFormData({ name: '', age: '' });
    setShowModal(false);
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setEditIndex(null);
    setShowModal(false);
  };

  const handleEdit = (index) => {
    // Set the form data to the selected entry for editing
    setFormData(formEntries[index]);
    setEditIndex(index);
    setShowModal(true);
  };

  const handleDelete = (index) => {
    // Delete the selected entry
    const updatedEntries = [...formEntries];
    updatedEntries.splice(index, 1);
    setFormEntries(updatedEntries);
  };

  const moveCard = (fromIndex, toIndex) => {
    const updatedEntries = [...formEntries];
    const [movedCard] = updatedEntries.splice(fromIndex, 1);
    updatedEntries.splice(toIndex, 0, movedCard);
    setFormEntries(updatedEntries);
  };

  return (
    <div>
      <button className="btn btn-primary" onClick={handleOpenModal}>
        Open Form
      </button>
      <DndProvider backend={HTML5Backend}>
      <div className={`modal ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{editIndex !== null ? 'Edit Entry' : 'Add New Entry'}</h5>
              <button type="button" className="close" onClick={handleCloseModal}>
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Name:</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="age">Age:</label>
                  <input
                    type="number"
                    id="age"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  {editIndex !== null ? 'Save Changes' : 'Submit'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Display the form entries with draggable cards */}
    
      <div>
        <h2>Form Entries:</h2>
        <div className="row">
          <div className="col">
            <h3>1-18 Age Group:</h3>
            {formEntries
              .filter((entry) => entry.age >= 1 && entry.age <= 18)
              .map((entry, index) => (
                <Card
                  key={index}
                  id={index}
                  name={entry.name}
                  age={entry.age}
                  index={index}
                  moveCard={moveCard}
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                />
              ))}
          </div>
          <div className="col">
            <h3>18-25 Age Group:</h3>
            {formEntries
              .filter((entry) => entry.age > 18 && entry.age <= 25)
              .map((entry, index) => (
                <Card
                  key={index}
                  id={index}
                  name={entry.name}
                  age={entry.age}
                  index={index}
                  moveCard={moveCard}
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                />
              ))}
          </div>
        </div>
      </div> 
<div>
  
</div>
      
      </DndProvider>
    </div>
  );
};

export default Form;
