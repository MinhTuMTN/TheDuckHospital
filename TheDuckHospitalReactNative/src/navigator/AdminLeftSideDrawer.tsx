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
import {ActivitySquare, BarChart3, LogOut, Users} from 'lucide-react-native';
import StaffListScreen from '../screens/admin/StaffManagementScreen/StaffListScreen';
import StatisticsScreen from '../screens/admin/StatisticsScreen/StatisticsScreen';
import ButtonComponent from '../components/ButtonComponent';
import {useNavigation} from '@react-navigation/native';
import {useAuth} from '../hooks/AuthHooks';
import {navigationProps} from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';

function CustomDrawerContent(props: DrawerContentComponentProps) {
  const auth = useAuth();
  const navigation = useNavigation();
  const {reset} = useNavigation<navigationProps>();
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

      {/* <ButtonComponent
        backgroundColor="white"
        borderRadius={20}
        textColor={'#F38181'}
        containerStyles={styles.logoutButton}
        startIcon={<LogOut size={20} color={'#F38181'} />}
        onPress={async () => {
          await AsyncStorage.removeItem('token');
          auth.logout();
          // navigation.navigate('LoginScreen' as never);
          // reset({
          //   index: 0,
          //   routes: [{name: 'PatientBottom'}],
          //   // routes: [{name: 'AdminLeftSideDrawer'}],
          // });
        }}>
        Đăng xuất
      </ButtonComponent> */}

      <ButtonComponent
        backgroundColor="white"
        borderRadius={20}
        textColor={'#F38181'}
        containerStyles={styles.logoutButton}
        startIcon={<LogOut size={20} color={'#F38181'} />}
        onPress={async () => {
          await AsyncStorage.removeItem('token');
          auth.logout();
          // navigation.navigate('LoginScreen' as never);
        }}>
        Đăng xuất
      </ButtonComponent>
    </DrawerContentScrollView>
  );
}

const Drawer = createDrawerNavigator();

function AdminLeftSideDrawer() {
  return (
    <Drawer.Navigator
      initialRouteName="Thống kê"
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerLabelStyle: {...styles.drawerLabel},
        headerStyle: {...styles.header},
        headerTintColor: appColors.white,
        headerTitleStyle: {...styles.headerTitle},
      }}>
      <Drawer.Screen
        name="Thống kê"
        component={StatisticsScreen}
        options={{
          drawerIcon: ({color, size}) => (
            <BarChart3 size={24} color={color} style={styles.drawerItemIcon} />
          ),
        }}
      />
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
            <Users size={24} color={color} style={styles.drawerItemIcon} />
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
  logoutButton: {
    borderColor: '#F38181',
    borderWidth: 1,
    width: '50%',
    marginHorizontal: '25%',
    paddingVertical: 8,
    marginTop: 24,
  },
});

export default AdminLeftSideDrawer;
