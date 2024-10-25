import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EmployeeService from '../services/EmployeeService';

const AddEmployee = () => {
  const [employee, setEmployee] = useState({
    id: '',
    name: '',
    phone: '',
    email: '',
  });

  const saveEmployee = (e) => {
    e.preventDefault();


    if (!employee.name || !employee.phone || !employee.email) {
      alert('Please fill out all the fields');
      return;
    }

    const namePattern = /^[A-Za-z\s]+$/; 
    if (!namePattern.test(employee.name)) {
      alert('Name must contain only letters');
      return;
    }


    const phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(employee.phone)) {
      alert('Phone number must contain only digits and of 10 digits');
      return;
    }

    EmployeeService.saveEmployee(employee)
      .then((response) => {
        console.log(response);
        alert("Saved Successfully");
      })
      .catch((error) => {
        console.error(error);
        alert("Some error occurred while saving: " + error);
      });
  };

  const reset = (e) => {
    e.preventDefault();
    setEmployee({
      id: '',
      name: '',
      phone: '',
      email: '',
    });
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setEmployee({ ...employee, [e.target.name]: value });
  };

  const navigate = useNavigate();
  return (
    <div className="bg-cyan-600 bg-opacity-10 rounded-lg shadow-lg p-6 w-full max-w-md text-white mx-52 my-28">
      <h1 className="text-3xl font-bold mb-6">Add Employee</h1>
      <form className="flex flex-col space-y-4">
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={employee.name}
          onChange={(e) => handleChange(e)}
          className="p-2 rounded-md bg-cyan-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          required
        />
        <input
          type="text"
          placeholder="Phone"
          name="phone"
          value={employee.phone}
          onChange={(e) => handleChange(e)}
          className="p-2 rounded-md bg-cyan-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          pattern="[0-9]*" // This will restrict input to numbers on some browsers
          required
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          onChange={(e) => handleChange(e)}
          value={employee.email}
          className="p-2 rounded-md bg-cyan-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          required
        />
        <div className="flex space-x-4 mt-4">
          <button
            onClick={saveEmployee}
            type="submit"
            className="flex-1 bg-lime-700 hover:bg-lime-400 text-white font-semibold py-2 rounded-md transition"
          >
            Save
          </button>
          <button
            type="button"
            onClick={reset}
            className="flex-1 bg-gray-500 hover:bg-gray-400 text-white font-semibold py-2 rounded-md transition"
          >
            Clear
          </button>
          <button
            onClick={() => {
              console.log('Navigating to home');
              navigate('/');
            }}
            type="button"
            className="flex-1 bg-red-600 hover:bg-red-500 text-white font-semibold py-2 rounded-md transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEmployee;
