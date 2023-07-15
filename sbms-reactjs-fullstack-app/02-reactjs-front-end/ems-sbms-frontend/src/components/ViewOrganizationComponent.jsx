import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOrganizationById } from "../services/OrganizationService";

const ViewOrganizationComponent = () => {
  const [organizationName, setOrganizationName] = useState("");
  const [organizationDescription, setOrganizationDescription] = useState("");
  const [organizationCode, setOrganizationCode] = useState("");
  const { id } = useParams();

  useEffect(() => {
    getOrganizationById(id).then((response) => {
      console.log(response.data);
      setOrganizationName(response.data.organizationName);
      setOrganizationDescription(response.data.organizationDescription);
      setOrganizationCode(response.data.organizationCode);
    });
  }, [id]);

  return (
    <div className="container">
      <div className="card col-md-6 offset-md-3 offset-md-3 mt-4 shadow-lg fsize">
        <h2 className="text-center mt-2" style={{ color: "darkgreen" }}>
          Organization Data
        </h2>
        <div className="card-body dataone">
          <table className="table table-bordered table-hover">
            <thead>
              <tr>
                <th>Organization Id</th>
                <td>{id}</td>
              </tr>

              <tr>
                <th>Organization Name</th>
                <td>{organizationName}</td>
              </tr>

              <tr>
                <th>Organization Description</th>
                <td>{organizationDescription}</td>
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

export default ViewOrganizationComponent;
