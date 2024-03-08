import React from 'react';
import {Dimensions, StyleSheet, TouchableOpacity} from 'react-native';
import {
  ContainerComponent,
  FlexComponent,
  InputComponent,
  TextComponent,
} from '../../../components';
import {appColors} from '../../../constants/appColors';
import Icon from 'react-native-vector-icons/AntDesign';
import PatientItemComponent from '../../../components/admin/patientManagementScreen/PatientItemComponent';
import {ScrollView} from '@gluestack-ui/themed';
import Popover from 'react-native-popover-view';
import {Filter} from 'lucide-react-native';
import ButtonComponent from '../../../components/ButtonComponent';

function PatientListScreen() {
  return (
    <ContainerComponent>
      <ContainerComponent style={styles.container}>
        <TextComponent bold fontSize={32} style={styles.listLabel}>
          Danh sách bệnh nhân
        </TextComponent>
      </ContainerComponent>

      <ContainerComponent style={styles.searchContainer}>
        <InputComponent
          size="md"
          placeholder="Tìm kiếm bệnh nhân..."
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
        <PatientItemComponent />
        <PatientItemComponent />
        <PatientItemComponent />
        <PatientItemComponent />
        <PatientItemComponent />
        <PatientItemComponent />
        <PatientItemComponent />
        <PatientItemComponent />
        <PatientItemComponent />
        <PatientItemComponent />
      </ScrollView>
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
});

export default PatientListScreen;
