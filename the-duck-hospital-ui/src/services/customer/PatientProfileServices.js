import { del, get, post, put } from "../AxiosInstance";

export const createPatientProfile = (data) => {
  return post("/patients/patient-profiles", data);
};

export const updatePatientProfile = (id, data) => {
  return put(`/patients/patient-profiles/${id}`, data);
};

export const getAllPatientProfiles = () => {
  return get("/patients/patient-profiles");
};

export const deletePatientProfile = (id) => {
  return del(`/patients/patient-profiles/${id}`);
};

export const findPatientProfileByPatientCode = (patientCode) => {
  return get(`/patients/patient-profiles/search`, {
    patientCode: patientCode,
  });
};

export const sendOTPPatientProfile = (patientProfileId, phoneNumber) => {
  return post(`/patients/patient-profiles/send-otp`, {
    patientProfileId,
    phoneNumber,
  });
};

export const addPatientProfile = (patientProfileId, otp) => {
  return post(`/patients/patient-profiles/add-profile`, {
    patientProfileId,
    otp,
  });
};

export const findPatientProfileByInfo = (
  fullName,
  gender,
  provinceId,
  yearOfBirth
) => {
  return post(`/patients/patient-profiles/search-patient_code`, {
    fullName,
    yearOfBirth,
    provinceId,
    gender,
  });
};
