import { get } from "../AxiosInstance";

export const getDoctorsMedicalExaminations = (
  fullName = "",
  page = 1,
  departmentId = null,
  degree = null
) => {
  return get("/doctors", {
    fullName,
    departmentId,
    degree,
    page,
    limit: 10,
  });
};
