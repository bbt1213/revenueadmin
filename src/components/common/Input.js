import React, { Fragment } from "react";

const Input = ({ id, type, label, value, onChange, error, ...res }) => {
  return (
    <Fragment>
      <div className="mb-3 row">
        <label htmlFor={id} className="col-md-4 col-form-label required">
          {label}
        </label>
        <div className="col-md-8">
          <input
            type={type}
            className="form-control"
            id={id}
            value={value}
            onChange={onChange}
            {...res}
          />
        </div>
        {error && (
          <div className="row ml-10">
            <span className="mx-3 alert alert-danger">Error</span>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default Input;
