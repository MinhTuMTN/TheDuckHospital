import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import AccountScreen from '../screens/patient/MainScreen/AccountScreen';
import HomeScreen from '../screens/patient/MainScreen/HomeScreen';
import MedicalBillScreen from '../screens/patient/MainScreen/MedicalBillScreen';
import NotificationScreen from '../screens/patient/MainScreen/NotificationScreen';
import ProfileScreen from '../screens/patient/MainScreen/ProfileScreen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

const MainPatientNavigatior = () => {
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
          tabBarLabel: 'Trang chủ',
          tabBarIcon: ({color, size}) => (
            <Icon name="home-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Hồ sơ',
          tabBarIcon: ({color, size}) => (
            <Icon name="file-account-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="MedicalBillScreen"
        component={MedicalBillScreen}
        options={{
          tabBarLabel: 'Phiếu khám',
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
          tabBarLabel: 'Thông báo',
          tabBarIcon: ({color, size}) => (
            <Icon name="bell-ring-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="AccountScreen"
        component={AccountScreen}
        options={{
          tabBarLabel: 'Tài khoản',
          tabBarIcon: ({color, size}) => (
            <Icon name="account-settings-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainPatientNavigatior;
