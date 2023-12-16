import { get, post, put } from "../AxiosInstance";

export const searchPatientProfiles = (search) => {
  return get("nurse/patient-profiles", {
    patientName: search.name,
    identityNumber: search.identityNumber,
  });
};

export const updatePatientProfile = (patientProfileId, identityNumber) => {
  return put("nurse/patient-profiles", {
    patientProfileId,
    identityNumber,
  });
};

export const createPatientProfile = (data) => {
  return post("nurse/patient-profiles", data);
};
