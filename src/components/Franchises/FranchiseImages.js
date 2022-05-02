import { Fragment, useEffect, useState } from "react";

import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import imageService from "../../service/imageService";
import franchiseService from "../../service/franchiseService";

import FranchiseSummary from "./FranchiseSummary";
import FranchiseImagesTable from "./FranchiseImagesTable";

const FranchiseImages = () => {
  const [images, setImages] = useState([
    {
      ptFranchiseDocumentVerificationId: "",
      verifierImageId: "",
      imageName: "",
      path: "",
      imageStatus: "",
      imageStatusDescription: "",
      uploadedDocumentId: "",
    },
  ]);
  const [data, setData] = useState({
    controlNo: "",
    franchiseStatus: "",
  });

  const params = useParams();

  const getAllImagesByFranchiseDetailWeb = async () => {
    try {
      var { data: datas } =
        await franchiseService.getAllImagesByPtFranchiseDetailWebIdAndVerifierId(
          params["ptfranchisedetailwebid"],
          params["userverifierid"]
        );
      console.log(datas);
      setImages(datas);
    } catch (ex) {}
  };

  const getPtFranchiseDetailWebById = async () => {
    try {
      var { data: datas } = await franchiseService.getPtFranchiseDetailWebById(
        params["ptfranchisedetailwebid"]
      );

      const infos = {
        ...datas,
        franchiseStatus:
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
          a.ptFranchiseDocumentVerificationId ===
          image.ptFranchiseDocumentVerificationId
      );

      updatedImages[index].imageStatusDescription = statusDescription;

      setImages((prevState) => {
        return [...updatedImages];
      });

      await imageService.updateImageStatusByPtFranchiseDocumentVerificationId(
        image.ptFranchiseDocumentVerificationId,
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
          a.ptFranchiseDocumentVerificationId ==
          image.ptFranchiseDocumentVerificationId
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
          a.ptFranchiseDocumentVerificationId ===
          image.ptFranchiseDocumentVerificationId
      );

      newImages[index].imageStatus = e.target.value;
      setImages(newImages);
    } catch (ex) {
      console.log("Select Change Handler error:", ex);
    }
  };

  useEffect(() => {
    getAllImagesByFranchiseDetailWeb();
    getPtFranchiseDetailWebById();
  }, []);

  return (
    <Fragment>
      <div className="container-fluid mt-2">
        <h4>Control No: {data.controlNo}</h4>
        <h4>Status: {data.franchiseStatus}</h4>
        <hr></hr>
        <div className="row">
          <div className="col-md-4">
            <FranchiseSummary
              ptFranchiseDetailWebId={params["ptfranchisedetailwebid"]}
            />
          </div>

          <div className="col-md-8">
            <FranchiseImagesTable
              images={images}
              onUpdate={updateHandler}
              onSelectChange={selectChangeHandler}
              onChange={inputChangeHandler}
            ></FranchiseImagesTable>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default FranchiseImages;
