import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import imageService from "../../service/imageService";
import VerifierImagesTable from "./VerifierImagesTable";

const VerifierImages = () => {
  const [datas, setDatas] = useState([{}]);
  const [loading, setLoading] = useState(false);

  const getAllImages = async () => {
    try {
      const data = await imageService.GetAll();
      if (data.data === "No image found.") {
        setDatas(() => {
          return [];
        });
      } else setDatas(data.data);
    } catch (error) {
      toast.error(error.respoonse);
    }
  };

  useEffect(() => {
    getAllImages();
  }, []);

  return (
    <Fragment>
      <div className="container mt-2">
        {datas && datas.length > 0 && (
          <Fragment>
            {" "}
            <h2>List of Images</h2>
            <Link className="btn btn-primary" to="/images/new">
              New Image
            </Link>
            <hr></hr>
            <VerifierImagesTable images={datas}></VerifierImagesTable>
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

export default VerifierImages;
