import { createRef, useEffect, useState } from "react";
import {
  getAllOrganizations,
  removeOrganization,
} from "../services/OrganizationService";
import { Link, useNavigate } from "react-router-dom";

const ListOrganizationComponent = () => {
  const [organizations, setOrganizations] = useState([]);
  const navigator = useNavigate();

  useEffect(() => {
    getOrganizationsList();
  }, []);

  const getOrganizationsList = () => {
    getAllOrganizations()
      .then((response) => {
        console.log(response.data);
        setOrganizations(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  function updateOrganization(id) {
    navigator(`/edit-organization/${id}`);
  }

  function deleteOrganization(id) {
    removeOrganization(id)
      .then((response) => {
        console.log(response.data);
        getOrganizationsList();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function viewOrganization(id) {
    navigator(`/view-organization/${id}`);
  }

  return (
    <div className="container ">
      <h2 className="datatwo mt-2">Organization Details</h2>

      <Link to="/add-organization" className="btn btn-primary">
        Add Organization
      </Link>

      <table className="table table-bordered table-hover mt-2 dataone">
        <thead>
          <tr>
            <th>Organization Id</th>
            <th>Organization Name</th>
            <th>Organization Code</th>
            <th>Org-Description</th>
            <th colSpan={3} className="text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {organizations.map((organization) => (
            <tr key={organization.organizationId}>
              <td>{organization.organizationId}</td>
              <td>{organization.organizationName}</td>
              <td>{organization.organizationCode}</td>
              <td>{organization.organizationDescription}</td>
              <td className="text-center">
                <button
                  className="btn btn-info"
                  onClick={() =>
                    updateOrganization(organization.organizationId)
                  }
                >
                  Update
                </button>

                <button
                  className="btn btn-danger"
                  style={{ marginLeft: 15 }}
                  onClick={() =>
                    deleteOrganization(organization.organizationId)
                  }
                >
                  Delete
                </button>

                <button
                  className="btn btn-dark"
                  style={{ marginLeft: 15 }}
                  onClick={() => viewOrganization(organization.organizationId)}
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

export default ListOrganizationComponent;
