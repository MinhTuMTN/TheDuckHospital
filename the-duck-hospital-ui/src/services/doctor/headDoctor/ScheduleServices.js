import { del, get, post, put } from "../../AxiosInstance";

export const createDoctorSchedule = (data) => {
    return post("head-doctor/schedules", data);
}

export const getPaginationActiveDoctors = (params) => {
    return get("/head-doctor/schedules/doctors/filter", params);
};

export const getRoomsDepartment = () => {
    return get("/head-doctor/schedules/rooms");
};

export const getRoomsDepartmentPagination = (params) => {
    return get("/head-doctor/schedules/rooms-pagination", params);
};

export const getSchedulesHeadDoctor = (params) => {
    return get("/head-doctor/schedules", params);
};

export const getInvalidDate = (params) => {
    return get("/head-doctor/schedules/invalid-date", params);
};

export const getDateHasSchedule = (params) => {
    return get("/head-doctor/schedules/date-has-schedule", params);
};

export const getActiveDoctors = () => {
    return get("/head-doctor/schedules/active-doctors");
};

export const updateDoctorSchedule = (doctorScheduleId, data) => {
    return put(`/head-doctor/schedules/${doctorScheduleId}`, data);
};

export const deleteDoctorSchedule = (doctorScheduleId) => {
    return del(`/head-doctor/schedules/${doctorScheduleId}`);
}