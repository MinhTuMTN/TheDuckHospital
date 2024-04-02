import React, {useCallback, useEffect} from 'react';
import {ActivityIndicator, FlatList, View} from 'react-native';
import {ContainerComponent, ContentComponent, Header} from '../../components';
import ButtonComponent from '../../components/ButtonComponent';
import DeviceItemComponent from '../../components/patient/deviceManagementScreen/DeviceItemComponent';
import {appColors} from '../../constants/appColors';
import {useToast} from '../../hooks/ToastProvider';
import {getMyDevices, remoteLogoutAll} from '../../services/authServices';

const DeviceManagementScreen = () => {
  const [devices, setDevices] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const _renderItem = useCallback(({item}: any) => {
    return <DeviceItemComponent device={item} onRefresh={handleGetMyDevices} />;
  }, []);
  const _keyExtractor = useCallback((item: any) => item.jwtTokenId, []);
  const toast = useToast();
  const handleGetMyDevices = useCallback(async () => {
    const response = await getMyDevices();
    setLoading(false);
    if (response.success) setDevices(response.data.data);
  }, []);
  const handleRemoteLogoutAll = async () => {
    const response = await remoteLogoutAll();
    if (response.success) {
      toast.showToast('Đăng xuất khỏi tất cả thiết bị thành công');
      handleGetMyDevices();
    }
  };

  useEffect(() => {
    handleGetMyDevices();
  }, [handleGetMyDevices]);

  return (
    <ContainerComponent paddingTop={0}>
      <Header
        title="Thiết bị của tôi"
        noBackground
        titleColor={appColors.textDarker}
        backButtonColor={appColors.textDarker}
      />

      <ContentComponent>
        {loading ? (
          <View>
            <ActivityIndicator size={'large'} color={appColors.primary} />
          </View>
        ) : (
          <>
            <FlatList
              style={{
                flexGrow: 0,
              }}
              data={devices}
              renderItem={_renderItem}
              keyExtractor={_keyExtractor}
            />
            {devices.length > 1 && (
              <View style={{paddingHorizontal: 32, marginTop: 16, flex: 1}}>
                <ButtonComponent
                  onPress={handleRemoteLogoutAll}
                  backgroundColor={'#ff6666'}
                  textColor="white"
                  textStyles={{
                    fontWeight: '600',
                  }}
                  borderRadius={20}>
                  Đăng xuất khỏi tất cả thiết bị
                </ButtonComponent>
              </View>
            )}
          </>
        )}
      </ContentComponent>
    </ContainerComponent>
  );
};

export default DeviceManagementScreen;
