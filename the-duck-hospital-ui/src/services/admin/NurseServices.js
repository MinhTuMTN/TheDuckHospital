import { del, get } from "../AxiosInstance";

export const deleteHeadNurseOfDepartment = (staffId) => {
    return del(`/admin/nurses/${staffId}/head-nurse`);
};

export const getNursesNotInDepartment = () => {
    return get("/admin/nurses/not-in-department");
};