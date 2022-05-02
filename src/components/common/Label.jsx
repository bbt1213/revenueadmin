import React from "react";
const Label = ({ label, value, ...rest }) => {
  return (
    <div className="row">
      <div className="col-md-4">
        <label className="form-label">{label}</label>
      </div>
      <div className="col-md-8">
        <span>
          <b>{value}</b>
        </span>
      </div>
    </div>
  );
};

export default Label;
