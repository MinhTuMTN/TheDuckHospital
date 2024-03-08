import React, {useState} from 'react';
import {Dimensions, StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  ContainerComponent,
  FlexComponent,
  InputComponent,
  TextComponent,
} from '../../../components';
import {appColors} from '../../../constants/appColors';
import Icon from 'react-native-vector-icons/AntDesign';
import StaffItemComponent from '../../../components/admin/staffManagementScreen/StaffItemComponent';
import {ScrollView} from '@gluestack-ui/themed';
import Popover from 'react-native-popover-view';
import {Filter} from 'lucide-react-native';
import ButtonComponent from '../../../components/ButtonComponent';
import StaffDialogComponent from '../../../components/admin/staffManagementScreen/StaffDialogComponent';

function StaffListScreen() {
  const [showPopover, setShowPopover] = useState(false);
  const [selected, setSelected] = useState('all');
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };
  return (
    <ContainerComponent>
      <ContainerComponent style={styles.container}>
        <TextComponent bold fontSize={28} style={styles.listLabel}>
          Danh sách nhân viên
        </TextComponent>
        <ButtonComponent
          containerStyles={styles.addButtonContainer}
          onPress={toggleModal}>
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
          placeholder="Tìm kiếm nhân viên..."
          startIcon={
            <Icon name="search1" size={20} color={appColors.primary} />
          }
          containerStyle={{
            paddingLeft: 20,
            marginRight: 10,
            flex: 0.88,
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

        <ContainerComponent style={styles.filterIcon}>
          <Popover
            isVisible={showPopover}
            onRequestClose={() => setShowPopover(false)}
            backgroundStyle={{opacity: 0}}
            popoverStyle={{height: 120, width: 400}}
            arrowSize={{width: 0, height: 0}}
            from={
              <TouchableOpacity onPress={() => setShowPopover(true)}>
                <Filter size={22} color={appColors.black} />
              </TouchableOpacity>
            }>
            <FlexComponent style={styles.filterContainer}>
              <ButtonComponent
                containerStyles={
                  selected === 'all' ? styles.selectedButton : styles.button
                }
                onPress={() => {
                  setSelected('all');
                  setShowPopover(false);
                }}>
                <TextComponent
                  style={
                    selected === 'all'
                      ? styles.selectedButtonText
                      : styles.buttonText
                  }>
                  Tất cả
                </TextComponent>
              </ButtonComponent>

              <ButtonComponent
                containerStyles={
                  selected === 'doctor' ? styles.selectedButton : styles.button
                }
                onPress={() => {
                  setSelected('doctor');
                  setShowPopover(false);
                }}>
                <TextComponent
                  style={
                    selected === 'doctor'
                      ? styles.selectedButtonText
                      : styles.buttonText
                  }>
                  Bác sĩ
                </TextComponent>
              </ButtonComponent>

              <ButtonComponent
                containerStyles={
                  selected === 'test' ? styles.selectedButton : styles.button
                }
                onPress={() => {
                  setSelected('test');
                  setShowPopover(false);
                }}>
                <TextComponent
                  style={
                    selected === 'test'
                      ? styles.selectedButtonText
                      : styles.buttonText
                  }>
                  Xét nghiệm
                </TextComponent>
              </ButtonComponent>

              <ButtonComponent
                containerStyles={
                  selected === 'nurse' ? styles.selectedButton : styles.button
                }
                onPress={() => {
                  setSelected('nurse');
                  setShowPopover(false);
                }}>
                <TextComponent
                  style={
                    selected === 'nurse'
                      ? styles.selectedButtonText
                      : styles.buttonText
                  }>
                  Điều dưỡng
                </TextComponent>
              </ButtonComponent>
            </FlexComponent>
          </Popover>
        </ContainerComponent>
      </ContainerComponent>

      <ScrollView style={styles.scrollViewContainer}>
        <StaffItemComponent />
        <StaffItemComponent />
        <StaffItemComponent />
        <StaffItemComponent />
        <StaffItemComponent />
        <StaffItemComponent />
        <StaffItemComponent />
        <StaffItemComponent />
        <StaffItemComponent />
        <StaffItemComponent />
      </ScrollView>

      <StaffDialogComponent
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
      />
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
  filterContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  button: {
    borderRadius: 15,
    backgroundColor: appColors.white,
    shadowColor: appColors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "30%",
    marginTop: 15,
  },
  selectedButton: {
    borderRadius: 15,
    shadowColor: appColors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "30%",
    marginTop: 15,
  },
  buttonText: {
    color: appColors.primary,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 17,
  },
  selectedButtonText: {
    color: appColors.white,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 17,
  },
  filterIcon: {
    flex: 0.12,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: appColors.black,
    borderWidth: 1,
    paddingTop: 0,
    marginRight: 15,
    height: 45,
    width: 60,
    borderRadius: Dimensions.get('window').width * 0.5,
  },
  searchContainer: {
    flex: 0.2,
    paddingTop: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollViewContainer: {
    flex: 0.7,
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  listLabel: {
    paddingLeft: 20,
    paddingRight: 10,
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

export default StaffListScreen;
