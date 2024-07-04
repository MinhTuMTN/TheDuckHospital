import { del, get, post } from "../AxiosInstance";

export const getRoomStatistic = () => {
  return get("/nurse/hospital-admissions/room-statistics");
};

export const getAdmissionRecords = (admissionCode) => {
  return get(`/nurse/hospital-admissions/${admissionCode}`);
};

export const getTreatmentRooms = (roomType) => {
  return get(`/nurse/hospital-admissions/treatment-rooms`, {
    roomType,
  });
};

export const chooseTreatmentRoom = (hospitalAdmissionCode, roomId) => {
  return post(`/nurse/hospital-admissions`, {
    hospitalAdmissionCode,
    roomId,
  });
};

export const getInpatientRooms = () => {
  return get(`/inpatient-nurse/treatment-room`);
};

export const getPatientsInRoom = (roomId, patientName) => {
  return get(`/inpatient-nurse/treatment-room/${roomId}/patients`, {
    patientName,
  });
};

export const getGeneralInfoOfHospitalization = (hospitalizationId) => {
  return get(
    `/inpatient-nurse/hospitalization/${hospitalizationId}/general-info`
  );
};

export const getAllMedicalTestServices = () => {
  return get(`/inpatient-nurse/medical-test-services`);
};

export const createInpatientMedicalTest = (hospitalizationId, data) => {
  return post(
    `/inpatient-nurse/hospitalization/${hospitalizationId}/medical-tests`,
    data
  );
};

export const getInpatientMedicalTests = (
  hospitalizationId,
  serviceId,
  page,
  size = 5
) => {
  return get(
    `/inpatient-nurse/hospitalization/${hospitalizationId}/medical-tests`,
    {
      serviceId,
      page,
      size: size,
    }
  );
};

export const deleteInpatientMedicalTest = (
  hospitalizationId,
  medicalTestId
) => {
  return del(
    `/inpatient-nurse/hospitalization/${hospitalizationId}/medical-tests/${medicalTestId}`
  );
};

export const getHospitalizationDetailsByDate = (hospitalizationId, date) => {
  return get(`/inpatient-nurse/hospitalization/${hospitalizationId}/details`, {
    date,
  });
};

export const updateHospitalizationDetailsByDate = (hospitalizationId, data) => {
  return post(
    `/inpatient-nurse/hospitalization/${hospitalizationId}/details`,
    data
  );
};

export const getMedicalTestsByDate = (hospitalizationId, date) => {
  return get(
    `/inpatient-nurse/hospitalization/${hospitalizationId}/medical-tests-by-date`,
    {
      date,
    }
  );
};
