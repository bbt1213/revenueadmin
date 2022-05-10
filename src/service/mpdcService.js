import React from "react";
import http from "./httpService";

import jwtDecode from "jwt-decode";

const apiEndpoint = process.env.REACT_APP_API_URL + "/api/mpdc";

 

 
export async function getTaxPayers() {
  return await http.get(`${apiEndpoint}/taxpayers`);
}

const submitApplication = async (data) => {

};
 
const mpdcService = {
  getTaxPayers
}

export default  mpdcService;
