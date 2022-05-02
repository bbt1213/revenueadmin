import React from "react";
import _ from "lodash";
import { render } from "@testing-library/react";

const TableBody = (props) => {
  const renderCell = (item, column) => {
    if (column.content) {
      return column.content(item);
    }

    return _.get(item, column.path);
  };

  const createKey = (item, column) => {
    return item[keyName] + (column.path || column.key);
  };

  const { datas, columns, keyName } = props;

  return (
    // <tbody>
    //   {data.map((item) => (
    //     <tr key={item._id}>
    //       {columns.map((column) => (
    //         <td key={createKey(item, column)}>{renderCell(item, column)}</td>
    //       ))}
    //     </tr>
    //   ))}
    // </tbody>
    <tbody>
      {datas.map((data) => (
        <tr key={data[keyName]}>
          {columns.map((column) => (
            <td key={createKey(data, column)}>{renderCell(data, column)}</td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
