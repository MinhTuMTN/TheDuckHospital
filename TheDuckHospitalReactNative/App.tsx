import {config} from '@gluestack-ui/config';
import {GluestackUIProvider} from '@gluestack-ui/themed';
import notifee, {EventType} from '@notifee/react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {Linking, StatusBar, View} from 'react-native';
import 'react-native-gesture-handler';
import {AuthProvider} from './src/hooks/AuthProvider';
import AxiosInterceptorProvider from './src/hooks/AxiosInterceptorProvider';
import ToastProvider from './src/hooks/ToastProvider';
import linking from './src/linking';
import './src/localization/i18n';
import AdminLeftSideDrawer from './src/navigator/AdminLeftSideDrawer';
import PatientBottomNavigator from './src/navigator/PatientBottomNavigator';
import NotFoundScreen from './src/screens/NotFoundScreen';
import SlashScreen from './src/screens/SlashScreen';
import TestScreen from './src/screens/TestScreen';
import DepartmentDetailScreen from './src/screens/admin/DepartmentManagementScreen/DepartmentDetailScreen';
import PatientDetailScreen from './src/screens/admin/PatientManagementScreen/PatientDetailScreen';
import PatientProfileDetailScreen from './src/screens/admin/PatientManagementScreen/PatientProfileDetailScreen';
import StaffDetailScreen from './src/screens/admin/StaffManagementScreen/StaffDetailScreen';
import TransactionDetailScreen from './src/screens/admin/TransactionManagementScreen/TransactionDetailScreen';
import ChangePasswordScreen from './src/screens/auth/ChangePasswordScreen';
import ForgetAndChangePasswordScreen from './src/screens/auth/ForgetAndChangePasswordScreen';
import ForgotPasswordScreen from './src/screens/auth/ForgotPasswordScreen';
import LoginScreen from './src/screens/auth/LoginScreen';
import RegisterScreen from './src/screens/auth/RegisterScreen';
import VerifyPhoneScreen from './src/screens/auth/VerifyPhoneScreen';
import DetailsMedicalBillScreen from './src/screens/patient/DetailsMedicalBillScreen';
import DetailsProfileScreen from './src/screens/patient/DetailsProfileScreen';
import DeviceManagementScreen from './src/screens/patient/DeviceManagementScreen';
import AllPatientProfilesScreen from './src/screens/patient/LookUpMedicalResults/AllPatientProfilesScreen';
import EnterProfileCode from './src/screens/patient/LookUpMedicalResults/EnterProfileCode';
import MedicalExaminationHistoryScreen from './src/screens/patient/MedicalExaminationHistoryScreen';
import BillingInformationScreen from './src/screens/patient/MedicalRegistrationProcess/BillingInformationScreen';
import ChooseDateScreen from './src/screens/patient/MedicalRegistrationProcess/ChooseDateScreen';
import ChooseDoctorsScreen from './src/screens/patient/MedicalRegistrationProcess/ChooseDoctorsScreen';
import ChooseProfileScreen from './src/screens/patient/MedicalRegistrationProcess/ChooseProfileScreen';
import ConfirmBookingInformationScreen from './src/screens/patient/MedicalRegistrationProcess/ConfirmBookingInformationScreen';
import PaymentResultScreen from './src/screens/patient/MedicalRegistrationProcess/PaymentResultScreen';
import MedicineReminderScreen from './src/screens/patient/MedicineReminder/MedicineReminderScreen';
import {appColors} from './src/constants/appColors';
import AddProfileScreen from './src/screens/patient/AddProfileScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  notifee.onForegroundEvent(async ({type, detail}) => {
    if (type === EventType.PRESS) {
      Linking.openURL('theduck://app/payment/1');
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
        <AuthProvider>
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
                  name="MedicineReminderScreen"
                  component={MedicineReminderScreen}
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
              </Stack.Navigator>
            </NavigationContainer>
          </AxiosInterceptorProvider>
        </AuthProvider>
      </ToastProvider>
    </GluestackUIProvider>
  );
};

export default App;
