import React from "react";
import { Link } from "react-router-dom";
import Table from "../common/Table/table";
import SelectText from "../common/SelectText";

const VerifierImagesTable = (props) => {
  const { images } = props;
  console.log(images);
  const verifierType = [
    { id: "A", Text: "All" },
    { id: "N", Text: "New" },
    { id: "R", Text: "Re New" },
  ];

  const businessRegistrationType = [
    { id: "1", Text: "Sole Proprietorship" },
    { id: "2", Text: "Partnership / Corporation / Cooperative" },
    { id: "3", Text: "All" },
  ];

  const taxTypes = [
    { id: "BT", Text: "Business Tax" },
    { id: "FT", Text: "Franchise Tax" },
    { id: "A", Text: "All" },
  ];

  const columns = [
    {
      path: "imageName",
      label: "Image Name",
      content: (image) => {
        return (
          <Link to={`/images/${image.verifierImageId}`}>{image.imageName}</Link>
        );
      },
    },
    {
      path: "businessRegistrationTypeId",
      label: "Business Type",
      content: (image) => (
        <SelectText
          datas={businessRegistrationType}
          selectedValue={image.businessRegistrationTypeId}
        ></SelectText>
      ),
    },
    {
      path: "verifierType",
      label: "Application Type",
      content: (image) => (
        <SelectText
          datas={verifierType}
          selectedValue={image.verifierType}
        ></SelectText>
      ),
    },
    {
      path: "taxType",
      label: "Tax Type",
      content: (image) => (
        <SelectText datas={taxTypes} selectedValue={image.taxType}></SelectText>
      ),
    },
    {
      path: "edit",

      content: (image) => (
        <Link to={`/images/${image.verifierImageId}`}>Edit</Link>
      ),
    },
  ];
  console.log(images);
  return <Table datas={images} columns={columns} keyName="verifierImageId" />;
};

export default VerifierImagesTable;
