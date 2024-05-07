import {config} from '@gluestack-ui/config';
import {GluestackUIProvider} from '@gluestack-ui/themed';
import notifee, {EventType} from '@notifee/react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RealmProvider} from '@realm/react';
import React from 'react';
import {Linking, StatusBar} from 'react-native';
import 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import AxiosInterceptorProvider from './src/hooks/AxiosInterceptorProvider';
import ToastProvider from './src/hooks/ToastProvider';
import linking from './src/linking';
import './src/localization/i18n';
import AdminLeftSideDrawer from './src/navigator/AdminLeftSideDrawer';
import MedicineRemiderNavigator from './src/navigator/MedicineRemiderNavigator';
import PatientBottomNavigator from './src/navigator/PatientBottomNavigator';
import {User} from './src/realm/User';
import NotFoundScreen from './src/screens/NotFoundScreen';
import SlashScreen from './src/screens/SlashScreen';
import TestScreen from './src/screens/TestScreen';
import DepartmentDetailScreen from './src/screens/admin/DepartmentManagementScreen/DepartmentDetailScreen';
import PatientDetailScreen from './src/screens/admin/PatientManagementScreen/PatientDetailScreen';
import PatientProfileDetailScreen from './src/screens/admin/PatientManagementScreen/PatientProfileDetailScreen';
import StaffDetailScreen from './src/screens/admin/StaffManagementScreen/StaffDetailScreen';
import StatisticsScreen from './src/screens/admin/StatisticsScreen/StatisticsScreen';
import TransactionDetailScreen from './src/screens/admin/TransactionManagementScreen/TransactionDetailScreen';
import ChangePasswordScreen from './src/screens/auth/ChangePasswordScreen';
import ForgetAndChangePasswordScreen from './src/screens/auth/ForgetAndChangePasswordScreen';
import ForgotPasswordScreen from './src/screens/auth/ForgotPasswordScreen';
import LoginScreen from './src/screens/auth/LoginScreen';
import RegisterScreen from './src/screens/auth/RegisterScreen';
import VerifyPhoneScreen from './src/screens/auth/VerifyPhoneScreen';
import AddProfileScreen from './src/screens/patient/AddProfileScreen';
import ChangeAccountInfoScreen from './src/screens/patient/ChangeAccountInfoScreen';
import ChatScreen from './src/screens/patient/ChatScreen/ChatScreen';
import DetailsMedicalBillScreen from './src/screens/patient/DetailsMedicalBillScreen';
import DetailsProfileScreen from './src/screens/patient/DetailsProfileScreen';
import DeviceManagementScreen from './src/screens/patient/DeviceManagementScreen';
import AllPatientProfilesScreen from './src/screens/patient/LookUpMedicalResults/AllPatientProfilesScreen';
import AuthenticatePatientAccountViaOTPScreen from './src/screens/patient/LookUpMedicalResults/AuthenticatePatientAccountViaOTPScreen';
import EnterProfileCode from './src/screens/patient/LookUpMedicalResults/EnterProfileCode';
import FindProfileCodeScreen from './src/screens/patient/LookUpMedicalResults/FindProfileCodeScreen';
import MedicalTestResultScreen from './src/screens/patient/LookUpMedicalResults/MedicalTestResultScreen';
import MedicalExaminationHistoryScreen from './src/screens/patient/MedicalExaminationHistoryScreen';
import BillingInformationScreen from './src/screens/patient/MedicalRegistrationProcess/BillingInformationScreen';
import ChooseDateScreen from './src/screens/patient/MedicalRegistrationProcess/ChooseDateScreen';
import ChooseDoctorsScreen from './src/screens/patient/MedicalRegistrationProcess/ChooseDoctorsScreen';
import ChooseProfileScreen from './src/screens/patient/MedicalRegistrationProcess/ChooseProfileScreen';
import ConfirmBookingInformationScreen from './src/screens/patient/MedicalRegistrationProcess/ConfirmBookingInformationScreen';
import PaymentResultScreen from './src/screens/patient/MedicalRegistrationProcess/PaymentResultScreen';
import ChooseProfileForMedicineReminderScreen from './src/screens/patient/MedicineReminder/ChooseProfileForMedicineReminderScreen';
import ManageMedicationSchedulingScreen from './src/screens/patient/MedicineReminder/ManageMedicationSchedulingScreen';
import ScheduleMedicationRemindersScreen from './src/screens/patient/MedicineReminder/ScheduleMedicationRemindersScreen';
import YourPrescriptionScreen from './src/screens/patient/MedicineReminder/YourPrescriptionScreen';
import EnterHospitalPaymentCodeScreen from './src/screens/patient/Payment/EnterHospitalPaymentCodeScreen';
import HospitalFeePaymentInformationScreen from './src/screens/patient/Payment/HospitalFeePaymentInformationScreen';
import SuccessScreen from './src/screens/patient/Payment/SuccessScreen';
import OpenWalletScreen from './src/screens/patient/Wallet/OpenWalletScreen';
import TopUpScreen from './src/screens/patient/Wallet/TopUpScreen';
import TransactionStatisticScreen from './src/screens/patient/Wallet/TransactionStatisticScreen';
import WalletScreen from './src/screens/patient/Wallet/WalletScreen';
import store from './src/store/store';

