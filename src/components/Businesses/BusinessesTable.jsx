import React from "react";
import { Link } from "react-router-dom";
import authService from "../../service/authService";

import Table from "./../common/Table/table";
import BusinessImages from "./BusinessImages";

const BusinessesTable = (props) => {
  const { businesses, userVerifierId, onSort, sortColumn } = props;
  const columns = [
    {
      path: "businessName",
      label: "Business Name",
      content: (business) => {
        return (
          <Link
            to={{
              pathname: `/businesses/${userVerifierId}/Images/${business.bpAssessmentDetailWebId}`,
            }}
          >
            {business.businessName}
          </Link>
        );
      },
    },

    { path: "dateOfApplication", label: "Date of Application" },
    { path: "imageStatus", label: "Status" },
    // {
    //   key: "like",
    //   content: (movie) => (
    //     <Like liked={movie.liked} onClick={() => this.props.onLike(movie)} />
    //   ),
    // },
    // {
    //   key: "delete",
    //   content: (movie) => (
    //     <button
    //       onClick={() => this.props.onDelete(movie)}
    //       className="btn btn-danger btn-sm"
    //     >
    //       Delete
    //     </button>
    //   ),
    // },
  ];

  return (
    // <Table
    //   columns={columns}
    //   data={movies}
    //   sortColumn={sortColumn}
    //   onSort={onSort}
    // />
    <Table
      datas={businesses}
      columns={columns}
      keyName="bpAssessmentDetailWebId"
    />
  );
};

export default BusinessesTable;
