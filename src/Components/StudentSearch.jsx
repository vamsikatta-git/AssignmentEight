import React, { useState, useEffect } from 'react';
import { UseDetails } from './AddDetails'; // Import UseDetails hook
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

const StudentSearch = () => {
  const { addDetails, setAddDetails } = UseDetails(); // Access addDetails and setAddDetails from context
  const [filterInp, setFilterInp] = useState(addDetails);
  const [searchValue, setSearchValue] = useState('');

  const handleInput = (e) => {
    const values = e.target.value;
    const newVal = values.toLowerCase();
    setSearchValue(values);

    // Filter addDetails based on search input
    const filteredData = addDetails.filter((item) =>
      item.name.toLowerCase().includes(newVal)
    );
    setFilterInp(filteredData);
  };

  // Update filterInp whenever addDetails changes
  useEffect(() => {
    if (!searchValue) {
      setFilterInp(addDetails);
    }
  }, [addDetails, searchValue]);

  // Function to handle deletion of a student
  const handleDelete = (id) => {
    const updatedDetails = addDetails.filter((item) => item.id !== id);
    setAddDetails(updatedDetails); // Update context state
    setFilterInp(updatedDetails); // Update local filter input
  };

  return (
    <>
    <ToastContainer
     position="top-right"
     autoClose={5000}
     hideProgressBar={false}
     newestOnTop={false}
     closeOnClick
     rtl={false}
     pauseOnFocusLoss
     draggable
     pauseOnHover
     theme="light"
    />
      <div className="d-flex justify-content-center">
        <input
          type="text"
          onChange={handleInput}
          placeholder="Enter your name"
          className="mt-5 bg-dark text-light w-50 rounded"
        />
      </div>
      <table className="table table-dark table-striped w-75 m-auto mt-3">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Grade</th>
            <th colSpan={2} className='text-center'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filterInp.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center">
                <h2>Student not found</h2>
              </td>
            </tr>
          ) : (
            filterInp.map((item, index) => (
              <tr key={item.id || index}>
                   {/* Unique ID fallback */}
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.class}</td>
                <td>
                  <Link to={`/viewDetails/${item.id}`} className="btn btn-success">
                    View Details
                  </Link>
                </td>
                <td>
                  <button 
                    className='btn btn-link text-danger'
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </>
  );
};

export default StudentSearch;
