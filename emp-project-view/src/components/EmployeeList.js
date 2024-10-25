import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EmployeeService from '../services/EmployeeService';

const EmployeeList = () => {
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  const deleteEmployee = (e, id) => {
    e.preventDefault();
    EmployeeService.deleteEmployeeById(id)
      .then((response) => {
        if (employees) {
          setEmployees((prevElement) => {
            return prevElement.filter((employee) => employee.id !== id);
          });
        }
      })
      .catch((error) => {
        console.error(error);
        alert('Some error ocurred while deleting: ' + error);
      });
  };


  const editEmployee = (e, id) => {
    e.preventDefault();
    navigate(`/editEmployee/${id}`)
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const response = await EmployeeService.getEmployees();
        setEmployees(response.data);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    // Missing return added here
    <div className="mx-52 my-20 flex flex-col">
      <div className="mb-4">
        <button
          onClick={() => navigate('/addEmployee')}
          type="submit"
          className="text-white bg-cyan-700 px-6 py-2 font-semibold rounded-md hover:bg-cyan-500 transition"
        >
          Add Employee <span role="img">👩🏼‍💻</span>
        </button>
      </div>

      <div className="overflow-hidden rounded-lg shadow-lg">
        <table className="bg-cyan-600 bg-opacity-10 rounded text-white">
          <thead className="bg-cyan-700">
            <tr className="text-left uppercase text-xs">
              <th className="px-6 py-3">NAME</th>
              <th className="px-6 py-3">PHONE</th>
              <th className="px-6 py-3">EMAIL</th>
              <th className="px-6 py-3">ACTION</th>
            </tr>
          </thead>
          {!loading && (
            <tbody className="text-xs">
              {employees.map((employee) => (
                <tr key={employee.id} className="hover:bg-cyan-500 transition">
                  <td className="px-6 py-4 whitespace-nowrap">
                    {employee.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {employee.phone}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {employee.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <a
                      onClick={(e, id) => editEmployee(e, employee.id)}
                      className="text-white hover:bg-yellow-300 hover:p-2 hover:rounded hover:text-sm"
                    >
                      Edit📝
                    </a>{' '}
                    <a
                      onClick={(e, id) => deleteEmployee(e, employee.id)}
                      href=""
                      className="text-white hover:bg-red-500 hover:rounded hover:p-2"
                    >
                      Delete🗑
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
};

export default EmployeeList;
