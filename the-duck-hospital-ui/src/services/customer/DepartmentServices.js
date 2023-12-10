import { get } from "../AxiosInstance";

export const getAllDepartments = () => {
  return get("/departments");
};
