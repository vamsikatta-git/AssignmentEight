import React, { createContext, useEffect, useState, useContext } from 'react';
import apiData from '../../data.json';
import { ToastContainer, toast } from 'react-toastify';

const SendDetails = createContext();

const AddDetails = ({ children }) => {
  // Initialize data from local storage or default API data
  const initialData = Array.isArray(JSON.parse(localStorage.getItem('addItems')))
    ? JSON.parse(localStorage.getItem('addItems'))
    : apiData;

  // State for storing details
  const [addDetails, setAddDetails] = useState(initialData);
  
  // State for form input values
  const [inputValues, setInputValues] = useState({
    name: '', age: '', email: '', phone: '', address: '', class: ''
  });

  // Update localStorage whenever addDetails changes
  useEffect(() => {
    localStorage.setItem('addItems', JSON.stringify(addDetails));
  }, [addDetails]);

  // Function to handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.values(inputValues).every((field) => field !== '')) {
      setAddDetails([...addDetails, inputValues]);
      setInputValues({ name: '', age: '', email: '', phone: '', address: '', class: '' });
      toast.success("Student details added!");
    } else {
      toast.error("Fill all the fields");
    }
  };

  return (
    <SendDetails.Provider value={{ addDetails, setAddDetails, inputValues, handleInputChange, handleSubmit }}>
      {children}
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
    </SendDetails.Provider>
  );
};

// Custom hook to use the context directly
const UseDetails = () => useContext(SendDetails);

export { AddDetails, UseDetails };
