import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDepartmentById } from "../services/DepartmentService";

const ViewDepartmentComponent = () => {
  const [departmentName, setDepartmentName] = useState("");
  const [departmentDescription, setDepartmentDescription] = useState("");
  const [departmentCode, setDepartmentCode] = useState("");

  const { id } = useParams();

  useEffect(() => {
    getDepartmentById(id).then((response) => {
      console.log(response.data);
      setDepartmentName(response.data.departmentName);
      setDepartmentDescription(response.data.departmentDescription);
      setDepartmentCode(response.data.departmentCode);
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
                <th>Department Id</th>
                <td>{id}</td>
              </tr>

              <tr>
                <th>Department Name</th>
                <td>{departmentName}</td>
              </tr>

              <tr>
                <th>Department Description</th>
                <td>{departmentDescription}</td>
              </tr>

              <tr>
                <th>Department Code</th>
                <td>{departmentCode}</td>
              </tr>
            </thead>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewDepartmentComponent;
