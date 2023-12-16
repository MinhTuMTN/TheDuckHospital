import { get, post } from "../../AxiosInstance";

export const createDoctorSchedule = (data) => {
    return post("head-doctor/schedules", data);
}

export const getPaginationActiveDoctors = (params) => {
    return get("/head-doctor/schedules/doctors/filter", params);
};

export const getRoomsDepartment = () => {
    return get("/head-doctor/schedules/rooms");
};

export const getInvalidDate = (params) => {
    return get("/head-doctor/schedules/invalid-date", params);
};