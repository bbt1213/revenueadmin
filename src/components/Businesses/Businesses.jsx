import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";

// import { getMovies, deleteMovie } from "../services/fakeMovieService";
// import { getGenres } from "../services/fakeGenreService";
import { paginate } from "../utils/paginate";
import _ from "lodash";

import BusinessesTable from "./BusinessesTable";
import Pagination from "./../common/pagination";
import authService from "../../service/authService";
import businessService from "../../service/businessService";
import BusinessImages from "./BusinessImages";
const Businesses = () => {
  const [loading, setLoading] = useState(false);
  const [businesses, setBusinesses] = useState([
    {
      bpAssessmentDetailWebId: "",
      businessName: "",
      dateOfApplication: "",
      status: "",
    },
  ]);

  const userVerifierId = authService.getCurrentUserVerifierId();
  // const [currentPage, setCurrentPage] = useState(1);
  // const [pageSize, setPageSize] = useState(4);
  // const [searchQuery, setSearchQuery] = useState("");
  // const [sortColumn, setSortColumn] = useState({ path: "title", order: "asc" });

  const getAllUserImages = async () => {
    try {
      setLoading(true);

      const data = await businessService.getAllUnverifiedBusiness(
        userVerifierId
      );

      setBusinesses(data["data"]);

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
          {businesses && (
            <BusinessesTable
              businesses={businesses}
              userVerifierId={userVerifierId}
            ></BusinessesTable>
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

export default Businesses;
