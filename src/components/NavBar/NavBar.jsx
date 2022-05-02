import React, { Fragment, useState } from "react";

import { Link, NavLink } from "react-router-dom";
import authService from "../../service/authService";

const NavBar = ({ user }) => {
  return (
    <Fragment>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link className="navbar-brand" to="/">
          Revenue Online (Admin)
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          {authService.getCurrentUserVerifierId() && (
            <div className="navbar-nav">
              <NavLink to="/businesses" className="nav-item nav-link">
                Business
              </NavLink>
            </div>
          )}

          {!authService.getCurrentUserVerifierId() && user && (
            <div className="navbar-nav">
              <NavLink to="/images" className="nav-item nav-link">
                Images
              </NavLink>
              <NavLink to="/users" className="nav-item nav-link">
                Users
              </NavLink>
              <NavLink to="/userverifierimages" className="nav-item nav-link">
                User Verifier Images
              </NavLink>
            </div>
          )}

          {!user && (
            <NavLink to="/login" className="nav-item nav-link">
              Login
            </NavLink>
          )}
          {user && (
            <Fragment>
              <NavLink className="nav-item nav-link" to="/profile">
                {user.name}
              </NavLink>
              <NavLink className="nav-item nav-link" to="/logout">
                Logout
              </NavLink>
            </Fragment>
          )}
          {/* <form className="d-flex"></form> */}
        </div>
      </nav>
    </Fragment>
  );
};

export default NavBar;
