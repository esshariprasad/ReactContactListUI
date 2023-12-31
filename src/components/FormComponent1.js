import React, { useEffect, useState } from "react";

const FormComponent1 = () => {
  let mockdata=[{
    name: "Sai Shiva Hari Prasad Embar",
    age: "30",
    phone: "122",
    email: "esshariprasad@gmail.com",
  },
  {
    name: "Sai Shiva E",
    age: "28",
    phone: "122",
    email: "saishiva@gmail.com",
  },
  {
    name: "Hari Prasad",
    age: "10",
    phone: "122",
    email: "ravi@gmail.com",
  },
  {
    name: "Divya ",
    age: "25",
    phone: "832224444",
    email: "divya@gmail.com",
  },
  {
    name: "Ayaan ",
    age: "14",
    phone: "832224444",
    email: "ayaan@gmail.com",
  },
]
  
  

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    phone: "",
    email: "",
  });

  
  const setUPMockData=(mockdata)=>{
    console.log("setting up mock data")
    console.log(mockdata)
     setFormEntries(mockdata)
    
   
    //  setFormEntries(mockdata)
  }


  const [formEntries, setFormEntries] = useState([])
  const [showModal, setShowModal] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([])
  
  const handleChange = (e) => {
    console.log("formdata")
    console.log(formData)
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
      console.log("current form entries")
      console.log(formData)
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

  const searchByName = (formEntries)=>{
  //  formEntries contain orginal data
  // search results contain filtered data
    console.log("formEntries")
    console.log(formEntries)
    console.log("search term current:")
    console.log(searchTerm)
    console.log(searchTerm.length)
    if(searchTerm.length>1){
    let filtered_results=[{}]
    formEntries.forEach((entry)=>{
      let lower_case_person_name=entry.name.toLowerCase();
      // bring both two lower case to search effectively
      let lowercase_searchTerm = searchTerm.toLowerCase()
      
      console.log(entry.name)
      console.log(lower_case_person_name.startsWith(lowercase_searchTerm))
      if (lower_case_person_name.startsWith(lowercase_searchTerm)) {
        searchResults.push(entry);
        }
    })
    console.log(searchResults)
    // update the UI


  }

  }


  
  const [searchField, setSearchField] = useState("");
  
  // search code
  const handleSearchClick = e => {
    setSearchResults([])
    setSearchField(e.target.value);
    console.log("search term")
    console.log(e.target.value)
    // console.log(formEntries)
    setSearchTerm(e.target.value)
    searchByName(formEntries)
    // setFormEntries(searchResults)
    
    // searchResults.forEach((entry) => {
    //   const age = parseInt(entry.age, 10);
    //   if (age >= 1 && age <= 18) {
    //     ageGroups["1-18"].push(entry);
    //   } else if (age > 18 && age <= 25) {
    //     ageGroups["18-25"].push(entry);
    //   } else if (age > 25 && age <= 45) {
    //     ageGroups["25-45"].push(entry);
    //   } else if (age >= 45) {
    //     ageGroups["45+"].push(entry);
    //   }
    // });
  

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

  // useEffect(()=>{
  // formEntries.forEach((entry) => {
  //   const age = parseInt(entry.age, 10);
  //   if (age >= 1 && age <= 18) {
  //     ageGroups["1-18"].push(entry);
  //   } else if (age > 18 && age <= 25) {
  //     ageGroups["18-25"].push(entry);
  //   } else if (age > 25 && age <= 45) {
  //     ageGroups["25-45"].push(entry);
  //   } else if (age >= 45) {
  //     ageGroups["45+"].push(entry);
  //   }
  // });
  // },[formEntries])
  
  useEffect(
    (formData)=>{
      // intial setup

      // console.log(formData)
      // setFormEntries(...formData)
  
      setUPMockData(mockdata)
      // console.log(formEntries)
      // console.log(searchTerm)
      

    }
    ,
  [])

  formEntries.forEach((entry) => {
    console.log("ran")
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
              <div className="card mb-2" key={index+18}>
                <div className="card-body">
                  <h5 className="card-title">{entry.name}</h5>
                  <p className="card-text">Age: with {index+1}:{entry.age}</p>
                  <p className="card-text">Phone No: {entry.phone}</p>
                  <p className="card-text">email: {entry.email}</p>
                  <button
                    className="btn btn-warning mr-2"
                    onClick={() => handleEdit(index+1)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(index+1)}
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
              <div className="card mb-2" key={index+18}>
                <div className="card-body">
                  <h5 className="card-title">{entry.name}</h5>
                  <p className="card-text">Age: with {index+18}: {entry.age}</p>
                  <p className="card-text">Phone No: {entry.phone}</p>
                  <p className="card-text">email: {entry.email}</p>
                  <button
                    className="btn btn-warning mr-2"
                    onClick={() => handleEdit(index+18)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(index+18)}
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
              <div className="card mb-2" key={index+25}>
                <div className="card-body">
                  <h5 className="card-title">{entry.name}</h5>
                  <p className="card-text">Age: with {index+25}: {entry.age}</p>
                  <p className="card-text">Phone No: {entry.phone}</p>
                  <p className="card-text">email: {entry.email}</p>
                  <button
                    className="btn btn-warning mr-2"
                    onClick={() => handleEdit(index+25)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(index+25)}
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
              <div className="card mb-2" key={index+45}>
                <div className="card-body">
                  <h5 className="card-title">{entry.name}</h5>
                  <p className="card-text">Age: with {index+45} {entry.age}</p>
                  <p className="card-text">Phone No: {entry.phone}</p>
                  <p className="card-text">email: {entry.email}</p>
                  <button
                    className="btn btn-warning mr-2"
                    onClick={() => handleEdit(index+45)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(index+45)}
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
