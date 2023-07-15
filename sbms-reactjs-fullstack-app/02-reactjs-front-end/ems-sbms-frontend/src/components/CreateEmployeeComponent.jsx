import React, { useEffect, useState } from "react";
import { getAllDepartments } from "../services/DepartmentService";
import { getAllOrganizations } from "../services/OrganizationService";
import {
  createEmployee,
  getEmployeeById,
  updateEmployee,
} from "../services/EmployeeService";
import { useNavigate, useParams } from "react-router-dom";

const CreateEmployeeComponent = () => {
  const [employeeName, setEmployeeName] = useState("");
  const [employeeSalary, setEmployeeSalary] = useState("");
  const [employeeAddress, setEmployeeAddress] = useState("");
  const [departmentCode, setDepartmentCode] = useState("");
  const [organizationCode, setOrganizationCode] = useState("");
  const [departments, setDepartments] = useState([]);
  const [organizations, setOrganizations] = useState([]);
  const { id } = useParams();

  const [errors, setErrors] = useState({
    employeeName: "",
    employeeSalary: "",
    employeeAddress: "",
    departmentCode: "",
    organizationCode: "",
  });

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

  const navigator = useNavigate();

  useEffect(() => {
    getDepartmentsList();
    getOrganizationsList();
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

  function getOrganizationsList() {
    getAllOrganizations()
      .then((response) => {
        console.log(response.data);
        setOrganizations(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function addOrUpdateEmployee(e) {
    e.preventDefault();
    const employee = {
      employeeName,
      employeeSalary,
      employeeAddress,
      departmentCode,
      organizationCode,
    };
    console.log(employee);

    if (validateForm()) {
      if (id) {
        updateEmployee(id, employee)
          .then((response) => {
            console.log(response.data);
            navigator("/employees");
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        createEmployee(employee)
          .then((response) => {
            console.log(response.data);
            navigator("/employees");
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }
  }

  function validateForm() {
    const errorsCopy = { ...errors };
    let valid = true;

    if (employeeName.trim()) {
      errorsCopy.employeeName = "";
    } else {
      errorsCopy.employeeName = "Employee name is required";
      valid = false;
    }

    if (employeeSalary) {
      errorsCopy.employeeSalary = "";
    } else {
      errorsCopy.employeeSalary = "Employee salary is required";
      valid = false;
    }

    if (employeeAddress.trim()) {
      errorsCopy.employeeAddress = "";
    } else {
      errorsCopy.employeeAddress = "Employee address is required";
      valid = false;
    }

    if (departmentCode.trim()) {
      errorsCopy.departmentCode = "";
    } else {
      errorsCopy.departmentCode = "Department code is required";
      valid = false;
    }

    if (organizationCode.trim()) {
      errorsCopy.organizationCode = "";
    } else {
      errorsCopy.organizationCode = "Organization code is required";
      valid = false;
    }
    setErrors(errorsCopy);
    return valid;
  }

  function pageTitle() {
    if (id) {
      return <h2 className="mt-2 empUpdate">Update Employee</h2>;
    } else {
      return <h2 className="mt-2 empReg">Register Employee</h2>;
    }
  }

  return (
    <div className="container">
      <div className="card col-md-6 offset-md-3 offset-md-3 mt-3">
        {pageTitle()}
        <div className="card-body dataone">
          <form>
            <div className="form-group mb-2">
              <label className="label">Employee Name</label>
              <input
                type="text"
                name="employeeName"
                value={employeeName}
                placeholder="Enter Employee Name"
                className={`form-control ${
                  errors.employeeName ? "is-invalid" : ""
                }`}
                onChange={(e) => setEmployeeName(e.target.value)}
              />
              {errors.employeeName && (
                <div className="invalid-feedback">{errors.employeeName}</div>
              )}
            </div>

            <div className="form-group mb-2">
              <label className="label">Employee Salary</label>
              <input
                type="text"
                name="employeeSalary"
                value={employeeSalary}
                placeholder="Enter Employee Salary"
                className={`form-control ${
                  errors.employeeSalary ? "is-invalid" : ""
                }`}
                onChange={(e) => setEmployeeSalary(e.target.value)}
              />
              {errors.employeeSalary && (
                <div className="invalid-feedback">{errors.employeeSalary}</div>
              )}
            </div>

            <div className="form-group mb-2">
              <label className="label">Employee Address</label>
              <input
                type="text"
                name="employeeAddress"
                value={employeeAddress}
                placeholder="Enter Employee Address"
                className={`form-control ${
                  errors.employeeAddress ? "is-invalid" : ""
                }`}
                onChange={(e) => setEmployeeAddress(e.target.value)}
              />
              {errors.employeeAddress && (
                <div className="invalid-feedback">{errors.employeeAddress}</div>
              )}
            </div>

            <div className="form-group mb-2">
              <label className="label">Department Code</label>
              <select
                className={`form-control ${
                  errors.departmentCode ? "is-invalid" : ""
                }`}
                value={departmentCode}
                onChange={(e) => setDepartmentCode(e.target.value)}
              >
                <option value="Select Department">Select Department</option>
                {departments.map((department) => (
                  <option
                    key={department.departmentId}
                    value={department.departmentCode}
                  >
                    {department.departmentCode}
                  </option>
                ))}
              </select>
              {errors.departmentCode && (
                <div className="invalid-feedback">{errors.departmentCode}</div>
              )}
            </div>

            <div className="form-group mb-2">
              <label className="label">Department Code</label>
              <select
                className={`form-control ${
                  errors.departmentCode ? "is-invalid" : ""
                }`}
                value={organizationCode}
                onChange={(e) => setOrganizationCode(e.target.value)}
              >
                <option value="Select Organization">Select Organization</option>
                {organizations.map((organization) => (
                  <option
                    key={organization.organizationId}
                    value={organization.organizationCode}
                  >
                    {organization.organizationCode}
                  </option>
                ))}
              </select>
              {errors.organizationCode && (
                <div className="invalid-feedback">
                  {errors.organizationCode}
                </div>
              )}
            </div>

            <div className="mt-2 ">
              <button
                className="form-control btn btn-success"
                onClick={addOrUpdateEmployee}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateEmployeeComponent;
