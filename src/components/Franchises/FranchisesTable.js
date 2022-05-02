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
    { path: "imageStatus", label: "Status" },
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
