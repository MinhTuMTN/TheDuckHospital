import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import MedicineListScreen from '../screens/admin/MedicineManagementScreen/MedicineListScreen';
import DepartmentListScreen from '../screens/admin/DepartmentManagementScreen/DepartmentListScreen';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {appColors} from '../constants/appColors';
import RoomListScreen from '../screens/admin/RoomManagementScreen/RoomListScreen';
import TransactionListScreen from '../screens/admin/TransactionManagementScreen/TransactionListScreen';
import PatientListScreen from '../screens/admin/PatientManagementScreen/PatientListScreen';
import ServiceListScreen from '../screens/admin/ServiceManagementScreen/ServiceListScreen';
import { ActivitySquare, Users } from 'lucide-react-native';
import StaffListScreen from '../screens/admin/StaffManagementScreen/StaffListScreen';

function CustomDrawerContent(props: DrawerContentComponentProps) {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/images/logo-text-small.png')}
          alt="Logo"
          style={styles.logo}
        />
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

const Drawer = createDrawerNavigator();

function AdminLeftSideDrawer() {
  return (
    <Drawer.Navigator
      initialRouteName="Quản lý thuốc"
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerLabelStyle: {...styles.drawerLabel},
        headerStyle: {...styles.header},
        headerTintColor: appColors.white,
        headerTitleStyle: {...styles.headerTitle},
      }}>
      <Drawer.Screen
        name="Quản lý thuốc"
        component={MedicineListScreen}
        options={{
          drawerIcon: ({color, size}) => (
            <FontAwesome5Icon
              name="pills"
              size={24}
              color={color}
              style={styles.drawerItemIcon}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Quản lý khoa"
        component={DepartmentListScreen}
        options={{
          drawerIcon: ({color, size}) => (
            <MaterialCommunityIcon
              name="google-classroom"
              size={24}
              color={color}
              style={styles.drawerItemIcon}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Quản lý phòng"
        component={RoomListScreen}
        options={{
          drawerIcon: ({color, size}) => (
            <MaterialIcons
              name="meeting-room"
              size={24}
              color={color}
              style={styles.drawerItemIcon}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Quản lý bệnh nhân"
        component={PatientListScreen}
        options={{
          drawerIcon: ({color, size}) => (
            <MaterialCommunityIcon
              name="emoticon-sick-outline"
              size={24}
              color={color}
              style={styles.drawerItemIcon}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Quản lý nhân viên"
        component={StaffListScreen}
        options={{
          drawerIcon: ({color, size}) => (
            <Users
              size={24}
              color={color}
              style={styles.drawerItemIcon}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Quản lý dịch vụ"
        component={ServiceListScreen}
        options={{
          drawerIcon: ({color, size}) => (
            <ActivitySquare
              size={24}
              color={color}
              style={styles.drawerItemIcon}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Quản lý thanh toán"
        component={TransactionListScreen}
        options={{
          drawerIcon: ({color, size}) => (
            <MaterialIcons
              name="payment"
              size={24}
              color={color}
              style={styles.drawerItemIcon}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  logo: {
    width: 150,
    height: 150,
  },
  drawerLabel: {
    fontSize: 17,
    marginLeft: -15,
  },
  headerTitle: {
    fontSize: 28,
    color: appColors.white,
    fontWeight: 'bold',
  },
  header: {
    height: 100,
    backgroundColor: appColors.primary,
  },
  drawerItemIcon: {
    marginLeft: 10,
  },
  drawerHeaderIcon: {
    fontSize: 26,
    marginLeft: 20,
  },
});

export default AdminLeftSideDrawer;
