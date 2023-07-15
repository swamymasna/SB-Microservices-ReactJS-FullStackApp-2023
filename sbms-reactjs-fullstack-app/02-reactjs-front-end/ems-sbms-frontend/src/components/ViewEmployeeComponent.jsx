import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEmployeeById } from "../services/EmployeeService";

const ViewEmployeeComponent = () => {
  const [employeeName, setEmployeeName] = useState("");
  const [employeeSalary, setEmployeeSalary] = useState("");
  const [employeeAddress, setEmployeeAddress] = useState("");
  const [departmentCode, setDepartmentCode] = useState("");
  const [organizationCode, setOrganizationCode] = useState("");
  const [departments, setDepartments] = useState([]);
  const [organizations, setOrganizations] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    getEmployeeById(id)
      .then((response) => {
        console.log(response.data);
        setEmployeeName(response.data.employeeName);
        setEmployeeSalary(response.data.employeeSalary);
        setEmployeeAddress(response.data.employeeAddress);
        setDepartmentCode(response.data.departmentCode);
        setOrganizationCode(response.data.organizationCode);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  return (
    <div className="container">
      <div className="card col-md-6 offset-md-3 offset-md-3 mt-4 shadow-lg fsize">
        <h2 className="text-center mt-2" style={{ color: "red" }}>
          Department Data
        </h2>
        <div className="card-body dataone">
          <table className="table table-bordered table-hover">
            <thead>
              <tr>
                <th>Employee Id</th>
                <td>{id}</td>
              </tr>

              <tr>
                <th>Employee Name</th>
                <td>{employeeName}</td>
              </tr>

              <tr>
                <th>Employee Salary</th>
                <td>{employeeSalary}</td>
              </tr>

              <tr>
                <th>Employee Address</th>
                <td>{employeeAddress}</td>
              </tr>

              <tr>
                <th>Department Code</th>
                <td>{departmentCode}</td>
              </tr>

              <tr>
                <th>Organization Code</th>
                <td>{organizationCode}</td>
              </tr>
            </thead>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewEmployeeComponent;
