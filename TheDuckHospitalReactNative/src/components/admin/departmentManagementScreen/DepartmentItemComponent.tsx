import React, {useState} from 'react';
import {StyleSheet, Pressable} from 'react-native';
import {ContainerComponent, FlexComponent, TextComponent} from '../..';
import {appColors} from '../../../constants/appColors';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import MaterialIconsIcon from 'react-native-vector-icons/MaterialIcons';
import {globalStyles} from '../../../styles/globalStyles';
import DepartmentAlertDialogComponent from './DepartmentAlertDialogComponent';
import {ArchiveRestore} from 'lucide-react-native';
import {useNavigation} from '@react-navigation/native';
import DepartmentDialogComponent from './DepartmentDialogComponent';
import {navigationProps} from '../../../types';

interface DepartmentItemComponentProps {
  department: any;
  refreshList: boolean;
  setRefreshList: (refreshList: boolean) => void;
  setIsEditing: (isEditing: boolean) => void;
}

function DepartmentItemComponent(props: DepartmentItemComponentProps) {
  const {department, refreshList, setRefreshList, setIsEditing} = props;
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
    navigation.navigate('DepartmentDetailScreen', {departmentId: department.departmentId});
  };

  return (
    <Pressable onPress={handleDetailsClick}>
      <ContainerComponent style={styles.departmentItemContainer}>
        <FlexComponent style={[styles.departmentInfoContainer, {flex: 0.5}]}>
          <TextComponent bold fontSize={21}>
            {department.departmentName}
          </TextComponent>
          <TextComponent fontSize={16}>
            {department.headDoctorName
              ? department.headDoctorName
              : 'Chưa cập nhật'}
          </TextComponent>
        </FlexComponent>

        <FlexComponent
          style={[
            styles.departmentInfoContainer,
            {alignItems: 'flex-end', flex: 0.3},
          ]}>
          <FlexComponent style={styles.statusContainer}>
            <EntypoIcon
              name="dot-single"
              size={20}
              color={department.deleted ? appColors.darkRed : appColors.green}
            />
            <TextComponent
              bold
              fontSize={12}
              color={department.deleted ? appColors.darkRed : appColors.green}>
              {department.deleted ? 'Ngừng hoạt động' : 'Còn hoạt động'}
            </TextComponent>
          </FlexComponent>
        </FlexComponent>

        <FlexComponent
          style={[
            styles.departmentInfoContainer,
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
              department.deleted ? (
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

        <DepartmentDialogComponent
          edit
          setIsEditing={setIsEditing}
          department={department}
          setModalVisible={setModalVisible}
          modalVisible={modalVisible}
          refreshList={refreshList}
          setRefreshList={setRefreshList}
        />

        <DepartmentAlertDialogComponent
          departmentId={department.departmentId}
          deleted={department.deleted}
          setShowAlertDialog={setShowAlertDialog}
          refreshList={refreshList}
          setRefreshList={setRefreshList}
          showAlertDialog={showAlertDialog}
        />
      </ContainerComponent>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  departmentItemContainer: {
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
  departmentInfoContainer: {
    justifyContent: 'center',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default DepartmentItemComponent;
