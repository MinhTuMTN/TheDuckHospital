import {View, Text, StyleSheet, Modal, Alert} from 'react-native';
import React from 'react';
import {appInfo} from '../constants/appInfo';
import {TextComponent} from '.';

interface PopupComponentProps {
  visible: boolean;
}
const PopupComponent = (props: PopupComponentProps) => {
  const {visible} = props;
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => Alert.alert('Close modal')}>
      <View style={styles.container}>
        <TextComponent>PopUp</TextComponent>
      </View>
    </Modal>
  );
};

export default PopupComponent;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 2,
    width: '90%',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});
