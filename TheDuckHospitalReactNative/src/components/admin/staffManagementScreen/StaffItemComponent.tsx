import React, {useState} from 'react';
import {Image, Pressable, StyleSheet} from 'react-native';
import {ContainerComponent, FlexComponent, TextComponent} from '../..';
import {appColors} from '../../../constants/appColors';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import MaterialIconsIcon from 'react-native-vector-icons/MaterialIcons';
import {globalStyles} from '../../../styles/globalStyles';
import {ArchiveRestore} from 'lucide-react-native';
import StaffDialogComponent from './StaffDialogComponent';
import StaffAlertDialogComponent from './StaffAlertDialogComponent';
import {useNavigation} from '@react-navigation/native';
import {navigationProps} from '../../../types';

interface StaffItemComponentProps {
  staff: any;
  refreshList: boolean;
  setRefreshList: (refreshList: boolean) => void;
  setIsEditing: (isEditing: boolean) => void;
}

function StaffItemComponent(props: StaffItemComponentProps) {
  const {staff, refreshList, setRefreshList, setIsEditing} = props;
  const [modalVisible, setModalVisible] = useState(false);
  const [showAlertDialog, setShowAlertDialog] = useState(false);

  const navigation = useNavigation<navigationProps>();

  const toggleModal = () => {
    setModalVisible(!modalVisible);
    setIsEditing(true);
  };

  const toggleAlert = () => {
    setShowAlertDialog(!showAlertDialog);
  };

  const handleDetailsClick = () => {
    navigation.navigate('StaffDetailScreen', {staff: staff});
  };

  return (
    <Pressable onPress={handleDetailsClick}>
      <ContainerComponent style={styles.staffItemContainer}>
        <FlexComponent style={[styles.staffInfoContainer, {flex: 0.6}]}>
          <Image
            source={{
              uri:
                staff.avatar
                  ? staff.avatar
                  : 'https://icons.iconarchive.com/icons/icons-land/medical/128/People-Doctor-Male-icon.png',
            }}
            height={85}
            width={85}
            style={{
              borderRadius: 18,
            }}
          />
        </FlexComponent>
        <FlexComponent style={[styles.staffInfoContainer, {flex: 0.6}]}>
          <TextComponent bold fontSize={19}>
            {staff.fullName}
          </TextComponent>
          <TextComponent fontSize={16}>{staff.phoneNumber}</TextComponent>
        </FlexComponent>

        <FlexComponent
          style={[
            styles.staffInfoContainer,
            {alignItems: 'center', flex: 0.4},
          ]}>
          <TextComponent fontSize={18}>{staff.role}</TextComponent>
          <FlexComponent style={styles.statusContainer}>
            <EntypoIcon
              name="dot-single"
              size={20}
              color={staff.deleted ? appColors.darkRed : appColors.green}
            />
            <TextComponent
              bold
              fontSize={12}
              color={staff.deleted ? appColors.darkRed : appColors.green}>
              {staff.deleted ? 'Ngừng hoạt động' : 'Còn hoạt động'}
            </TextComponent>
          </FlexComponent>
        </FlexComponent>

        <FlexComponent
          style={[
            styles.staffInfoContainer,
            {alignItems: 'flex-end', flex: 0.2},
          ]}>
          <Pressable onPress={toggleModal}>
            {({pressed}) => (
              <MaterialIconsIcon
                name="edit"
                size={24}
                color={appColors.green}
                style={{marginBottom: 5, opacity: pressed ? 0.5 : 1}}
              />
            )}
          </Pressable>
          <Pressable onPress={toggleAlert}>
            {({pressed}) =>
              staff.deleted ? (
                <ArchiveRestore
                  size={24}
                  color={appColors.green}
                  style={{opacity: pressed ? 0.5 : 1}}
                />
              ) : (
                <MaterialIconsIcon
                  name="delete"
                  size={24}
                  color={appColors.darkRed}
                  style={{opacity: pressed ? 0.5 : 1}}
                />
              )
            }
          </Pressable>
        </FlexComponent>

        <StaffDialogComponent
          edit
          staff={staff}
          setIsEditing={setIsEditing}
          setModalVisible={setModalVisible}
          modalVisible={modalVisible}
          refreshList={refreshList}
          setRefreshList={setRefreshList}
        />
        <StaffAlertDialogComponent
          deleted={staff.deleted}
          setShowAlertDialog={setShowAlertDialog}
          showAlertDialog={showAlertDialog}
          staffId={staff.staffId}
          refreshList={refreshList}
          setRefreshList={setRefreshList}
        />
      </ContainerComponent>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  staffItemContainer: {
    flex: 0.6,
    flexDirection: 'row',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: appColors.gray,
    marginBottom: 15,
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 15,
    shadowColor: globalStyles.shadow.shadowColor,
    shadowOffset: globalStyles.shadow.shadowOffset,
    shadowOpacity: globalStyles.shadow.shadowOpacity,
    elevation: globalStyles.shadow.elevation,
  },
  staffInfoContainer: {
    justifyContent: 'center',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default StaffItemComponent;
