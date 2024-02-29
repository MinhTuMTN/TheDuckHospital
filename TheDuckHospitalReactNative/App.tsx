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
import DetailsMedicalBillScreen from './src/screens/patient/DetailsMedicalBillScreen';
import DetailsProfileScreen from './src/screens/patient/DetailsProfileScreen';
import TestScreen from './src/screens/TestScreen';
import ChooseDoctorsScreen from './src/screens/patient/MedicalRegistrationProcess/ChooseDoctorsScreen';

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
              name="DetailsMedicalBillScreen"
              component={DetailsMedicalBillScreen}
            />
            <Stack.Screen name="TestScreen" component={TestScreen} />
            <Stack.Screen
              name="ChooseDoctorsScreen"
              component={ChooseDoctorsScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </AuthProvider>
    </GluestackUIProvider>
  );
};

export default App;
