import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import Input from "../common/Input";

import auth from "../../service/authService";
import reactRouterDom from "react-router-dom";

function LogIn(props) {
  const [data, setData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ test: "" });
  const [invalid, setInvalid] = useState();

  if (auth.getCurrentUser()) return <Redirect to="/" />;

  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      await auth.login(data.email, data.password);
      window.location = "/";
    } catch (ex) {
      console.log("error handling", ex);
      if (ex.response && ex.response.status === 400) {
        console.log("400: ", errors);
        const error = { ...errors };
        console.log("getErrors: ", ex.response.data.errors);
        error["invalidLogin1"] = ex.response.data.errors;
        console.log("after: ", error);
        setErrors(error);
        setErrors((prevState) => {
          return { ...prevState, error };
        });
        console.log(errors);
      } else if (ex.response && ex.response.status === 401) {
        setInvalid(ex.response.data);
      } else {
        setInvalid("Network error. Please contact your Administrator.");
        console.log(ex);
        return ex.response;
      }
    }
  };

  const emailChangeHandler = (e) => {
    setData((prevState) => {
      return { ...prevState, email: e.target.value };
    });
  };
  const passwordChangeHandler = (e) => {
    setData((prevState) => {
      return { ...prevState, password: e.target.value };
    });
  };

  return (
    <div
      className="bg-size"
      style={{
        height: "100vh",
        padding: 0,
        backgroundColor: "whitesmoke",
      }}
    >
      <main className=" d-flex justify-content-center">
        <form
          className="m-2 rounded border shadow-lg"
          onSubmit={submitHandler}
          style={{ maxWidth: "500px" }}
        >
          <div className="m-4">
            <h2 className="d-flex justify-content-center">
              Revenue Online (Admin)
            </h2>
            <hr />
            {invalid && <div className="alert alert-danger">{invalid}</div>}
            <Input
              type="email"
              id="email"
              value={data.email}
              onChange={emailChangeHandler}
              label="Email"
              error={errors["email"]}
            />

            <Input
              type="password"
              id="password"
              label="Password"
              value={data.password}
              onChange={passwordChangeHandler}
              error={errors["password"]}
            />
            <div className="row d-flex justify-content-center">
              <button className="  btn btn-primary" type="submit">
                Login
              </button>
            </div>
            <Link
              to="/forgot-password"
              className="row d-flex justify-content-center mt-2"
            >
              Forgot Password?
            </Link>
          </div>
        </form>
      </main>
    </div>
  );
}

export default LogIn;
