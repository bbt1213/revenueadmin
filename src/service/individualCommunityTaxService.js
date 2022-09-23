import React from "react";
import http from "./httpService";

import jwtDecode from "jwt-decode";

const apiEndpoint = process.env.REACT_APP_API_URL + "/api/communitytaxindividual";

export async function getAllUnverified(verifierUserId) {
  return await http.get(`${apiEndpoint}/verifiercommunitytaxindividual/${verifierUserId}`);
}

export async function getAllImagesByCommunityTaxIndividualIdAndVerifierId(
    communityTaxIndividualOnlineId,
  verifierUserId
) {
  return await http.get(
    `${apiEndpoint}/${verifierUserId}/Images/${communityTaxIndividualOnlineId}`
  );
}

export async function getCommunityTaxIndividualById(communityTaxIndividualId) {
  return await http.get(`${apiEndpoint}/${communityTaxIndividualId}`);
}

export default {
  getAllUnverified,
  getAllImagesByCommunityTaxIndividualIdAndVerifierId,
  getCommunityTaxIndividualById,
};
