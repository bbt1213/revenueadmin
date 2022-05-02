import React from "react";
import http from "./httpService";

import jwtDecode from "jwt-decode";

const apiEndpoint = process.env.REACT_APP_API_URL + "/businesses";

export async function getAllUnverifiedBusiness(verifierUserId) {
  return await http.get(`${apiEndpoint}/Images/${verifierUserId}`);
}

export async function getAllImagesByAssessmentDetailWebIdAndVerifierId(
  assessmentDetailWebId,
  verifierUserId
) {
  return await http.get(
    `${apiEndpoint}/${verifierUserId}/Images/${assessmentDetailWebId}`
  );
}

export async function getBpAssessmentDetailWebById(bpassessmentdetailswebid) {
  return await http.get(`${apiEndpoint}/${bpassessmentdetailswebid}`);
}

export default {
  getAllUnverifiedBusiness,
  getAllImagesByAssessmentDetailWebIdAndVerifierId,
  getBpAssessmentDetailWebById,
};
