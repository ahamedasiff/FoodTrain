import React, { useState } from "react";
import Css from './Reg.module.css'
import { Link } from 'react-router-dom'
import axios from "axios";

function Signup({ Data }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    address: "",
    contactNo: "",
    dateOfBirth: "",
    email: "",
    password: ""
  });

  const [formErrors, setFormErrors] = useState({});


  const handleChange = (event) => {
    const name = event.target.name
    const value = event.target.value
    setFormData({...formData, [name]: value})
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!isFormValid()) {
      return;
    }

    axios.post('http://localhost:8000/api/customers/register', formData)
      .then(response => {
        console.log(response.data);
        console.log(formData);
        alert("User Registered Successfully");
        setFormData({
          firstName: "",
          lastName: "",
          username: "",
          address: "",
          contactNo: "",
          dateOfBirth: "",
          email: "",
          password: ""
        });

      })
      .catch(error => {
        console.log(error);
        alert("Failed to Register Customer");
      });
  };
  //After Changing
  const isFormValid = () => {
    let validationErrors = {};

    if (formData.firstName.trim() === "") {
      validationErrors.firstName = "First Name is required";
    }

    if (formData.lastName.trim() === "") {
      validationErrors.lastName = "Last Name is required";
    }

    if (formData.username.trim() === "") {
      validationErrors.username = "Username is required";
    } else if (!/^[a-z]+$/.test(formData.username.trim())) {
      validationErrors.username = "Enter an Username without Capslock or any Special Character(@,#.&)";
    }

    if (formData.address.trim() === "") {
      validationErrors.address = "Address is required";
    }

    if (formData.contactNo.trim() === "") {
      validationErrors.contactNo = "Contact No is required";
    } else if (!/^\d{9,10}$/.test(formData.contactNo.trim())) {
      validationErrors.contactNo = "Phone number must be valid";
    }

    if (formData.dateOfBirth.trim() === "") {
      validationErrors.dateOfBirth = "Date of Birth is required";
    } else {
      const dob = new Date(formData.dateOfBirth);
      const currentDate = new Date();
      const minDate = new Date();
      minDate.setFullYear(minDate.getFullYear() - 18);
  
      if (dob > minDate) {
        validationErrors.dateOfBirth = "Must be 18 years or older";
      }
    }

    if (formData.email.trim() === "") {
      validationErrors.email = "Email is required";
    } else if (!isValidEmail(formData.email)) {
      validationErrors.email = "Invalid email";
    }

    if (formData.password.trim() === "") {
      validationErrors.password = "Password is required";
    } else if (formData.password.length < 5 || formData.password.length > 15) {
      validationErrors.password = "Password must be between 5 and 15 characters";
    }

    setFormErrors(validationErrors);

    return Object.keys(validationErrors).length === 0;
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
      <div className={Css.row}>
      <div className={Css.col2}>
         <div className={Css.container}>
           <h1>Lets Make Your Order</h1>
           <form className={Css.form} method='post' onSubmit={handleSubmit}>
            <input
              type="text" name="firstName" className={Css.inp} onChange={handleChange} value={formData.firstName}
              placeholder='Enter First Name'
            />
            {formErrors.firstName && <div className={Css.error}>{formErrors.firstName}</div>}
            <br />
            <input
              type="text" name="lastName" className={Css.inp} value={formData.lastName} onChange={handleChange}
              placeholder='Enter Last Name'
            />
            {formErrors.lastName && <div className={Css.error}>{formErrors.lastName}</div>}
            <br />
            <input
              type="text" name="username" className={Css.inp} value={formData.username} onChange={handleChange}
              placeholder='Enter Username'
            />
            {formErrors.username && <div className={Css.error}>{formErrors.username}</div>}
            <br />
            <input
              type="text" name="address" className={Css.inp} value={formData.address} onChange={handleChange}
              placeholder='Enter address'
            />
            {formErrors.address && <div className={Css.error}>{formErrors.address}</div>}
            <br />
            <input
              type="text" name="contactNo" className={Css.inp} value={formData.contactNo} onChange={handleChange}
              placeholder='Enter Contact No'
            />
            {formErrors.contactNo && <div className={Css.error}>{formErrors.contactNo}</div>}
            <br />
            <input
              type="date" name="dateOfBirth" className={Css.inp} value={formData.dateOfBirth} onChange={handleChange}
              placeholder='Enter Date-of-Birth'
            />
            {formErrors.dateOfBirth && <div className={Css.error}>{formErrors.dateOfBirth}</div>}
            <br />
            <input
              type="email" name="email" className={Css.inp} value={formData.email} onChange={handleChange}
              placeholder='Enter Email'
            />
            {formErrors.email && <div className={Css.error}>{formErrors.email}</div>}
            <br />
            <input
              type="password" name="password" className={Css.inp} value={formData.password} onChange={handleChange}
              placeholder='Enter Password'
            />
            {formErrors.password && <div className={Css.error}>{formErrors.password}</div>}
            <br />
            <button type='submit' className={Css.btn}><b>Sign up</b></button>
          </form>
      <p><b>Already Have An Account ?</b> <Link to='/login'>Login</Link></p>
      </div>
    </div>
    <div className={Css.col2}>
        <div className={Css.bgr} style={{ backgroundImage: `url(${Data.img})` }}></div>
      </div>
    </div>
  );
}

export default Signup;

