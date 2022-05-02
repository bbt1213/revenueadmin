import React from "react";
import { Link } from "react-router-dom";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

const Table = ({
  columns,
  sortColumn,
  onSort,
  datas,
  userVerifierId,
  keyName,
}) => {
  return (
    // <table className="table table-striped">
    //   <TableHeader columns={columns} sortColumn={sortColumn} onSort={onSort} />
    //   <TableBody columns={columns} data={data} />
    // </table>
    <table className="table table-striped">
      <TableHeader columns={columns} />

      <TableBody columns={columns} datas={datas} keyName={keyName} />
    </table>
  );
};

export default Table;
