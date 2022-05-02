import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useParams, useHistory } from "react-router-dom";
import imageService from "./../../service/imageService";
import Input from "../common/Input";
import Select from "../common/Select";

const VerifierImageForm = (props) => {
  const [data, setData] = useState({
    verifierImageId: "",
    imageName: "",
    businessRegistrationTypeId: "",
    verifierType: "",
    taxType: "",
  });
  const params = useParams();
  const history = useHistory();

  const verifierType = [
    { value: "", text: "Select Application Type" },
    { value: "A", text: "All" },
    { value: "N", text: "New" },
    { value: "R", text: "Re New" },
  ];

  const businessRegistrationType = [
    { value: "", text: "Select Business Type" },
    { value: "1", text: "Sole Proprietorship" },
    { value: "2", text: "Partnership / Corporation / Cooperative" },
    { value: "3", text: "All" },
  ];

  const taxType = [
    { value: "", text: "Select Tax Type" },
    { value: "BT", text: "Business Tax" },
    { value: "FT", text: "Franchise Tax" },
    { value: "A", text: "All" },
  ];

  const changeHandler = (e) => {
    console.log(e.target);
    setData((prevState) => {
      return { ...prevState, [e.target.id]: e.target.value };
    });
  };

  const selectChangeHandler = (e) => {
    console.log(e.target);
    setData((prevState) => {
      return { ...prevState, [e.target.id]: e.target.value };
    });
  };

  const getImage = async () => {
    if (params.id === "new") return;
    try {
      const info = await imageService.Get(params.id);
      setData((prevState) => {
        return { ...info["data"] };
      });
      console.log(info);
    } catch (error) {
      toast.error("Unexpected Error." + error.response);
    }
  };

  useEffect(() => {
    getImage();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      var info = await imageService.SaveImage({
        verifierImageId: data.verifierImageId,
        businessRegistrationTypeId: data.businessRegistrationTypeId,
        verifierType: data.verifierType,
        imageName: data.imageName,
        taxType: data.taxType,
      });
      console.log(info);
      toast.success("Saved Succesfully");
      history.replace("/images");
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status < 500
      ) {
        console.log(error.response);
        toast.error(error.response.data);
      } else toast.error("Unexpected Error");
    }
  };

  return (
    <form onSubmit={submitHandler} className="container mt-2">
      <h2>Verifier Image - {params.id === "new" ? "New" : "Edit"}</h2>
      <hr></hr>
      <div>
        <Input
          label="Image Name"
          onChange={changeHandler}
          id="imageName"
          value={data.imageName}
        ></Input>
        <Select
          datas={businessRegistrationType}
          id="businessRegistrationTypeId"
          label="Business Type"
          onChange={selectChangeHandler}
          value={data.businessRegistrationTypeId}
          key={data.businessRegistrationTypeId}
        />

        <Select
          datas={verifierType}
          id="verifierType"
          label="Application Type"
          onChange={selectChangeHandler}
          value={data.verifierType}
        />
        <Select
          datas={taxType}
          id="taxType"
          label="Tax Type"
          onChange={selectChangeHandler}
          value={data.taxType}
        />
        <button className="btn btn-primary">Save</button>
      </div>
    </form>
  );
};

export default VerifierImageForm;
