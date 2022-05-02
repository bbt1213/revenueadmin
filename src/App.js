import logo from "./logo.svg";
import "./App.css";
import React, { Fragment, Suspense, useState, useEffect } from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import auth from "./service/authService";

import ProtectedRoute from "./components/common/protectedRoute";
import LoadingSpinner from "./components/common/LoadingSpinner";
import NavBar from "./components/NavBar/NavBar";
import NotFound from "./components/common/NotFound";
import Businesses from "./components/Businesses/Businesses";
import Franchises from "./components/Franchises/Franchises";
import LogIn from "./components/Login/login";
import Logout from "./components/Logout";
import Profile from "./components/Profile/Profile";
import BusinessImages from "./components/Businesses/BusinessImages";
import "react-toastify/dist/ReactToastify.css";
import VerifierImages from "./components/VerifierImages/VerifierImages";
import Users from "./components/Utilities/Users/Users";
import UserVerifierImages from "./components/UserVerifierImages/UserVerifierImages";
import VerifierImageForm from "./components/VerifierImages/VerifierImageForm";
import Home from "./components/Home/Home";
import FranchiseImages from "./components/Franchises/FranchiseImages";

function App() {
  const [user, setUser] = useState("");
  const [taxType, setTaxType] = useState("");

  const getUser = () => {
    const user = auth.getCurrentUser();
    setUser(user);
    setTaxType(auth.getCurrentTaxType());
  };
  useEffect(() => {
    getUser();
  }, []);
  return (
    <Fragment>
      <ToastContainer />
      <Suspense
        fallback={
          <div className="centered">
            <LoadingSpinner />
          </div>
        }
      >
        <NavBar user={user} />

        <Switch>
          <Route path="/" exact>
            <Redirect to="/home"></Redirect>
          </Route>
          <Route path="/login">
            <LogIn />
          </Route>
          <ProtectedRoute path="/profile" component={Profile} />
          <ProtectedRoute
            path="/businesses/:userverifierid/images/:bpassessmentdetailswebid"
            component={BusinessImages}
          />
          <ProtectedRoute
            path="/franchises/:userverifierid/images/:ptfranchisedetailwebid"
            component={FranchiseImages}
          />
          <ProtectedRoute path="/Home" component={Home} />
          <ProtectedRoute path="/businesses" component={Businesses} />
          <ProtectedRoute path="/franchises" component={Franchises} />
          <ProtectedRoute path="/images/:id" component={VerifierImageForm} />
          <ProtectedRoute path="/images" component={VerifierImages} />
          <ProtectedRoute path="/users" component={Users} />
          <ProtectedRoute
            path="/userverifierimages"
            component={UserVerifierImages}
          />

          <Route path="/logout">
            <Logout />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Suspense>
    </Fragment>
  );
}

export default App;
