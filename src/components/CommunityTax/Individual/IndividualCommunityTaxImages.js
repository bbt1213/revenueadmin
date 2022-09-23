import { Fragment, useEffect, useState } from "react";

import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import imageService from "../../../service/imageService";
import individualCommunityTaxService from "../../../service/individualCommunityTaxService";

import IndividualCommunityTaxSummary from "./IndividualCommunityTaxSummary";
import IndividualCommunityTaxImagesTable from "./IndividualCommunityTaxImagesTable";

const IndividualCommunityTaxImages = () => {
  const [images, setImages] = useState([
    {
      communityTaxIndividualDocumentVerificationId: "",
      verifierImageId: "",
      imageName: "",
      path: "",
      imageStatus: "",
      imageStatusDescription: "",
      uploadedDocumentId: "",
    },
  ]);
  const [data, setData] = useState({
    fullName: "",
    status: "",
  });

  const params = useParams();

  const getAllImagesByCommunityTaxIndividual = async () => {
    try {
      var { data: datas } =
        await individualCommunityTaxService.getAllImagesByCommunityTaxIndividualIdAndVerifierId(
          params["communityTaxIndividualId"],
          params["userverifierid"]
        );
       
      setImages(datas);
    } catch (ex) {console.log(ex);}
  };

  const GetCommunityTaxIndividualById = async () => {
    try {
      var { data: datas } = await individualCommunityTaxService.getCommunityTaxIndividualById(
        params["communityTaxIndividualId"]
      );

      const infos = {
        ...datas,
        status:
          datas.status === "1"
            ? "Unverified"
            : datas.status === "2"
            ? "Approved"
            : "Disapproved",
      };
      setData(infos);
    } catch (ex) {}
  };

  const updateHandler = async (image, e) => {
    const originalImages = [...images];

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

    if (statusDescription === image.imageStatusDescription) return;

    try {
      const updatedImages = [...images];

      const index = updatedImages.findIndex(
        (a) =>
          a.communityTaxIndividualDocumentVerificationId ===
          image.communityTaxIndividualDocumentVerificationId
      );

      updatedImages[index].imageStatusDescription = statusDescription;

      setImages((prevState) => {
        return [...updatedImages];
      });

      await imageService.updateImageStatusByCommunityTaxIndividualDocumentVerificationId(
        image.communityTaxIndividualDocumentVerificationId,
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
        (a) =>
          a.communityTaxIndividualDocumentVerificationId ==
          image.communityTaxIndividualDocumentVerificationId
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
        (a) =>
          a.communityTaxIndividualDocumentVerificationId ===
          image.communityTaxIndividualDocumentVerificationId
      );

      newImages[index].imageStatus = e.target.value;
      setImages(newImages);
    } catch (ex) {
      console.log("Select Change Handler error:", ex);
    }
  };

  useEffect(() => {
    getAllImagesByCommunityTaxIndividual();
    GetCommunityTaxIndividualById();
  }, []);

  return (
    <Fragment>
      <div className="container-fluid mt-2">
        <h4>Full Name: {data.fullName}</h4>
        <h4>Status: {data.status}</h4>
        <hr></hr>
        <div className="row">
          <div className="col-md-4">
            <IndividualCommunityTaxSummary
              communityTaxIndividualDocumentVerificationId={params["communityTaxIndividualDocumentVerificationId"]}
            />
          </div>

          <div className="col-md-8">
            <IndividualCommunityTaxImagesTable
              images={images}
              onUpdate={updateHandler}
              onSelectChange={selectChangeHandler}
              onChange={inputChangeHandler}
            ></IndividualCommunityTaxImagesTable>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default IndividualCommunityTaxImages;
