import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { UseDetails } from './AddDetails'; // Ensure you're importing your context correctly

const ViewDetails = () => {
  const { id } = useParams();
  const { addDetails } = UseDetails(); // Call useContext first
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Find the student details based on the ID
    const filteredData = addDetails.filter((item) => item.id === Number(id));
    setDetails(filteredData.length > 0 ? filteredData[0] : null);
    setLoading(false);
  }, [id, addDetails]); // Dependency on addDetails to rerun when it changes

  if (loading) return <p>Loading...</p>;

  return (
    <>
      {details ? (
        <table className='table table-dark mt-4 w-75 m-auto text-center table-striped border'>
          <thead>
            <tr>
              <th colSpan='2' className='fs-1 text-center'>Student Details</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope='row' className='border border-light'>ID</th>
              <td>{details.id}</td>
            </tr>
            <tr>
              <th scope='row'>Name</th>
              <td>{details.name}</td>
            </tr>
            <tr>
              <th scope='row'>Email</th>
              <td>{details.email}</td>
            </tr>
            <tr>
              <th scope='row'>Age</th>
              <td>{details.age}</td>
            </tr>
            <tr>
              <th scope='row'>Class</th>
              <td>{details.class}</td>
            </tr>
            <tr>
              <th scope='row'>Contact Number</th>
              <td>{details.phone}</td>
            </tr>
            <tr>
              <th scope='row'>Address</th>
              <td>{details.address}</td>
            </tr>
          </tbody>
        </table>
      ) : (
        <p>Details not found</p>
      )}
    </>
  );
};

export default ViewDetails;
