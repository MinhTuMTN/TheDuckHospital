import { del, get, post, put } from "../../AxiosInstance";

export const createDoctorSchedule = (data) => {
    return post("head-doctor/schedules", data);
}

export const getPaginationActiveDoctors = (params) => {
    return get("/head-doctor/schedules/doctors/filter", params);
};

export const getExaminationRoomsDepartment = () => {
    return get("/head-doctor/schedules/examination-rooms");
};

export const getTreatmentRoomsDepartment = () => {
    return get("/head-doctor/schedules/treatment-rooms");
};

export const getExaminationRoomsDepartmentPagination = (params) => {
    return get("/head-doctor/schedules/examination-rooms-pagination", params);
};

export const getTreatmentRoomsDepartmentPagination = (params) => {
    return get("/head-doctor/schedules/treatment-rooms-pagination", params);
};

export const getSchedulesHeadDoctor = (params) => {
    return get("/head-doctor/schedules", params);
};

export const getInvalidExaminationDate = (params) => {
    return get("/head-doctor/schedules/invalid-examination-date", params);
};

export const getInvalidTreatmentDate = (params) => {
    return get("/head-doctor/schedules/invalid-treatment-date", params);
};

export const getDateHasSchedule = (params) => {
    return get("/head-doctor/schedules/date-has-schedule", params);
};

export const getActiveDoctors = () => {
    return get(`/head-doctor/schedules/active-doctors`);
};

export const getDoctorsInDepartmentHasNoScheduleOnDate = (doctorScheduleId, staffId, params) => {
    return get(`/head-doctor/schedules/${doctorScheduleId}/active-doctors/${staffId}`, params);
};
export const updateDoctorSchedule = (doctorScheduleId, data) => {
    return put(`/head-doctor/schedules/${doctorScheduleId}`, data);
};

export const deleteDoctorSchedule = (doctorScheduleId) => {
    return del(`/head-doctor/schedules/${doctorScheduleId}`);
}