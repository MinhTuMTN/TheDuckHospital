import { get, del, post } from "../AxiosInstance";

export const getNusrseByType = (search, nurseType, page, limit) => {
  return get("/head-nurse/schedules/nurses", {
    search,
    nurseType,
    page,
    limit,
  });
};

export const getRoomSchedules = (roomType) => {
  return get("/head-nurse/schedules/rooms", {
    roomType,
  });
};

export const getShiftByRoom = (roomId) => {
  return get(
    `/head-nurse/schedules/rooms/${roomId}/examination-room-schedules`
  );
};

export const deleteSchedule = (scheduleId) => {
  return del(`/head-nurse/schedules/${scheduleId}`);
};

export const createShiftSchedule = (roomId, nurseId, dayOfWeek, session) => {
  return post(
    `/head-nurse/schedules/rooms/${roomId}/examination-room-schedules`,
    {
      nurseId,
      schedules: [
        {
          dayOfWeek,
          session,
        },
      ],
    }
  );
};

export const createInpatientShiftSchedule = (
  roomId,
  nurseId,
  morningDates,
  afternoonDates,
  eveningDates,
  nightDates
) => {
  return post(
    `/head-nurse/schedules/rooms/${roomId}/inpatient-room-schedules`,
    {
      nurseId,
      roomId,
      morningDates,
      afternoonDates,
      eveningDates,
      nightDates,
    }
  );
};

export const getInpatientShift = (roomId, nurseId, month, year) => {
  return get(
    `/head-nurse/schedules/rooms/${roomId}/inpatient-room-schedules/${nurseId}`,
    {
      month,
      year,
    }
  );
};
