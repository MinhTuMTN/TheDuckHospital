import { del, get, post, put } from "../AxiosInstance";

export const getAllMedicalTests = () => {
  return get("/doctor/medical-tests");
};

export const getLabRooms = (roomType) => {
  return get(`/doctor/medical-tests/lab-rooms`, { roomType });
};

export const getMedicalTestByRoom = (roomId, search, state, page, size) => {
  return get(`/doctor/medical-tests/lab-rooms/${roomId}`, {
    search,
    state,
    page,
    size,
  });
};

export const getMedicalTestByMedicalRecordId = (medicalRecordId) => {
  return get(`/doctor/medical-records/${medicalRecordId}/medical-test`);
};

export const getMedicalTestRecord = (medicalTestId) => {
  return get(`/doctor/medical-tests/${medicalTestId}`);
};

export const accpectMedicalTest = (medicalTestId) => {
  return put(`/doctor/medical-tests/${medicalTestId}/accept`);
};

export const getNextQueue = (roomId) => {
  return get(`/doctor/medical-tests/lab-rooms/${roomId}/next`);
};

export const getRoomCounter = (roomId) => {
  return get(`/doctor/medical-tests/lab-rooms/${roomId}/counter`);
};

export const createMedicalTest = (medicalRecordId, data) => {
  return post(`/doctor/medical-records/${medicalRecordId}/medical-test`, data);
};

export const deleteMedicalTest = (medicalRecordId, medicalTestId) => {
  return del(
    `/doctor/medical-records/${medicalRecordId}/medical-test/${medicalTestId}`
  );
};

export const updateMedicalTestRecord = (medicalTestId, data) => {
  return put(`/doctor/medical-tests/${medicalTestId}/complete`, data, {
    "Content-Type": "multipart/form-data",
  });
};
