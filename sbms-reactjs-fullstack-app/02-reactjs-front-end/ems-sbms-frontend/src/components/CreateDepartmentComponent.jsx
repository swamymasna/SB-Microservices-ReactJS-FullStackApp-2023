import React, { useEffect, useState } from "react";
import {
  createDepartment,
  getDepartmentById,
  updateDepartment,
} from "../services/DepartmentService";
import { useNavigate, useParams } from "react-router-dom";

const CreateDepartmentComponent = () => {
  const [departmentName, setDepartmentName] = useState("");
  const [departmentDescription, setDepartmentDescription] = useState("");
  const [departmentCode, setDepartmentCode] = useState("");

  const [errors, setErrors] = useState({
    departmentName: "",
    departmentDescription: "",
    departmentCode: "",
  });

  const { id } = useParams();

  const navigator = useNavigate();

  useEffect(() => {
    getDepartmentById(id).then((response) => {
      console.log(response.data);
      setDepartmentName(response.data.departmentName);
      setDepartmentDescription(response.data.departmentDescription);
      setDepartmentCode(response.data.departmentCode);
    });
  }, [id]);

  function addDepartment(e) {
    e.preventDefault();
    const department = {
      departmentName,
      departmentDescription,
      departmentCode,
    };
    console.log(department);

    if (validateForm()) {
      if (id) {
        updateDepartment(id, department)
          .then((response) => {
            console.log(response.data);
            navigator("/departments");
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        createDepartment(department)
          .then((response) => {
            console.log(response.data);
            navigator("/departments");
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

    if (departmentName.trim()) {
      errorsCopy.departmentName = "";
    } else {
      errorsCopy.departmentName = "Required Department Name";
      valid = false;
    }

    if (departmentDescription.trim()) {
      errorsCopy.departmentDescription = "";
    } else {
      errorsCopy.departmentDescription = "Required Department Description";
      valid = false;
    }

    if (departmentCode.trim()) {
      errorsCopy.departmentCode = "";
    } else {
      errorsCopy.departmentCode = "Required Department Code";
      valid = false;
    }

    setErrors(errorsCopy);
    return valid;
  }

  function pageTitle() {
    if (id) {
      return <h2 className="updateDept mt-2">Update Department</h2>;
    } else {
      return <h2 className="regDept mt-2">Register Department</h2>;
    }
  }

  return (
    <div className="container">
      <div className="card col-md-6 offset-md-3 offset-md-3 mt-3 shadow-lg">
        {pageTitle()}
        <div className="card-body dataone">
          <form>
            <div className="form-group mb-3">
              <label className="label">Department Name</label>
              <input
                type="text"
                name="departmentName"
                value={departmentName}
                placeholder="Enter Department Name"
                className={`form-control ${
                  errors.departmentName ? "is-invalid" : ""
                }`}
                onChange={(e) => setDepartmentName(e.target.value)}
              />
              {errors.departmentName && (
                <div className="invalid-feedback">{errors.departmentName}</div>
              )}
            </div>

            <div className="form-group mb-3">
              <label className="label">Department Description</label>
              <input
                type="text"
                name="departmentDescription"
                value={departmentDescription}
                placeholder="Enter Department Description"
                className={`form-control ${
                  errors.departmentDescription ? "is-invalid" : ""
                }`}
                onChange={(e) => setDepartmentDescription(e.target.value)}
              />
              {errors.departmentDescription && (
                <div className="invalid-feedback">
                  {errors.departmentDescription}
                </div>
              )}
            </div>

            <div className="form-group mb-3">
              <label className="label">Department Code</label>
              <input
                type="text"
                name="departmentCode"
                value={departmentCode}
                placeholder="Enter Department Code"
                className={`form-control ${
                  errors.departmentCode ? "is-invalid" : ""
                }`}
                onChange={(e) => setDepartmentCode(e.target.value)}
              />
              {errors.departmentCode && (
                <div className="invalid-feedback">{errors.departmentCode}</div>
              )}
            </div>

            <div>
              <button
                className="form-control btn btn-success"
                onClick={addDepartment}
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

export default CreateDepartmentComponent;
