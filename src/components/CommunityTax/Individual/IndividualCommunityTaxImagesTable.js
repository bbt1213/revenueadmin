import React, { Fragment } from "react";

import Table from "../../common/Table/table";

const IndividualCommunityTaxImagesTable = (props) => {
  const { images, onSort, sortColumn, onUpdate, onSelectChange, onChange } =
    props;

  const columns = [
    {
      path: "imageName",
      label: "Image Name",
      content: (image) => {
        return (
          <a href={image.path} target="_blank">
            {image.imageName}
          </a>
        );
      },
    },

    {
      path: "imageStatusDescription",
      label: "Status",
    },
    {
      label: "Remarks",
      key: "remarks",
      content: (image) => (
        <textarea
          type="text"
          className="form-control"
          id={`remarks-${image.communityTaxIndividualDocumentVerificationId}`}
          value={image.imageRemarks}
          onChange={(e) => onChange(image, e)}
        />
      ),
    },
    {
      key: "statusOptions",
      content: (image) => (
        <select
          defaultValue={image.imageStatus}
          className="form-select"
          onChange={(e) => onSelectChange(image, e)}
          id={image.communityTaxIndividualDocumentVerificationId}
        >
          <option key="1" value="1">
            Unverified
          </option>
          <option key="2" value="2">
            Approved
          </option>
          <option key="3" value="3">
            DisApproved
          </option>
        </select>
      ),
    },
    {
      key: "update",
      path: "update",
      content: (image) => (
        <button
          onClick={(e) => onUpdate(image, e)}
          className="btn btn-primary btn-sm"
        >
          Update
        </button>
      ),
    },
  ];

  return (
    // <Table
    //   columns={columns}
    //   data={movies}
    //   sortColumn={sortColumn}
    //   onSort={onSort}
    // />

    <Table
      datas={images}
      columns={columns}
      keyName="communityTaxIndividualDocumentVerificationId"
    />
  );
};

export default IndividualCommunityTaxImagesTable;
