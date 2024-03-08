import React, { useState } from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {
  ContainerComponent,
  InputComponent,
  TextComponent,
} from '../../../components';
import ButtonComponent from '../../../components/ButtonComponent';
import {appColors} from '../../../constants/appColors';
import Icon from 'react-native-vector-icons/AntDesign';
import MedicineItemComponent from '../../../components/admin/medicineManagementScreen/MedicineItemComponent';
import {ScrollView} from '@gluestack-ui/themed';
import MedicineDialogComponent from '../../../components/admin/medicineManagementScreen/MedicineDialogComponent';

function MedicineListScreen() {
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  }
  
  return (
    <ContainerComponent>
      <ContainerComponent style={styles.container}>
        <TextComponent bold fontSize={32} style={styles.listLabel}>
          Danh sách thuốc
        </TextComponent>
        <ButtonComponent containerStyles={styles.addButtonContainer} onPress={toggleModal}>
          <View style={styles.buttonContent}>
            <TextComponent
              bold
              fontSize={18}
              color={appColors.textPrimary}
              style={styles.addButtonText}>
              Thêm
            </TextComponent>
            <Icon name="plus" size={20} color={appColors.textPrimary} />
          </View>
        </ButtonComponent>
      </ContainerComponent>

      <ContainerComponent style={styles.searchContainer}>
        <InputComponent
          size="md"
          placeholder="Tìm kiếm thuốc..."
          startIcon={
            <Icon name="search1" size={20} color={appColors.primary} />
          }
          containerStyle={{
            paddingHorizontal: 20,
          }}
          inputContainerStyle={{
            backgroundColor: appColors.white,
            borderColor: appColors.black,
          }}
          inputContainerFocusStyle={{
            backgroundColor: appColors.white,
            borderColor: appColors.primary,
          }}
          variant="rounded"
        />
      </ContainerComponent>

      <ScrollView style={styles.scrollViewContainer}>
        <MedicineItemComponent />
        <MedicineItemComponent />
        <MedicineItemComponent />
        <MedicineItemComponent />
        <MedicineItemComponent />
        <MedicineItemComponent />
        <MedicineItemComponent />
        <MedicineItemComponent />
        <MedicineItemComponent />
        <MedicineItemComponent />
      </ScrollView>

      <MedicineDialogComponent setModalVisible={setModalVisible} modalVisible={modalVisible} />
    </ContainerComponent>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingTop: 0,
  },
  searchContainer: {
    flex: 0.2,
    paddingTop: 0,
    justifyContent: 'center',
  },
  scrollViewContainer: {
    flex: 0.7,
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  listLabel: {
    marginLeft: 20,
    marginRight: 25,
  },
  addButtonContainer: {
    backgroundColor: appColors.white,
    borderWidth: 3,
    borderRadius: 15,
    borderColor: appColors.primary,
  },
  addButtonText: {
    marginRight: 5,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default MedicineListScreen;
