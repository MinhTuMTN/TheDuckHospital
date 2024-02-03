import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import AccountScreen from '../screens/patient/MainScreen/AccountScreen';
import HomeScreen from '../screens/patient/MainScreen/HomeScreen';
import MedicalBillScreen from '../screens/patient/MainScreen/MedicalBillScreen';
import NotificationScreen from '../screens/patient/MainScreen/NotificationScreen';
import ProfileScreen from '../screens/patient/MainScreen/ProfileScreen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useTranslation} from 'react-i18next';

const Tab = createBottomTabNavigator();

const MainPatientNavigatior = () => {
  const {t} = useTranslation();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="HomeScreen">
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarLabel: t('bottomTab.home'),
          tabBarIcon: ({color, size}) => (
            <Icon name="home-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          tabBarLabel: t('bottomTab.medicalRecord'),
          tabBarIcon: ({color, size}) => (
            <Icon name="file-account-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="MedicalBillScreen"
        component={MedicalBillScreen}
        options={{
          tabBarLabel: t('bottomTab.medicalBill'),
          tabBarIcon: ({color, size}) => (
            <Icon
              name="ticket-confirmation-outline"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="NotificationScreen"
        component={NotificationScreen}
        options={{
          tabBarLabel: t('bottomTab.notification'),
          tabBarIcon: ({color, size}) => (
            <Icon name="bell-ring-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="AccountScreen"
        component={AccountScreen}
        options={{
          tabBarLabel: t('bottomTab.account'),
          tabBarIcon: ({color, size}) => (
            <Icon name="account-settings-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainPatientNavigatior;
