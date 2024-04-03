import { AuthState } from "./store/authSlice";

type resetProps = {
  index: number;
  routes: [{name: string}];
};

export type navigationProps = {
  navigate: (screen: string, params?: any) => void;
  goBack: () => void;
  reset: (props: resetProps) => void;
  push: (screen: string, params?: any) => void;
  setOptions: (options: Partial<{}>) => void;
};

export type checkPhoneOrEmailDataProps = {
  emailOrPhoneNumber: string;
};

export type registerDataProps = {
  fullName: string;
  phoneNumber: string;
  password: string;
  otp: string;
};

export type loginDataProps = {
  emailOrPhoneNumber: string;
  passwordOrOTP: string;
};

export type forgetPasswordDataProps = {
  phoneNumber: string;
};

export type changePasswordDataProps = {
  confirmNewPassword: string;
  phoneNumber: string;
  newPassword: string;
  otp: string;
};

export type patientProfileDataProps = {
  fullName: string;
  dateOfBirth: string;
  phoneNumber: string;
  gender: number;
  wardId: number;
  streetName: string;
  email: string;
  identityNumber: string;
  nationId: number;
};

export type updateDeviceInformationDataProps = {
  deviceId: string;
  deviceName: string;
  systemName: string;
  systemVersion: string;
  fcmToken: string;
};

export type changePasswordWithOldPasswordDataProps = {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};

export type addPatientProfileProps = {
  patientProfileId: string;
  phoneNumber: string;
};

export type remoteLogoutDataProps = {
  logoutTokenId: string;
};

export interface RootState {
  auth: AuthState;
}
