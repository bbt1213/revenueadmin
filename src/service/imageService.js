import http from "./httpService";
import axios from "axios";
import logger from "./logService";
import { toast } from "react-toastify";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
const apiEndpoint = `${axios.defaults.baseURL}/api`;

export async function updateImageStatusByDocumentVerificationId(
  documentVerificationId,
  status,
  remarks
) {
  return await http.post(
    `${apiEndpoint}/documentverification/${documentVerificationId}`,
    { status, remarks }
  );
}

export async function updateImageStatusByPtFranchiseDocumentVerificationId(
  documentVerificationId,
  status,
  remarks
) {
  return await http.post(
    `${apiEndpoint}/ptfranchisedocumentverification/${documentVerificationId}`,
    { status, remarks }
  );
}

export async function updateImageStatusByCommunityTaxIndividualDocumentVerificationId(
  documentVerificationId,
  status,
  remarks
) {
  return await http.post(
    `${apiEndpoint}/communityTaxIndividualDocumentVerifications/${documentVerificationId}`,
    { status, remarks }
  );
}

export async function SaveImage(image) {
  const data = {
    imageName: image.imageName,
    businessRegistrationTypeId: image.businessRegistrationTypeId,
    verifierType: image.verifierType,
    verifierImageId: image.verifierImageId,
    taxType: image.taxType,
  };

  if (!image.verifierImageId) {
    data.verifierImageId = 0;
    return await http.post(`${apiEndpoint}/verifierimages/`, data);
  } else return await http.put(`${apiEndpoint}/verifierimages/`, data);
}

export async function GetAll() {
  return await http.get(`${apiEndpoint}/VerifierImages`);
}

export async function Get(verifierImageId) {
  return await http.get(`${apiEndpoint}/VerifierImages/${verifierImageId}`);
}

export async function GetDepartmentStatus(bpAssessmentDetailWebId) {
  return await http.get();
}

const imageService = {
  updateImageStatusByDocumentVerificationId,
  GetAll,
  Get,
  SaveImage,
  GetDepartmentStatus,
  updateImageStatusByPtFranchiseDocumentVerificationId,
  updateImageStatusByCommunityTaxIndividualDocumentVerificationId
};

export default imageService;
