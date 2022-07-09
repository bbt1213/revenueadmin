import React from "react";
import http from "./httpService";

import jwtDecode from "jwt-decode";

const apiEndpoint = process.env.REACT_APP_API_URL + "/api/mpdc";

export async function getTaxPayers() {
  return await http.get(`${apiEndpoint}/taxpayers`);
}

const submitApplication = async (
  data,
  dateOfApplication,
  items,
  locationalClearanceFee
) => {
  const mpdcApplicationData = {
    tpiNo: data.tpiNo,
    name: data.name,
    dateOfApplication: dateOfApplication,
    items: items.map((a) => {
      return { ...a, total: a.total ? a.total : 0 };
    }),
    locationalClearanceFee: locationalClearanceFee,
    total: items
      .map((item) => (item.ifCheck === true ? item.total : 0))
      .reduce((prev, next) => prev + Number(next), 0),
  };
  console.log(mpdcApplicationData);
  return await http.post(`${apiEndpoint}/add`, mpdcApplicationData);
};

const mpdcService = {
  getTaxPayers,
  submitApplication,
};

export default mpdcService;
