import {config} from '@gluestack-ui/config';
import {GluestackUIProvider} from '@gluestack-ui/themed';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {StatusBar} from 'react-native';
import {AuthProvider} from './src/auth/AuthProvider';
import './src/localization/i18n';
import PatientBottomNavigator from './src/navigator/PatientBottomNavigator';
import NotFoundScreen from './src/screens/NotFoundScreen';
import SlashScreen from './src/screens/SlashScreen';
import ChangePasswordScreen from './src/screens/auth/ChangePasswordScreen';
import ForgotPasswordScreen from './src/screens/auth/ForgotPasswordScreen';
import LoginScreen from './src/screens/auth/LoginScreen';
import RegisterScreen from './src/screens/auth/RegisterScreen';
import VerifyPhoneScreen from './src/screens/auth/VerifyPhoneScreen';
import AdminLeftSideDrawer from './src/navigator/AdminLeftSideDrawer';
import 'react-native-gesture-handler';
import DepartmentDetailScreen from './src/screens/admin/DepartmentManagementScreen/DepartmentDetailScreen';
import StaffDetailScreen from './src/screens/admin/StaffManagementScreen/StaffDetailScreen';
import PatientDetailScreen from './src/screens/admin/PatientManagementScreen/PatientDetailScreen';
import PatientProfileDetailScreen from './src/screens/admin/PatientManagementScreen/PatientProfileDetailScreen';
import TransactionDetailScreen from './src/screens/admin/TransactionManagementScreen/TransactionDetailScreen';
import DetailsMedicalBillScreen from './src/screens/patient/DetailsMedicalBillScreen';
import DetailsProfileScreen from './src/screens/patient/DetailsProfileScreen';
import TestScreen from './src/screens/TestScreen';
import ChooseDoctorsScreen from './src/screens/patient/MedicalRegistrationProcess/ChooseDoctorsScreen';
import MedicalExaminationHistoryScreen from './src/screens/patient/MedicalExaminationHistoryScreen';
import AllPatientProfilesScreen from './src/screens/patient/LookUpMedicalResults/AllPatientProfilesScreen';
import ChooseDateScreen from './src/screens/patient/MedicalRegistrationProcess/ChooseDateScreen';
import MedicineReminderScreen from './src/screens/patient/MedicineReminder/MedicineReminderScreen';
import ConfirmBookingInformationScreen from './src/screens/patient/MedicalRegistrationProcess/ConfirmBookingInformationScreen';
import BillingInformationScreen from './src/screens/patient/MedicalRegistrationProcess/BillingInformationScreen';
import EnterProfileCode from './src/screens/patient/LookUpMedicalResults/EnterProfileCode';
import PaymentScreen from './src/screens/patient/MedicalRegistrationProcess/PaymentScreen';
import ChooseProfileScreen from './src/screens/patient/MedicalRegistrationProcess/ChooseProfileScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <GluestackUIProvider config={config}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={'transparent'}
        translucent={true}
      />
      <AuthProvider>
        <NavigationContainer>
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
            <Stack.Screen name="NotFoundScreen" component={NotFoundScreen} />
            <Stack.Screen
              name="DetailsProfileScreen"
              component={DetailsProfileScreen}
            />
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
            <Stack.Screen
              name="ForgotPasswordScreen"
              component={ForgotPasswordScreen}
            />
            <Stack.Screen
              name="ChangePasswordScreen"
              component={ChangePasswordScreen}
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
              name="EnterProfileCode"
              component={EnterProfileCode}
            />
            <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
            <Stack.Screen
              name="ChooseProfileScreen"
              component={ChooseProfileScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </AuthProvider>
    </GluestackUIProvider>
  );
};

export default App;
