import React, {useState} from 'react';
import {Pressable, StyleSheet} from 'react-native';
import {ContainerComponent, FlexComponent, TextComponent} from '../..';
import {appColors} from '../../../constants/appColors';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import MaterialIconsIcon from 'react-native-vector-icons/MaterialIcons';
import {globalStyles} from '../../../styles/globalStyles';
import {ArchiveRestore} from 'lucide-react-native';
import ServiceDialogComponent from './ServiceDialogComponent';
import ServiceAlertDialogComponent from './ServiceAlertDialogComponent';
import {formatCurrency} from '../../../utils/currencyUtils';

const serviceTypes = [
  {
    value: 'MedicalExamination',
    label: 'Dịch vụ khám',
  },
  {
    value: 'MedicalTest',
    label: 'Dịch vụ xét nghiệm',
  },
  {
    value: 'Other',
    label: 'Dịch vụ khác',
  },
];

interface ServiceItemComponentProps {
  service: any;
  refreshList: boolean;
  setRefreshList: (refreshList: boolean) => void;
  setIsEditing: (isEditing: boolean) => void;
}

function ServiceItemComponent(props: ServiceItemComponentProps) {
  const {service, refreshList, setRefreshList, setIsEditing} = props;
  const [modalVisible, setModalVisible] = useState(false);
  const [showAlertDialog, setShowAlertDialog] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
    setIsEditing(true);
  };

  const toggleAlert = () => {
    setShowAlertDialog(!showAlertDialog);
  };
  return (
    <ContainerComponent style={styles.serviceItemContainer}>
      <FlexComponent style={[styles.serviceInfoContainer, {flex: 0.6}]}>
        <TextComponent bold fontSize={19}>
          {service.serviceName}
        </TextComponent>
        <TextComponent fontSize={16}>
          {serviceTypes.find(type => type.value === service.serviceType)?.label}
        </TextComponent>
      </FlexComponent>

      <FlexComponent
        style={[
          styles.serviceInfoContainer,
          {alignItems: 'flex-end', flex: 0.4},
        ]}>
        <TextComponent bold fontSize={18}>
          {`${formatCurrency(service.price)} VNĐ`}
        </TextComponent>
        <FlexComponent style={styles.statusContainer}>
          <EntypoIcon
            name="dot-single"
            size={20}
            color={service.deleted ? appColors.darkRed : appColors.green}
          />
          <TextComponent
            bold
            fontSize={12}
            color={service.deleted ? appColors.darkRed : appColors.green}>
            {service.deleted ? 'Ngừng hoạt động' : 'Còn hoạt động'}
          </TextComponent>
        </FlexComponent>
      </FlexComponent>

      <FlexComponent
        style={[
          styles.serviceInfoContainer,
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
            service.deleted ? (
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

      <ServiceDialogComponent
        edit
        setIsEditing={setIsEditing}
        service={service}
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
        refreshList={refreshList}
        setRefreshList={setRefreshList}
      />
      <ServiceAlertDialogComponent
        deleted={service.deleted}
        setShowAlertDialog={setShowAlertDialog}
        showAlertDialog={showAlertDialog}
        serviceId={service.serviceId}
        refreshList={refreshList}
        setRefreshList={setRefreshList}
      />
    </ContainerComponent>
  );
}

const styles = StyleSheet.create({
  serviceItemContainer: {
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
  serviceInfoContainer: {
    justifyContent: 'center',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default ServiceItemComponent;
