import React, { useEffect, useState } from "react";
import { deleteEmployee, getAllEmployees } from "../services/EmployeeService";
import { Link, useNavigate, useParams } from "react-router-dom";

const ListEmployeeComponent = () => {
  const [employees, setEmployees] = useState([]);

  const navigator = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    getEmployeesList();
  }, []);

  function getEmployeesList() {
    getAllEmployees()
      .then((response) => {
        console.log(response.data);
        setEmployees(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function updateEmployee(id) {
    navigator(`/edit-employee/${id}`);
  }

  function removeEmployee(id) {
    deleteEmployee(id)
      .then((response) => {
        console.log(response.data);
        getEmployeesList();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function viewEmployee(id) {
    navigator(`/view-employee/${id}`);
  }

  return (
    <div className="container ">
      <h2 className="empList mt-2">Welcome to Employees Details Page</h2>

      <Link to="/add-employee" className="btn btn-info mb-2">
        Add Employee
      </Link>

      <table className="table table-bordered table-hover dataone">
        <thead>
          <tr>
            <th>EMP-ID</th>
            <th>EMP-NAME</th>
            <th>EMP-SAL</th>
            <th>EMP-ADDR</th>
            <th>DEPT-CODE</th>
            <th>ORG-CODE</th>
            <th colSpan={3} className="text-center">
              ACTIONS
            </th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.employeeId}>
              <td>{employee.employeeId}</td>
              <td>{employee.employeeName}</td>
              <td>{employee.employeeSalary}</td>
              <td>{employee.employeeAddress}</td>
              <td>{employee.departmentCode}</td>
              <td>{employee.organizationCode}</td>
              <td className="text-center">
                <button
                  className="btn btn-dark"
                  onClick={() => updateEmployee(employee.employeeId)}
                >
                  Update
                </button>

                <button
                  className="btn btn-danger"
                  style={{ marginLeft: 15 }}
                  onClick={() => removeEmployee(employee.employeeId)}
                >
                  Delete
                </button>

                <button
                  className="btn btn-warning"
                  style={{ marginLeft: 15 }}
                  onClick={() => viewEmployee(employee.employeeId)}
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListEmployeeComponent;
