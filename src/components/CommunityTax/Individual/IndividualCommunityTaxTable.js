import { Link } from "react-router-dom";
import Table from "../../common/Table/table";

const IndividualCommunityTaxTable = (props) => {
  const { communityTaxIndividuals, userVerifierId, onSort, sortColumn } = props;
  const columns = [
    {
      path: "fullName",
      label: "Full Name",
      content: (communityTaxIndividual) => {
        return (
          <Link
            to={{
              pathname: `/communityTaxIndividuals/${userVerifierId}/Images/${communityTaxIndividual.communityTaxIndividualId}`,
            }}
          >
            {communityTaxIndividual.fullName}
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
      datas={communityTaxIndividuals}
      columns={columns}
      keyName="communityTaxIndividualId"
    />
  );
};

export default IndividualCommunityTaxTable;
