import React, {useCallback, useEffect} from 'react';
import {ContainerComponent, ContentComponent, Header} from '../../components';
import {appColors} from '../../constants/appColors';
import DeviceItemComponent from '../../components/patient/deviceManagementScreen/DeviceItemComponent';
import {ActivityIndicator, FlatList, View} from 'react-native';
import {globalStyles} from '../../styles/globalStyles';
import ButtonComponent from '../../components/ButtonComponent';
import {getMyDevices} from '../../services/authServices';

const DeviceManagementScreen = () => {
  const [devices, setDevices] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const _renderItem = useCallback(({item}: any) => {
    return <DeviceItemComponent device={item} />;
  }, []);
  const _keyExtractor = useCallback((item: any) => item.jwtTokenId, []);

  useEffect(() => {
    const handleGetMyDevices = async () => {
      const response = await getMyDevices();
      setLoading(false);
      if (response.success) setDevices(response.data.data);
    };

    handleGetMyDevices();
  }, []);

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
            <View style={{paddingHorizontal: 32, marginTop: 16, flex: 1}}>
              <ButtonComponent
                backgroundColor={'#ff6666'}
                textColor="white"
                textStyles={{
                  fontWeight: '600',
                }}
                borderRadius={20}>
                Đăng xuất khỏi tất cả thiết bị
              </ButtonComponent>
            </View>
          </>
        )}
      </ContentComponent>
    </ContainerComponent>
  );
};

export default DeviceManagementScreen;