const Stack = createNativeStackNavigator();

const App = () => {
  notifee.onForegroundEvent(async ({type, detail}) => {
    if (type === EventType.PRESS) {
      Linking.openURL('theduck://app/notifications');
    } else if (type === EventType.DISMISSED) {
      // console.log('Foreground user dismissed notification');
    } else if (type === EventType.DELIVERED) {
      // console.log('Foreground notification delivered');
    }
  });

  return (
    <GluestackUIProvider config={config}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={'transparent'}
        translucent={true}
      />
      <ToastProvider>
        <RealmProvider schema={[User]}>
          <Provider store={store}>
            <AxiosInterceptorProvider>
              <NavigationContainer linking={linking}>
                <Stack.Navigator
                  initialRouteName="SlashScreen"
                  screenOptions={{
                    headerShown: false,
                  }}>
                  <Stack.Screen name="SlashScreen" component={SlashScreen} />
                  <Stack.Screen
                    name="PatientBottom"
                    component={PatientBottomNavigator}
                  />
                  <Stack.Screen
                    name="NotFoundScreen"
                    component={NotFoundScreen}
                  />
                  <Stack.Screen
                    name="DetailsProfileScreen"
                    component={DetailsProfileScreen}
                  />
                  <Stack.Screen name="LoginScreen" component={LoginScreen} />
                  <Stack.Screen
                    name="RegisterScreen"
                    component={RegisterScreen}
                  />
                  <Stack.Screen
                    name="ForgotPasswordScreen"
                    component={ForgotPasswordScreen}
                  />
                  <Stack.Screen
                    name="ForgetAndChangePasswordScreen"
                    component={ForgetAndChangePasswordScreen}
                  />
                  <Stack.Screen
                    name="VerifyPhoneScreen"
                    component={VerifyPhoneScreen}
                  />
                  <Stack.Screen
                    name="AdminLeftSideDrawer"
                    component={AdminLeftSideDrawer}
                  />
                  <Stack.Screen
                    name="StatisticsScreen"
                    component={StatisticsScreen}
                  />
                  <Stack.Screen
                    name="DepartmentDetailScreen"
                    component={DepartmentDetailScreen}
                  />
                  <Stack.Screen
                    name="StaffDetailScreen"
                    component={StaffDetailScreen}
                  />
                  <Stack.Screen
                    name="PatientDetailScreen"
                    component={PatientDetailScreen}
                  />
                  <Stack.Screen
                    name="PatientProfileDetailScreen"
                    component={PatientProfileDetailScreen}
                  />
                  <Stack.Screen
                    name="TransactionDetailScreen"
                    component={TransactionDetailScreen}
                  />
                  <Stack.Screen
                    name="DetailsMedicalBillScreen"
                    component={DetailsMedicalBillScreen}
                  />
                  <Stack.Screen name="TestScreen" component={TestScreen} />
                  <Stack.Screen
                    name="ChooseDoctorsScreen"
                    component={ChooseDoctorsScreen}
                  />
                  <Stack.Screen
                    name="MedicalExaminationHistoryScreen"
                    component={MedicalExaminationHistoryScreen}
                  />
                  <Stack.Screen
                    name="AllPatientProfilesScreen"
                    component={AllPatientProfilesScreen}
                  />
                  <Stack.Screen
                    name="ChooseDateScreen"
                    component={ChooseDateScreen}
                  />
                  <Stack.Screen
                    name="ConfirmBookingInformationScreen"
                    component={ConfirmBookingInformationScreen}
                  />
                  <Stack.Screen
                    name="BillingInformationScreen"
                    component={BillingInformationScreen}
                  />
                  <Stack.Screen
                    name="PaymentResultScreen"
                    component={PaymentResultScreen}
                  />
                  <Stack.Screen
                    name="EnterProfileCode"
                    component={EnterProfileCode}
                  />
                  <Stack.Screen
                    name="ChooseProfileScreen"
                    component={ChooseProfileScreen}
                  />
                  <Stack.Screen
                    name="ChangePasswordScreen"
                    component={ChangePasswordScreen}
                  />
                  <Stack.Screen
                    name="DeviceManagementScreen"
                    component={DeviceManagementScreen}
                  />
                  <Stack.Screen
                    name="AddProfileScreen"
                    component={AddProfileScreen}
                  />
                  <Stack.Screen
                    name="FindProfileCodeScreen"
                    component={FindProfileCodeScreen}
                  />
                  <Stack.Screen
                    name="AuthenticatePatientAccountViaOTPScreen"
                    component={AuthenticatePatientAccountViaOTPScreen}
                  />
                  <Stack.Screen
                    name="EnterHospitalPaymentCodeScreen"
                    component={EnterHospitalPaymentCodeScreen}
                  />
                  <Stack.Screen
                    name="HospitalFeePaymentInformationScreen"
                    component={HospitalFeePaymentInformationScreen}
                  />
                  <Stack.Screen
                    name="SuccessScreen"
                    component={SuccessScreen}
                  />
                  <Stack.Screen name="WalletScreen" component={WalletScreen} />
                  <Stack.Screen
                    name="OpenWalletScreen"
                    component={OpenWalletScreen}
                  />
                  <Stack.Screen name="TopUpScreen" component={TopUpScreen} />
                  <Stack.Screen
                    name="MedicalTestResultScreen"
                    component={MedicalTestResultScreen}
                  />
                  <Stack.Screen name="ChatScreen" component={ChatScreen} />
                  <Stack.Screen
                    name="TransactionStatisticScreen"
                    component={TransactionStatisticScreen}
                  />
                  <Stack.Screen
                    name="MedicineRemiderNavigator"
                    component={MedicineRemiderNavigator}
                  />
                  <Stack.Screen
                    name="ChooseProfileForMedicineReminderScreen"
                    component={ChooseProfileForMedicineReminderScreen}
                  />
                  <Stack.Screen
                    name="YourPrescriptionScreen"
                    component={YourPrescriptionScreen}
                  />
                  <Stack.Screen
                    name="ManageMedicationSchedulingScreen"
                    component={ManageMedicationSchedulingScreen}
                  />
                  <Stack.Screen
                    name="ScheduleMedicationRemindersScreen"
                    component={ScheduleMedicationRemindersScreen}
                  />

                  <Stack.Screen
                    name="ChangeAccountInfoScreen"
                    component={ChangeAccountInfoScreen}
                  />
                </Stack.Navigator>
              </NavigationContainer>
            </AxiosInterceptorProvider>
          </Provider>
        </RealmProvider>
      </ToastProvider>
    </GluestackUIProvider>
  );
};

export default App;
