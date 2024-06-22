import dayjs from "dayjs";

//get Age from date of birth
export const getAge = (dateOfBirth) => {
  const today = dayjs();
  const birthDate = dayjs(dateOfBirth);
  return today.diff(birthDate, "year");
};
