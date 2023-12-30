import React, { useState } from "react";

const FormComponent1 = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    phone: "",
    email: "",
  });

  const [formEntries, setFormEntries] = useState([])
  const [showModal, setShowModal] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
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

    setFormData({ name: "", age: "", phone: "", email: "" });
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
  const handleSortByAge = () => {
    const sortedEntries = [...formEntries].sort((a, b) => a.age - b.age);
    setFormEntries(sortedEntries);
  };
  
  const [searchField, setSearchField] = useState("");
  const handleSearchClick = e => {
    setSearchField(e.target.value);
};

const filtered = !searchField
    ? formEntries
    : formEntries.filter((e1) =>
        e1.name.toLowerCase().includes(searchField.toLowerCase()) ||
        e1.age.toLowerCase().includes(searchField.toLowerCase()) ||
        e1.phone.toLowerCase().includes(searchField.toLowerCase())||
        e1.email.toLowerCase().includes(searchField.toLowerCase())
    );
  // Group entries by age range (1-18 and 18-25 )
  const ageGroups = {
    "1-18": [],
    "18-25": [],
    "25-45": [],
    "45+": [],
  };

  formEntries.forEach((entry) => {
    const age = parseInt(entry.age, 10);
    if (age >= 1 && age <= 18) {
      ageGroups["1-18"].push(entry);
    } else if (age > 18 && age <= 25) {
      ageGroups["18-25"].push(entry);
    } else if (age > 25 && age <= 45) {
      ageGroups["25-45"].push(entry);
    } else if (age >= 45) {
      ageGroups["45+"].push(entry);
    }
  });

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
              <h5 className="modal-title">
                {editIndex !== null ? "Edit Entry" : "Add New Entry"}
              </h5>
              <button
                type="button"
                className="close"
                onClick={handleCloseModal}
              >
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
                  {editIndex !== null ? "Save Changes" : "Submit"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Display the form entries in different cards based on age groups */}
      <div>
        <h2>Form Entries:</h2>
      

        <span>  <form class="form-inline">
                        <div className="pa2">
                            <input
                                className="pa3 bb br3 grow b--none bg-lightest-blue ma3"
                                type="search"
                                placeholder="Search People"
                                onChange={handleSearchClick}
                            />
                        </div>
                    </form></span> 
        <button className="btn btn-primary ml-2" onClick={handleSortByAge}>
        Sort by Age
      </button>
        <div className="row">
          <div className="col">
            <h3>1-18 Age Group:</h3>
            {ageGroups["1-18"].map((entry, index) => (
              <div className="card mb-2" key={index}>
                <div className="card-body">
                  <h5 className="card-title">{entry.name}</h5>
                  <p className="card-text">Age: {entry.age}</p>
                  <p className="card-text">Phone No: {entry.phone}</p>
                  <p className="card-text">email: {entry.email}</p>
                  <button
                    className="btn btn-warning mr-2"
                    onClick={() => handleEdit(index)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(index)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="col">
            <h3>18-25 Age Group:</h3>
            {ageGroups["18-25"].map((entry, index) => (
              <div className="card mb-2" key={index}>
                <div className="card-body">
                  <h5 className="card-title">{entry.name}</h5>
                  <p className="card-text">Age: {entry.age}</p>
                  <p className="card-text">Phone No: {entry.phone}</p>
                  <p className="card-text">email: {entry.email}</p>
                  <button
                    className="btn btn-warning mr-2"
                    onClick={() => handleEdit(index)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(index)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="col">
            <h3>25-45 Age Group:</h3>
            {ageGroups["25-45"].map((entry, index) => (
              <div className="card mb-2" key={index}>
                <div className="card-body">
                  <h5 className="card-title">{entry.name}</h5>
                  <p className="card-text">Age: {entry.age}</p>
                  <p className="card-text">Phone No: {entry.phone}</p>
                  <p className="card-text">email: {entry.email}</p>
                  <button
                    className="btn btn-warning mr-2"
                    onClick={() => handleEdit(index)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(index)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="col">
            <h3>45+ Age Group:</h3>
            {ageGroups["45+"].map((entry, index) => (
              <div className="card mb-2" key={index}>
                <div className="card-body">
                  <h5 className="card-title">{entry.name}</h5>
                  <p className="card-text">Age: {entry.age}</p>
                  <p className="card-text">Phone No: {entry.phone}</p>
                  <p className="card-text">email: {entry.email}</p>
                  <button
                    className="btn btn-warning mr-2"
                    onClick={() => handleEdit(index)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(index)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormComponent1;
