import React from "react";
import http from "./httpService";

import jwtDecode from "jwt-decode";

const apiEndpoint = process.env.REACT_APP_API_URL + "/api/ptfranchises";

export async function getAllUnverifiedFranchise(verifierUserId) {
  return await http.get(`${apiEndpoint}/verifierfranchises/${verifierUserId}`);
}

export async function getAllImagesByPtFranchiseDetailWebIdAndVerifierId(
  ptFranchiseDetailWebId,
  verifierUserId
) {
  return await http.get(
    `${apiEndpoint}/${verifierUserId}/Images/${ptFranchiseDetailWebId}`
  );
}

export async function getPtFranchiseDetailWebById(ptfranchisedetailwebid) {
  return await http.get(`${apiEndpoint}/franchise/${ptfranchisedetailwebid}`);
}

export default {
  getAllUnverifiedFranchise,
  getAllImagesByPtFranchiseDetailWebIdAndVerifierId,
  getPtFranchiseDetailWebById,
};
