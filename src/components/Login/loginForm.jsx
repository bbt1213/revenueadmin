import React from "react";
import Form from "./common/form";
import auth from "../services/authService";
import docuvuLogo from "../logo/DocuVu-D.png";
import Joi, { errors } from "joi-browser";
import { NavLink } from "react-router-dom";

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      await auth.login(data.username, data.password);
      window.location = "/";
    } catch (ex) {
      console.log("error handling", ex);
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors["invalidLogin"] = ex.response.data;
        this.setState({ errors });
      } else if (ex.request === "Network error") {
        const errors = { ...this.state.errors };
        errors["invalidLogin"] =
          "Network error. Please contact your Administrator.";
        this.setState({ errors });
      } else {
        return ex.response;
      }
    }
  };

  render() {
    const { errors } = this.state;
    return (
      <div
        className="bg-size overflow-auto"
        style={{
          height: "90vh",
          padding: 0,
          backgroundColor: "whitesmoke",
        }}
      >
        <main className="form-signin mt-3">
          <form onSubmit={this.handleSubmit}>
            <img className="mb-4" src={docuvuLogo} alt="" />

            <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
            {errors["invalidLogin"] && (
              <div className="alert alert-danger">{errors["invalidLogin"]}</div>
            )}
            <div className="form-floating ">
              {this.renderInput("username", "Username")}
            </div>
            <div className="form-floating ">
              {this.renderInput("password", "Password", "password")}
            </div>
            <div className="row">
              <div className="my-3">
                <NavLink
                  className="nav-item nav-link d-flex justify-content-center"
                  to="/forgotPassword"
                >
                  Forgot Password?
                </NavLink>
              </div>
            </div>
            {this.renderButton("Sign in", "w-100 btn btn-lg btn-primary")}
            <div className="row">
              <div className="my-3">
                <NavLink to="/register">
                  <label className="w-100 btn btn-lg btn-success">
                    Create a new Account
                  </label>
                </NavLink>
              </div>
            </div>
            <p className=" mb-3 text-muted">© 2017–2021</p>
          </form>
        </main>
      </div>
    );
  }
}

export default LoginForm;
