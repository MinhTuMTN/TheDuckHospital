type resetProps = {
  index: number;
  routes: [{name: string}];
};

export type navigationProps = {
  navigate: (screen: string, params?: any) => void;
  goBack: () => void;
  reset: (props: resetProps) => void;
  push: (screen: string, params?: any) => void;
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

export type changePasswordWithOldPasswordDataProps = {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};

export type addPatientProfileProps = {
  patientProfileId: string;
  phoneNumber: string;
};
