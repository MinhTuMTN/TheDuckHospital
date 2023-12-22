import { del, get } from "../AxiosInstance";

export const deleteHeadOfDepartment = (staffId) => {
    return del(`/admin/doctors/${staffId}/head-doctor`);
};

export const getDoctorsNotInDepartment = () => {
    return get("/admin/doctors/not-in-department");
};