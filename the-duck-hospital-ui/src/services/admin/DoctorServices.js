import { del } from "../AxiosInstance";

export const deleteHeadOfDepartment = (staffId) => {
    return del(`/admin/doctors/${staffId}/head-doctor`, null, { Authorization: "" });
};