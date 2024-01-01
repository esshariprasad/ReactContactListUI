import React, { useEffect, useState } from "react";

const FormComponent1 = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    phone: "",
    email: "",
  });

  const [formEntries, setFormEntries] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [uiKey, setUIKey] = useState(0);
  const [editableUIkey, setEditableUIkey] = useState(null);
  const [editWindowActive, setEditWindowActive] = useState(false);
  const [displayResults, setDisplayResults] = useState([]);
  const [searchActive, setSearchActive] = useState(false);
  const [editInSearch, setEditInSearch] = useState(false);
  const handleChange = (e) => {
    if (editWindowActive) {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
        uiKey: editableUIkey,
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
        uiKey: uiKey,
      });
    }
    // something for submit button
    setSearchActive(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editWindowActive !== true) {
      const updatedEntries = [...formEntries, formData];
      setFormEntries(updatedEntries);
    } else {
      // copy the same array and replace based on ui key
      const updatedArrayWithOrder = formEntries.map((obj) => {
        return obj.uiKey === formData.uiKey ? formData : obj;
      });
      setFormEntries(updatedArrayWithOrder);
      setEditWindowActive(false);
    }
    setFormData({ name: "", age: "", phone: "", email: "" });
    setShowModal(false);
  };

  const handleOpenModal = () => {
    setUIKey(uiKey + 1);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setEditIndex(null);
    setShowModal(false);
  };

  const handleEdit = (uiKey) => {
    // Set the form data to the selected entry for editing
    setEditWindowActive(true);
    let entry_to_be_edited = formEntries.filter(
      (entry) => entry.uiKey === uiKey
    );
    let rest_of_entries = formEntries.filter((entry) => entry.uiKey !== uiKey);
    setEditableUIkey(entry_to_be_edited[0].uiKey);
    setFormData(entry_to_be_edited[0]);
    // compare formday and replacce with same uikey component
    // setFormEntries(rest_of_entries);
    // setEditIndex(index);
    setShowModal(true);
  };

  const handleDelete = (uiKey) => {
    // Delete the selected entry
    let updatedEntries = formEntries.filter((item) => item.uiKey !== uiKey);
    setFormEntries(updatedEntries);
  };

  const handleSortByAge = () => {
    const sortedEntries = [...formEntries].sort((a, b) => a.age - b.age);
    setFormEntries(sortedEntries);
  };

  const searchByName = (formEntries) => {
    //  formEntries contain orginal data
    // search results contain filtered data
    // setSearchActive(true)
    setSearchActive(false);
    if ((searchTerm.length > 1) & (searchTerm !== "")) {
      setSearchActive(true);
      formEntries.forEach((entry) => {
        let lower_case_person_name = entry.name.toLowerCase();
        // bring both two lower case to search effectively
        let lowercase_searchTerm = searchTerm.toLowerCase();

        if (lower_case_person_name.startsWith(lowercase_searchTerm)) {
          searchResults.push(entry);
        }
      });
      setDisplayResults(searchResults);
      setEditInSearch(true);
      // update the UI
    } else {
      setSearchActive(false);
      setEditInSearch(false);
      // setSearchTerm('')
    }
  };
  const [searchField, setSearchField] = useState("");

  // search code
  const handleSearchClick = (e) => {
    e.preventDefault();
    setSearchResults([]);
    setSearchField(e.target.value);
    setSearchTerm(e.target.value);
    // setSearchActive(true)
    searchByName(formEntries);
  };
  // Group entries by age range (1-18 and 18-25 and 25-45 and 45+)
  const ageGroups = {
    "1-18": [],
    "18-25": [],
    "25-45": [],
    "45+": [],
  };

  // for current editable ui key
  useEffect(() => {
    setEditableUIkey(formData.uiKey);
  }, [formData.uiKey]);
  useEffect(() => {
    formEntries.forEach((entry) => {
      const age = parseInt(entry.age, 10);
      if (age >= 1 && age < 18) {
        ageGroups["1-18"].push(entry);
      } else if (age >= 18 && age < 25) {
        ageGroups["18-25"].push(entry);
      } else if (age >= 25 && age < 45) {
        ageGroups["25-45"].push(entry);
      } else if (age >= 45) {
        ageGroups["45+"].push(entry);
      }
    });
  }, [formEntries]);

  useEffect(() => {
    if (searchTerm.length < 1) {
      setSearchActive(false);
    }
  }, [searchTerm]);
  // // for display results
  // useEffect(()=>{
  //   setDisplayResults(displayResults)

  // },[formEntries])

  //
  if (searchActive) {
    displayResults.forEach((entry) => {
      const age = parseInt(entry.age, 10);
      if (age >= 1 && age < 18) {
        ageGroups["1-18"].push(entry);
      } else if (age >= 18 && age < 25) {
        ageGroups["18-25"].push(entry);
      } else if (age >= 25 && age < 45) {
        ageGroups["25-45"].push(entry);
      } else if (age >= 45) {
        ageGroups["45+"].push(entry);
      }
    });
    // if search is active and edit in search active  refresh the page
  } else {
    // real entries
    formEntries.forEach((entry) => {
      const age = parseInt(entry.age, 10);
      if (age >= 1 && age < 18) {
        ageGroups["1-18"].push(entry);
      } else if (age >= 18 && age < 25) {
        ageGroups["18-25"].push(entry);
      } else if (age >= 25 && age < 45) {
        ageGroups["25-45"].push(entry);
      } else if (age >= 45) {
        ageGroups["45+"].push(entry);
      }
    });
  }
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

        <span>
          {" "}
          <form class="form-inline">
            <div className="pa2">
              <input
                className="pa3 bb br3 grow b--none bg-lightest-blue ma3"
                type="search"
                placeholder="Search People"
                onChange={handleSearchClick}
              />
            </div>
          </form>
        </span>
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
                  <p className="card-text">Age:{entry.age}</p>
                  <p className="card-text">Phone No: {entry.phone}</p>
                  <p className="card-text">email: {entry.email}</p>

                  <button
                    className="btn btn-warning mr-2"
                    onClick={() => handleEdit(entry.uiKey)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(entry.uiKey)}
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
                    onClick={() => handleEdit(entry.uiKey)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(entry.uiKey)}
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
                  <p className="card-text">Age:{entry.age}</p>
                  <p className="card-text">Phone No: {entry.phone}</p>
                  <p className="card-text">email: {entry.email}</p>

                  <button
                    className="btn btn-warning mr-2"
                    onClick={() => handleEdit(entry.uiKey)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(entry.uiKey)}
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
                  <p className="card-text">Age:{entry.age}</p>
                  <p className="card-text">Phone No: {entry.phone}</p>
                  <p className="card-text">email: {entry.email}</p>
                  <button
                    className="btn btn-warning mr-2"
                    onClick={() => handleEdit(entry.uiKey)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(entry.uiKey)}
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
