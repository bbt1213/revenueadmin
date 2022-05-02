import React, { Component } from "react";

const SelectText = (props) => {
  const { datas, selectedValue } = props;
  const getSelectedValue = () => {
    const index = datas.findIndex((a) => a.id === selectedValue);
    return index === -1 ? "" : datas[index].Text;
  };
  return <label>{getSelectedValue()}</label>;
};

export default SelectText;
