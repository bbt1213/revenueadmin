import React, { Component, Fragment } from "react";

const Select = ({ id, label, datas, value, onChange, ...res }) => {
  return (
    <Fragment>
      <div className="row mb-3">
        <div className="col-md-4">
          <label className="form-label">{label}</label>
        </div>
        <div className="col-md-8">
          <select
            className="form-select"
            defaultValue={value}
            onChange={onChange}
            id={id}
          >
            {datas.map((data) => (
              <option
                key={data.value}
                value={data.value}
                selected={data.value === value}
              >
                {data.text}
              </option>
            ))}
          </select>
        </div>
      </div>
    </Fragment>
  );
};

export default Select;
