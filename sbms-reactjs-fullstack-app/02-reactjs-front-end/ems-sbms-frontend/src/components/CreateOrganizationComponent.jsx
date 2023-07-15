import React, { useEffect, useState } from "react";
import {
  createOrganization,
  getOrganizationById,
  updateOrganization,
} from "../services/OrganizationService";
import { useNavigate, useParams } from "react-router-dom";

const CreateOrganizationComponent = () => {
  const [organizationName, setOrganizationName] = useState("");
  const [organizationDescription, setOrganizationDescription] = useState("");
  const [organizationCode, setOrganizationCode] = useState("");
  const { id } = useParams();

  const [errors, setErrors] = useState({
    organizationName: "",
    organizationDescription: "",
    organizationCode: "",
  });

  const navigator = useNavigate();

  useEffect(() => {
    getOrganizationById(id).then((response) => {
      console.log(response.data);
      setOrganizationName(response.data.organizationName);
      setOrganizationDescription(response.data.organizationDescription);
      setOrganizationCode(response.data.organizationCode);
    });
  }, [id]);

  const addOrganization = (e) => {
    e.preventDefault();

    const organization = {
      organizationName,
      organizationDescription,
      organizationCode,
    };

    console.log(organization);

    if (validateForm()) {
      if (id) {
        updateOrganization(id, organization)
          .then((response) => {
            console.log(response.data);
            navigator("/organizations");
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        createOrganization(organization)
          .then((response) => {
            console.log(response.data);
            navigator("/organizations");
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }
  };

  function validateForm() {
    const errorsCopy = { ...errors };
    let valid = true;

    if (organizationName.trim()) {
      errorsCopy.organizationName = "";
    } else {
      errorsCopy.organizationName = "Required Organization Name";
      valid = false;
    }

    if (organizationDescription.trim()) {
      errorsCopy.organizationDescription = "";
    } else {
      errorsCopy.organizationDescription = "Required Organization Description";
      valid = false;
    }

    if (organizationCode.trim()) {
      errorsCopy.organizationCode = "";
    } else {
      errorsCopy.organizationCode = "Required Organization Code";
      valid = false;
    }

    setErrors(errorsCopy);
    return valid;
  }

  const pageTitle = () => {
    if (id) {
      return <h2 className="headingtwo mt-2">Update Organization</h2>;
    } else {
      return <h2 className="headingone mt-2">Register Organization</h2>;
    }
  };

  return (
    <div className="container mt-3">
      <div className="card col-md-6 offset-md-3 offset-md-3 shadow-lg">
        {pageTitle()}
        <div className="card-body dataone">
          <form>
            <div className="form-group mb-3">
              <label className="label">Enter Organization Name : </label>
              <input
                type="text"
                name="organizationName"
                value={organizationName}
                placeholder="Enter Organization Name"
                className={`form-control ${
                  errors.organizationName ? "is-invalid" : ""
                }`}
                onChange={(e) => setOrganizationName(e.target.value)}
              />
              {errors.organizationName && (
                <div className="invalid-feedback">
                  {errors.organizationName}
                </div>
              )}
            </div>

            <div className="form-group mb-3">
              <label className="label">Enter Organization Description : </label>
              <input
                type="text"
                name="organizationDescription"
                value={organizationDescription}
                placeholder="Enter Organization Description"
                className={`form-control ${
                  errors.organizationDescription ? "is-invalid" : ""
                }`}
                onChange={(e) => setOrganizationDescription(e.target.value)}
              />
              {errors.organizationDescription && (
                <div className="invalid-feedback">
                  {errors.organizationDescription}
                </div>
              )}
            </div>

            <div className="form-group mb-3">
              <label className="label">Enter Organization Code : </label>
              <input
                type="text"
                name="organizationCode"
                value={organizationCode}
                placeholder="Enter Organization Code"
                className={`form-control ${
                  errors.organizationCode ? "is-invalid" : ""
                }`}
                onChange={(e) => setOrganizationCode(e.target.value)}
              />
              {errors.organizationCode && (
                <div className="invalid-feedback">
                  {errors.organizationCode}
                </div>
              )}
            </div>

            <div>
              <button
                className="form-control btn btn-success mb-2"
                onClick={(e) => addOrganization(e)}
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

export default CreateOrganizationComponent;
