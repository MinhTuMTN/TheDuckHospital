import {config} from '@gluestack-ui/config';
import {GluestackUIProvider} from '@gluestack-ui/themed';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {StatusBar} from 'react-native';
import './src/localization/i18n';
import PatientBottomNavigator from './src/navigator/PatientBottomNavigator';
import NotFoundScreen from './src/screens/NotFoundScreen';
import SlashScreen from './src/screens/SlashScreen';
import DetailsProfileScreen from './src/screens/patient/DetailsProfileScreen';
import AuthNavigator from './src/navigator/AuthNavigator';
import RegisterScreen from './src/screens/auth/RegisterScreen';
import ForgotPasswordScreen from './src/screens/auth/ForgotPasswordScreen';
import LoginScreen from './src/screens/auth/LoginScreen';
import VerifyPhoneScreen from './src/screens/auth/VerifyPhoneScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <GluestackUIProvider config={config}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={'transparent'}
        translucent={true}
      />
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
            name="VerifyPhoneScreen"
            component={VerifyPhoneScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </GluestackUIProvider>
  );
};

export default App;
