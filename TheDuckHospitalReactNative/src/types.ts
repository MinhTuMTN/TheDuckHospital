export type navigationProps = {
  navigate: (screen: string, params?: any) => void;
  goBack: () => void;
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
