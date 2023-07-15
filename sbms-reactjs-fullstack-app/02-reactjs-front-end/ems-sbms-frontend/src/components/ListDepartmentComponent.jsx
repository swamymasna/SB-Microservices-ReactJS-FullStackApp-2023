import React, { useEffect, useState } from "react";
import {
  getAllDepartments,
  removeDepartment,
} from "../services/DepartmentService";
import { Link, useNavigate } from "react-router-dom";

const ListDepartmentComponent = () => {
  const [departments, setDepartments] = useState([]);

  const navigator = useNavigate();

  useEffect(() => {
    getDepartmentsList();
  }, []);

  function getDepartmentsList() {
    getAllDepartments()
      .then((response) => {
        console.log(response.data);
        setDepartments(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function updateDepartment(id) {
    navigator(`/edit-department/${id}`);
  }

  function deleteDepartment(id) {
    removeDepartment(id)
      .then((response) => {
        console.log(response.data);
        getDepartmentsList();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function viewDepartment(id) {
    navigator(`/view-department/${id}`);
  }

  return (
    <div className="container">
      <h2 className="listDept mt-2">Department Details</h2>

      <Link to="/add-department" className="btn btn-warning mb-2">
        Add Department
      </Link>

      <table className="table table-bordered table-hover dataone">
        <thead>
          <tr>
            <th>Department Id</th>
            <th>Department Name</th>
            <th>Department Description</th>
            <th>Department Code</th>
            <th colSpan={3} className="text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {departments.map((department) => (
            <tr key={department.departmentId}>
              <td>{department.departmentId}</td>
              <td>{department.departmentName}</td>
              <td>{department.departmentDescription}</td>
              <td>{department.departmentCode}</td>
              <td className="text-center">
                <button
                  className="btn btn-primary"
                  onClick={() => updateDepartment(department.departmentId)}
                >
                  Update
                </button>

                <button
                  className="btn btn-danger"
                  style={{ marginLeft: 15 }}
                  onClick={() => deleteDepartment(department.departmentId)}
                >
                  Delete
                </button>

                <button
                  className="btn btn-info"
                  style={{ marginLeft: 15 }}
                  onClick={() => viewDepartment(department.departmentId)}
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

export default ListDepartmentComponent;
