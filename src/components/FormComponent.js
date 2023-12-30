// src/components/FormComponent.js
import React,{ useState } from "react";
import DropContainer from "./DropContainer";

const FormComponent = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    phone: "",
    email: "",
  });

  const [formEntries, setFormEntries] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormEntries([...formEntries, formData]);
    setFormData({ name: "", age: "", phone: "", email: "" });
    setShowModal(false);
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
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

  return (
    <div>
      <button className="btn btn-primary" onClick={handleOpenModal}>
        Open Form
      </button>

      <div
        className={`modal ${showModal ? "show" : ""}`}
        style={{ display: showModal ? "block" : "none" }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Form Modal</h5>
             
            </div>
            <div className="modal-body" style={{display:"block"}}>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Name:</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-control"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="age">Age:</label>
                  <input
                    type="number"
                    id="age"
                    name="age"
                    className="form-control"
                    value={formData.age}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="phone">Phone:</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="form-control"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-control"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                {editIndex !== null ? 'Save Changes' : 'Submit'}
                </button>
                <button
                type="button"
                className="close"
                onClick={handleCloseModal}
              >close
                <span>&times;</span>
              </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Display the form entries */}
      {/* <div>
        <h2>Form Entries:</h2>
        <div className="card-deck">
          {formEntries.map((entry, index) => (
            <div className="card" key={index}>
              <div className="card-body">
                <h5 className="card-title">{entry.name}</h5>
                <p className="card-text">Age: {entry.age}</p>
                <p className="card-text">Phone No: {entry.phone}</p>
                <p className="card-text">email: {entry.email}</p>
                <button className="btn btn-warning mr-2" onClick={() => handleEdit(index)}>
                  Edit
                </button>
                <button className="btn btn-danger" onClick={() => handleDelete(index)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div> */}
<div> <DropContainer/></div>
     
    </div>
  );
};

export default FormComponent;
