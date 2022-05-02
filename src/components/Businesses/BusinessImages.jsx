import { set } from "lodash";
import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import businessService from "../../service/businessService";
import imageService from "../../service/imageService";
import BusinessImagesTable from "./BusinessImagesTable";
import Summary from "./Summary";

const BusinessImages = (props) => {
  const [images, setImages] = useState([
    {
      documentVerificationId: "",
      verifierImageId: "",
      imageName: "",
      path: "",
      imageStatus: "",
      imageStatusDescription: "",
      uploadedDocumentId: "",
    },
  ]);
  const [data, setData] = useState({
    bploNo: "",
    businessName: "",
    businessStatus: "",
  });

  const params = useParams();

  const getAllImagesByAssessmentDetailWeb = async () => {
    try {
      var { data: datas } =
        await businessService.getAllImagesByAssessmentDetailWebIdAndVerifierId(
          params["bpassessmentdetailswebid"],
          params["userverifierid"]
        );

      setImages(datas);
    } catch (ex) {}
  };

  const getBpAssessmentDetailWebById = async () => {
    try {
      var { data: datas } = await businessService.getBpAssessmentDetailWebById(
        params["bpassessmentdetailswebid"]
      );
      console.log(datas);
      const infos = {
        ...datas,
        businessStatus:
          datas.businessStatus === "1"
            ? "Unverified"
            : datas.businessStatus === "2"
            ? "Approved"
            : "Disapproved",
      };
      setData(infos);
    } catch (ex) {}
  };

  const updateHandler = async (image, e) => {
    const originalImages = images.map((x) => x);

    let statusDescription;
    switch (image.imageStatus) {
      case "1":
        statusDescription = "Unverified";
        break;
      case "2":
        statusDescription = "Approved";
        break;
      case "3":
        statusDescription = "DisApproved";
        break;
      default:
        break;
    }
    if (statusDescription == image.imageStatusDescription) return;

    try {
      const updatedImages = [...images];

      const index = updatedImages.findIndex(
        (a) => a.documentVerificationId === image.documentVerificationId
      );

      updatedImages[index].imageStatusDescription = statusDescription;

      setImages((prevState) => {
        return [...updatedImages];
      });

      await imageService.updateImageStatusByDocumentVerificationId(
        image.documentVerificationId,
        image.imageStatus,
        image.imageRemarks
      );
      toast.success("Successfully Updated.");
    } catch (ex) {
      console.log(ex.response);
      toast.error("Unexpected error occured.");
      setImages((prevState) => {
        return [...originalImages];
      });
    }
  };

  const inputChangeHandler = (image, e) => {
    try {
      const newImages = [...images];
      const index = images.findIndex(
        (a) => a.documentVerificationId == image.documentVerificationId
      );

      newImages[index].imageRemarks = e.target.value;
      setImages(newImages);
    } catch (ex) {
      console.log("Input Change Handler error:", ex);
    }
  };

  const selectChangeHandler = (image, e) => {
    try {
      const newImages = [...images];
      const index = images.findIndex(
        (a) => a.documentVerificationId == image.documentVerificationId
      );

      newImages[index].imageStatus = e.target.value;
      setImages(newImages);
    } catch (ex) {
      console.log("Select Change Handler error:", ex);
    }
  };

  useEffect(() => {
    getAllImagesByAssessmentDetailWeb();
    getBpAssessmentDetailWebById();
  }, []);

  return (
    <Fragment>
      <div className="container-fluid mt-2">
        <h4>BPLO No: {data.bploNo}</h4>
        <h4>Business Name: {data.businessName}</h4>
        <h4>Status: {data.businessStatus}</h4>
        <hr></hr>
        <div className="row">
          <div className="col-md-4">
            <Summary
              bpassessmentdetailswebid={params["bpassessmentdetailswebid"]}
            />
          </div>

          <div className="col-md-8">
            <BusinessImagesTable
              images={images}
              onUpdate={updateHandler}
              onSelectChange={selectChangeHandler}
              onChange={inputChangeHandler}
            ></BusinessImagesTable>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default BusinessImages;
