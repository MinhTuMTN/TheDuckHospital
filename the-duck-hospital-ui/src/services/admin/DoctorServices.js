import { del, get } from "../AxiosInstance";

export const deleteHeadOfDepartment = (staffId) => {
    return del(`/admin/doctors/${staffId}/head-doctor`, null, { Authorization: "" });
};

export const getDoctorsNotInDepartment = () => {
    return get("/admin/doctors/not-in-department", null, { Authorization: "" });
  };