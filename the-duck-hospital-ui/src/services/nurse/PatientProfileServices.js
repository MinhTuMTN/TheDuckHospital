import { get } from "../AxiosInstance";

export const searchPatientProfiles = (search) => {
  return get("nurse/patient-profiles", {
    patientName: search.name,
    identityNumber: search.indentityNumber,
  });
};
