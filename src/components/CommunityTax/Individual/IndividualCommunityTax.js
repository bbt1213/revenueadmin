import React, { useEffect, useState } from "react";

import { paginate } from "./../../utils/paginate";
import _ from "lodash";

import IndividualCommunityTaxTable from "./IndividualCommunityTaxTable";
import Pagination from "../../common/pagination";
import authService from "../../../service/authService";
import individualCommunityTaxService from "../../../service/individualCommunityTaxService";

const IndividualCommunityTax = () => {
  const [loading, setLoading] = useState(false);
  const [communityTaxIndividuals, setCommunityTaxIndividuals] = useState([
    {
        communityTaxIndividualId: "",
        fullName: "",
      dateOfApplication: "",
      status: "",
    },
  ]);

  // const [currentPage, setCurrentPage] = useState(1);
  // const [pageSize, setPageSize] = useState(4);
  // const [searchQuery, setSearchQuery] = useState("");
  // const [sortColumn, setSortColumn] = useState({ path: "title", order: "asc" });

  const userVerifierId = authService.getCurrentUserVerifierId();
  const getAllUserImages = async () => {
    try {
      setLoading(true);

      const data = await individualCommunityTaxService.getAllUnverified(
        userVerifierId
      );

      setCommunityTaxIndividuals(data["data"]);

      setLoading(false);
    } catch (ex) {
      console.log("Error, ", ex.response);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllUserImages();
  }, []);

  // const handlePageChange = (page) => {
  //   setCurrentPage({ currentPage: page });
  // };

  // const handleSort = (sortColumn) => {
  //   setSortColumn({ sortColumn });
  // };

  // const getPagedData = () => {
  // const {
  //   pageSize,
  //   currentPage,
  //   sortColumn,
  //   selectedGenre,
  //   searchQuery,
  //   movies: allMovies,
  // } = this.state;

  //   let filtered = businesses;
  //   if (searchQuery)
  //     filtered = businesses.filter((m) =>
  //       m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
  //     );

  //   const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

  //   const infos = paginate(sorted, currentPage, pageSize);

  //   return { totalCount: filtered.length, data: infos };
  // };

  //   if (count === 0) return <p>There are no movies in the database.</p>;

  // const { totalCount, data } = getPagedData();

  return (
    <div className="row m-3">
      {loading && (
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      {!loading && (
        <div className="col">
          {/* <SearchBox value={searchQuery} onChange={this.handleSearch} /> */}
          {communityTaxIndividuals && (
            <IndividualCommunityTaxTable
            communityTaxIndividuals={communityTaxIndividuals}
              userVerifierId={userVerifierId}
            ></IndividualCommunityTaxTable>
          )}

          {/* <BusinessesTable
          movies={businesses}
          sortColumn={sortColumn}
          onSort={handleSort}
        /> */}
          {/* <Pagination
          itemsCount={totalCount}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        /> */}
        </div>
      )}
    </div>
  );
};

export default IndividualCommunityTax;
