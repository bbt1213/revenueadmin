import React, { useEffect, useState } from "react";

import SummaryTable from "./SummaryTable";
import Label from "../common/Label";

import businessService from "../../service/businessService";
import PageTitle from "./../common/PageTitle";

const Summary = (props) => {
  const { bpassessmentdetailswebid } = props;
  const [summary, setSummary] = useState({});

  const modeOfPayments = [
    { value: "", text: "Application Type" },
    { value: "1", text: "Annually" },
    { value: "0", text: "Quarterly" },
  ];

  const appType = [
    { value: "", text: "Mode of Payment" },
    { value: "1", text: "New" },
    { value: "2", text: "Renewal" },
  ];

  const typeOfBusinesses = [
    { value: "", text: "Type of Business" },
    { value: "0", text: "Single" },
    { value: "2", text: "Partnership" },
    { value: "1", text: "Corporation" },
    { value: "5", text: "Cooperative" },
    { value: "3", text: "Branch" },
    { value: "4", text: "Head" },
  ];

  const getData = (arr, value) => {
    if (!value || value == "") return "N/A";
    var found = arr.find((a) => a.value === value);

    if (found) return found.text;
    return "N/A";
  };

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const data = await businessService.getBpAssessmentDetailWebById(
          bpassessmentdetailswebid
        );
        console.log(data);
        setSummary((prevState) => {
          return { ...data.data };
        });
      } catch (ex) {
        setSummary((prevState) => {
          return {};
        });
        // setDatas((prevState) => {
        //   return [...datas];
        // });
      }
    }, 1000);

    return () => clearInterval(interval);
  });

  return (
    <div
      style={{
        height: "100%",
        minHeight: "10px",
        maxHeight: "440px",
        overflowY: "auto",
        overflowX: "hidden",
      }}
    >
      <PageTitle label="Basic Information" />
      <hr />
      <Label
        label="Mode of Payment:"
        value={getData(modeOfPayments, summary.modeOfPayment)}
      />
      <Label
        label="Application Type:"
        value={getData(appType, summary.applicationType)}
      />
      <Label
        label="Type Of Business:"
        value={getData(typeOfBusinesses, summary.typeOfBusiness)}
      />
      <Label label="Last Name:" value={summary.lastName} />
      <Label label="First Name:" value={summary.firstName} />
      <Label label="Midde Name:" value={summary.middleName} />
      <PageTitle label="Business" />
      <hr />
      <Label label="Gross Income:" value={summary.grossIncome} />
      <Label label="Address:" value={summary.businessAddress} />
      <Label label="Postal Code:" value={summary.businessPostalCode} />
      <Label label="Telephone No:" value={summary.businessPhoneNo} />
      <Label label="Mobile No:" value={summary.businessMobileNo} />
      <PageTitle label="Total No of Employee" />
      <hr />
      <Label label="Male:" value={summary.totalNoOfMale} />
      <Label label="Female:" value={summary.totalNoOfFemale} />
      <Label label="Residing within LGU:" value={summary.totalNoOfLgu} />
      <PageTitle label="Lessors" />
      <hr />
      <Label label="Full Name:" value={summary.totalNoOfMale} />
      <Label label="Full Address:" value={summary.totalNoOfFemale} />
      <Label label="Full Telephone / Mobile No:" value={summary.totalNoOfLgu} />
      <Label label="Email Address:" value={summary.TotalNoOfLgu} />
      <Label label="Monthly Rate:" value={summary.TotalNoOfLgu} />
    </div>
  );
};

export default Summary;
