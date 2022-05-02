import http from "./httpService";

import jwtDecode from "jwt-decode";

const apiEndpoint = process.env.REACT_APP_API_URL + "/signin";
const tokenKey = "token";

http.setJwt(getJwt());

export async function login(email, password) {
  const { data: jwt } = await http.post(apiEndpoint, {
    email,
    password,
  });

  localStorage.setItem(tokenKey, jwt);
}

export async function isAdmin() {
  const jwt = localStorage.getItem(tokenKey);
  const data = jwtDecode(jwt);
  return data.roles.some((x) => x === "admin");
}

export function logWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    const data = jwtDecode(jwt);
    return data.email;
  } catch (error) {
    return null;
  }
}

export function getCurrentDepartment() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    const data = jwtDecode(jwt);
    return data.department;
  } catch (error) {
    return null;
  }
}

export function getCurrentUserVerifierId() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    const data = jwtDecode(jwt);
    return data.VerifierUserId;
  } catch (error) {
    return null;
  }
}

export function getCurrentRole() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    const data = jwtDecode(jwt);
    return data.roles;
  } catch (error) {
    return null;
  }
}

const getCurrentTaxType = () => {
  try {
    const jwt = localStorage.getItem(tokenKey);
    const data = jwtDecode(jwt);
    return data.TaxType;
  } catch (error) {
    return null;
  }
};

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export default {
  login,
  logWithJwt,
  logout,
  getCurrentUser,
  getCurrentRole,
  getCurrentUserVerifierId,
  getCurrentDepartment,
  getJwt,
  getCurrentTaxType,
};
