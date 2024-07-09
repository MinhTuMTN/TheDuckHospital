import { get } from "../AxiosInstance";

export const getHistoryMedicalRecord = (patientProfileId, page) => {
  return get("/medical-records/by-profile", {
    patientProfileId,
    page,
    limit: 5,
  });
};

export const getHistoryMedicalRecordDetails = (medicalRecordId) => {
  return get(`/medical-records/${medicalRecordId}`);
};
