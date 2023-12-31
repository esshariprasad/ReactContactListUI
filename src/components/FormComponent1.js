import React, { useEffect, useState } from "react";

const FormComponent1 = () => {
  let mockdata=[{
    name: "Sai Shiva Hari Prasad Embar",
    age: "30",
    phone: "122",
    email: "esshariprasad@gmail.com",
    uiKey:1,
  },
  {
    name: "Sai Shiva E",
    age: "28",
    phone: "122",
    email: "saishiva@gmail.com",
    uiKey:2,
  },
  {
    name: "Hari Prasad",
    age: "10",
    phone: "122",
    email: "ravi@gmail.com",
    uiKey:3,
  },
  {
    name: "Divya",
    age: "25",
    phone: "832224444",
    email: "divya@gmail.com",
    uiKey:4,
  },
  {
    name: "Ayaan ",
    age: "14",
    phone: "832224444",
    email: "ayaan@gmail.com",
    uiKey:5,
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
     setUIKey(10)
    
   
    //  setFormEntries(mockdata)
  }


  const [formEntries, setFormEntries] = useState([])
  const [showModal, setShowModal] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([])
  const [uiKey,setUIKey]=useState(0)
  const [editableUIkey,setEditableUIkey]=useState(null)
  const [editWindowActive,setEditWindowActive]=useState(false)
  
  const handleChange = (e) => {
    console.log("formdata")
    console.log(formData)
    setFormData({ ...formData, [e.target.name]: e.target.value , uiKey:uiKey});
    // something for submit button
    console.log("next key value")
    console.log(uiKey)
 
  };

  const handleSubmit = (e) => {
  
    // setUIKey(uiKey+1)
    e.preventDefault();
    if (editWindowActive!==true) {
      // If editing, update the entry
      const updatedEntries = [...formEntries,formData];
      setFormEntries(updatedEntries);
    } 
    else {
      // editing is active
      console.log("current edited entry")
      console.log(formData)
      // updating entries with newform data but previous data needed be replaced
      // setFormEntries([...formEntries, formData]);
      // copy the same array and replace based on ui key
      console.log(formData.uiKey) 
      console.log("editable UI key")
      console.log(editableUIkey)


      console.log("updated array with order ")
      // console.log(updatedArrayWithOrder)
      // setFormEntries(updatedArrayWithOrder)
      setEditWindowActive(false)

    }

    setFormData({ name: "", age: "", phone: "", email: "" });
    setShowModal(false);
  };

  const handleOpenModal = () => {
    setUIKey(uiKey+1)
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setEditIndex(null);
    setShowModal(false);
  };

  const handleEdit = (uiKey) => {
    // Set the form data to the selected entry for editing
    console.log("in edit window")
    setEditWindowActive(true)
    let entry_to_be_edited = formEntries.filter((entry) => entry.uiKey === uiKey);
    let rest_of_entries = formEntries.filter((entry) => entry.uiKey !== uiKey);
    console.log("entry to be edited")
    console.log(entry_to_be_edited[0])
    console.log("setting UIkey to edit")
    setEditableUIkey(entry_to_be_edited[0].uiKey)
    console.log(entry_to_be_edited[0].uiKey)

//     const newArray = array.map((obj) =>
//   obj.uiKey === uiKeyToUpdate ? { ...obj, name: newName } : obj
// );

    console.log("setting up for edit")
    setFormData(entry_to_be_edited[0])
  
    // console.log(editableUIkey )
    console.log("rest of the entires")
    console.log(rest_of_entries)

    // compare formday and replacce with same uikey component

    // setFormEntries(rest_of_entries);
    // setEditIndex(index);
    setShowModal(true);
  };

  const handleDelete = (uiKey) => {
    // Delete the selected entry
    let updatedEntries = formEntries.filter(item => item.uiKey !== uiKey);
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

  // for current editable ui key
  useEffect(()=>{
    setEditableUIkey(formData.uiKey)

  },[formData.uiKey])
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
              <div className="card mb-2" key={index}>
                <div className="card-body">
                  <h5 className="card-title">{entry.name}</h5>
                  <p className="card-text">Age:{entry.age}</p>
                  <p className="card-text">Phone No: {entry.phone}</p>
                  <p className="card-text">email: {entry.email}</p>
                  <p className="card-text">uiKey: {entry.uiKey}</p>

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
                  <p className="card-text">uiKey: {entry.uiKey}</p>
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
                  <p className="card-text">uiKey: {entry.uiKey}</p>
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
