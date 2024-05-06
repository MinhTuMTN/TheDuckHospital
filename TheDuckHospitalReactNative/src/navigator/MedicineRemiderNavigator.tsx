import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Pressable, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {appColors} from '../constants/appColors';
import TestScreen from '../screens/TestScreen';
import MedicineReminderHistoryScreen from '../screens/patient/MedicineReminder/MedicineReminderHistoryScreen';
import MedicineReminderScreen from '../screens/patient/MedicineReminder/MedicineReminderScreen';
import {navigationProps} from '../types';

const Tab = createBottomTabNavigator();
const MedicineRemiderNavigator = () => {
  const navigation = useNavigation<navigationProps>();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        lazy: false,
        tabBarActiveTintColor: appColors.darkerBlue,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
        tabBarStyle: {
          paddingHorizontal: 32,
          height: 50,
          paddingBottom: 4,
          paddingTop: 6,
        },
        tabBarInactiveTintColor: appColors.textDescription,
      }}
      initialRouteName="MedicineReminderScreen">
      <Tab.Screen
        name="MedicineReminderScreen"
        component={MedicineReminderScreen}
        options={{
          tabBarLabel: 'Lịch nhắc',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="calendar-check"
              size={22}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="TestScreen"
        component={TestScreen}
        options={{
          tabBarIcon: ({focused, color, size}) => {
            return (
              <Pressable
                onPress={() => {
                  navigation.navigate('ChooseProfileForMedicineReminderScreen');
                }}
                style={{
                  position: 'absolute',
                }}>
                <View
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 30,
                    backgroundColor: appColors.darkerBlue,
                    justifyContent: 'center',
                    alignItems: 'center',
                    top: -25,
                    zIndex: 1,
                  }}>
                  <Entypo name="plus" size={30} color={appColors.white} />
                </View>
              </Pressable>
            );
          },
          tabBarLabel: 'Thêm',
          tabBarLabelStyle: {
            display: 'none',
          },
        }}
      />
      <Tab.Screen
        name="MedicineReminderHistoryScreen"
        component={MedicineReminderHistoryScreen}
        options={{
          tabBarLabel: 'Thuốc của tôi',
          tabBarIcon: ({color, size}) => (
            <AntDesign name="medicinebox" size={22} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MedicineRemiderNavigator;
