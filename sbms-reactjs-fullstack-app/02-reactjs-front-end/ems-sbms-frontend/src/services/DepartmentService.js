import axios from "axios";

const DEPARTMENT_API_BASE_URI = "http://localhost:8082/api/departments";

export const getAllDepartments = () =>
  axios.get(DEPARTMENT_API_BASE_URI + "/list");

export const createDepartment = (department) =>
  axios.post(DEPARTMENT_API_BASE_URI + "/save", department);

export const getDepartmentById = (departmentId) =>
  axios.get(DEPARTMENT_API_BASE_URI + "/" + departmentId);

export const updateDepartment = (departmentId, department) =>
  axios.put(DEPARTMENT_API_BASE_URI + "/update/" + departmentId, department);

export const removeDepartment = (departmentId) =>
  axios.delete(DEPARTMENT_API_BASE_URI + "/delete/" + departmentId);
