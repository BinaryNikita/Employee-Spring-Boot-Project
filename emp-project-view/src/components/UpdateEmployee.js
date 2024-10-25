import React, { useState, useEffect } from 'react';
import { useNavigate, useParams} from 'react-router-dom';
import EmployeeService from '../services/EmployeeService';

const UpdateEmployee = () => {

  const {id} = useParams();
  
  useEffect(() => {
    const fetchData = async () => {

      try {
        const response = await EmployeeService.getEmployeeById(id);
        setEmployee(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);

  const navigate = useNavigate();
  const [employee, setEmployee] = useState({
    id: id,
    name: '',
    phone: '',
    email: '',
  });

  const updateEmployee = (e) => {
    e.preventDefault();
    EmployeeService.updateEmployee(employee, id) 
      .then((response) => {
        console.log("Updated Successfully: " + response);
navigate("/")
      })
      .catch((error) => {
        console.error(error);
        alert("Some error ocurred updating: " + error)
      });
  };
  
  const handleChange = (e) => {
    const value = e.target.value;
    setEmployee({ ...employee, [e.target.name]: value });
  };

  return (
    <div className="bg-cyan-600 bg-opacity-10 rounded-lg shadow-lg p-6 w-full max-w-md text-white mx-52 my-28">
      <h1 className="text-3xl font-bold mb-6">Update Employee</h1>
      <form className="flex flex-col space-y-4">
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={employee.name}
          onChange={(e) => handleChange(e)}
          className="p-2 rounded-md bg-cyan-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />
        <input
          type="text"
          placeholder="Phone"
          name="phone"
          value={employee.phone}
          onChange={(e) => handleChange(e)}
          className="p-2 rounded-md bg-cyan-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          onChange={(e) => handleChange(e)}
          value={employee.email}
          className="p-2 rounded-md bg-cyan-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />
        <div className="flex space-x-4 mt-4">
          <button
            onClick={updateEmployee}
            type="submit"
            className="flex-1 bg-lime-700 hover:bg-lime-400 text-white font-semibold py-2 rounded-md transition"
          >
            Update
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

export default UpdateEmployee;
