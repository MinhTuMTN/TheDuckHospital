import {AuthState} from './store/authSlice';
import {RefreshListState} from './store/refreshListSlice';

type Route = {name: string};

type resetProps = {
  index: number;
  routes: Route[];
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
  refreshList: RefreshListState;
}

export type createDepartmentDataProps = {
  departmentName: string;
  description: string;
};

export type updateDepartmentDataProps = {
  departmentName: string;
  description: string;
  staffId: string;
};

export type createOrUpdateMedicineDataProps = {
  medicineName: string;
  price: number;
  quantity: number;
  unit: string;
};

export type createOrUpdateRoomDataProps = {
  roomName: string;
  description: string;
  departmentId: number;
};

export type createStaffDataProps = {
  role: string;
  fullName: string;
  phoneNumber: string;
  identityNumber: string;
  dateOfBirth: string;
  gender: number;
  email: string;
  degree: string;
  departmentId: number;
};

export type updateStaffDataProps = {
  role: string;
  fullName: string;
  phoneNumber: string;
  identityNumber: string;
  dateOfBirth: string;
  gender: number;
  degree: string;
  departmentId: number;
};

export type createServiceDataProps = {
  serviceName: string;
  price: number;
  serviceType: string;
  departmentId: number;
};

export type updateServiceDataProps = {
  price: number;
};

export type openWalletDataProps = {
  pinCode: string;
  rePinCode: string;
};

export type topUpWalletDataProps = {
  pinCode: string;
  amount: number;
  paymentMethod: 'MOMO' | 'VNPAY' | '';
};
