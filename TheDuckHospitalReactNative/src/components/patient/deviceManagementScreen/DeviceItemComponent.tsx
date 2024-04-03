import dayjs from 'dayjs';
import React, {memo, useMemo} from 'react';
import {View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {FlexComponent, TextComponent} from '../..';
import {appColors} from '../../../constants/appColors';
import {useToast} from '../../../hooks/ToastProvider';
import {remoteLogout} from '../../../services/authServices';

interface DeviceItemComponentProps {
  device: any;
  onRefresh?: () => void;
}

const DeviceItemComponent = (props: DeviceItemComponentProps) => {
  const {device} = props;
  const deviceName = useMemo(() => {
    let result = '';
    result += device.deviceName
      ? device.deviceName.split(' - ')[0].charAt(0).toUpperCase() +
        device.deviceName.split(' - ')[0].slice(1) +
        ' - ' +
        device.deviceName.split(' - ')[1].toUpperCase()
      : 'Trình duyệt web';
    return result;
  }, [device.deviceName]);
  const logoSystem = useMemo(() => {
    if (device.systemName) {
      if (device.systemName === 'iOS') {
        return (
          <Ionicons
            name="logo-apple"
            size={30}
            color="#000"
            style={{flex: 1}}
          />
        );
      } else if (device.systemName === 'Android') {
        return (
          <Ionicons
            name="logo-android"
            size={30}
            color="#000"
            style={{flex: 1}}
          />
        );
      } else {
        return (
          <MaterialCommunityIcon
            name="web"
            size={30}
            color="#000"
            style={{flex: 1}}
          />
        );
      }
    }
    return (
      <MaterialCommunityIcon
        name="web"
        size={30}
        color="#000"
        style={{flex: 1}}
      />
    );
  }, [device.systemName]);

  const toast = useToast();
  const handleRemoteLogout = async () => {
    const response = await remoteLogout({
      logoutTokenId: device.jwtTokenId,
    });

    if (response.success) {
      toast.showToast(`Đăng xuất khỏi thiết bị ${deviceName} thành công`);
      props.onRefresh && props.onRefresh();
    }
  };
  return (
    <FlexComponent
      direction="row"
      justifyContent="space-between"
      style={{
        paddingHorizontal: 8,
        paddingBottom: 8,
      }}
      alignItems="center">
      {logoSystem}
      <FlexComponent
        direction="row"
        alignItems="center"
        flex={6}
        style={{
          paddingBottom: 8,
          borderBottomColor: appColors.grayLine,
          borderBottomWidth: 1,
        }}>
        <FlexComponent flex={7}>
          {device.thisDevice && (
            <TextComponent
              fontWeight="500"
              color={appColors.textGray}
              fontSize={14}>
              Thiết bị này
            </TextComponent>
          )}
          <TextComponent
            bold
            color={appColors.textDarker}
            fontSize={17}
            numberOfLines={1}
            ellipsizeMode="clip">
            {deviceName}
          </TextComponent>
          <TextComponent fontWeight="500">
            {device.systemName
              ? `${device.systemName} ${device.systemVersion}`
              : 'Chưa xác định'}
          </TextComponent>
          <TextComponent fontSize={14} color={appColors.textDescription}>
            Đăng nhập lần cuối:{' '}
            {dayjs(device.lastAccessedAt).format('DD/MM/YYYY HH:mm:ss')}
          </TextComponent>
        </FlexComponent>
        <View
          style={{
            flex: 1,
            alignItems: 'flex-end',
          }}>
          {!device.thisDevice && (
            <MaterialIcon
              name="logout"
              size={30}
              color="#ee8888"
              onPress={handleRemoteLogout}
            />
          )}
        </View>
      </FlexComponent>
    </FlexComponent>
  );
};

export default memo(DeviceItemComponent);
