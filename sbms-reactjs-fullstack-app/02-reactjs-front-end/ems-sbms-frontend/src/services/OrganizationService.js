import axios from "axios";

const ORGANIZATION_API_BASE_URI = "http://localhost:8083/api/organizations";

export const getAllOrganizations = () =>
  axios.get(ORGANIZATION_API_BASE_URI + "/list");

export const createOrganization = (organization) =>
  axios.post(ORGANIZATION_API_BASE_URI + "/save", organization);

export const getOrganizationById = (organizationId) =>
  axios.get(ORGANIZATION_API_BASE_URI + "/" + organizationId);

export const updateOrganization = (organizationId, organization) =>
  axios.put(
    ORGANIZATION_API_BASE_URI + "/update/" + organizationId,
    organization
  );

export const removeOrganization = (organizationId) =>
  axios.delete(ORGANIZATION_API_BASE_URI + "/delete/" + organizationId);
