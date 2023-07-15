import axios from "axios";

const EMPLOYEE_API_BASE_URI = "http://localhost:8081/api/employees";

export const getAllEmployees = () => axios.get(EMPLOYEE_API_BASE_URI + "/list");

export const createEmployee = (employee) =>
  axios.post(EMPLOYEE_API_BASE_URI + "/save", employee);

export const getEmployeeById = (employeeId) =>
  axios.get(EMPLOYEE_API_BASE_URI + "/emp/" + employeeId);

export const updateEmployee = (employeeId, employee) =>
  axios.put(EMPLOYEE_API_BASE_URI + "/update/" + employeeId, employee);

export const deleteEmployee = (employeeId) =>
  axios.delete(EMPLOYEE_API_BASE_URI + "/delete/" + employeeId);
