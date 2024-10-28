import React from 'react'
import {Link} from 'react-router-dom'
const Navbar = () => {
  return (
    <>
    <nav className="bg-dark">
      <div className="d-flex justify-content-center gap-4 p-3">
        <Link to="/" className='text-decoration-none text-light active'>Search</Link>
        <Link to="/addYourDetails" className='text-decoration-none text-light' >Add Details</Link>
        <Link to="/listOfStudents" className='text-decoration-none text-light'>List of Students</Link>
     </div>  
   </nav>

    </>
  )
}

export default Navbar
