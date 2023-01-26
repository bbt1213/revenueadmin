import { Link } from "react-router-dom";
import Table from "./../common/Table/table";

const FranchisesTable = (props) => {
  const { franchises, userVerifierId, onSort, sortColumn } = props;

  const columns = [
    {
      path: "controlNo",
      label: "Control Number",
      content: (franchise) => {
        return (
          <Link
            to={{
              pathname: `/franchises/${userVerifierId}/Images/${franchise.ptFranchiseDetailWebId}`,
            }}
          >
            {franchise.controlNo}
          </Link>
        );
      },
    },

    { path: "dateOfApplication", label: "Date of Application" },
    { path: "userVerified", label: "User Verified" },
    {
      path: "unverified",
      label: "Unverified",
      content: (franchise) => {
        return (
          <div
            data-toggle="tooltip"
            title={franchise.departmentUnverified}
            data-placement="bottom"
          >
            {franchise.unverified}
          </div>
        );
      },
    },
    {
      path: "approved",
      label: "Approved",
      content: (franchise) => {
        return (
          <div
            data-toggle="tooltip"
            title={franchise.departmentApproved}
            data-placement="bottom"
          >
            {franchise.approved}
          </div>
        );
      },
    },
    {
      path: "disApproved",
      label: "Disapproved",
      content: (franchise) => {
        return (
          <div
            data-toggle="tooltip"
            title={franchise.departmentDisapproved}
            data-placement="bottom"
          >
            {franchise.disApproved}
          </div>
        );
      },
    },
    { path: "totalDocuments", label: "Total Documents" },
  ];

  return (
    // <Table
    //   columns={columns}
    //   data={movies}
    //   sortColumn={sortColumn}
    //   onSort={onSort}
    // />
    <Table
      datas={franchises}
      columns={columns}
      keyName="ptFranchiseDetailWebId"
    />
  );
};

export default FranchisesTable;
