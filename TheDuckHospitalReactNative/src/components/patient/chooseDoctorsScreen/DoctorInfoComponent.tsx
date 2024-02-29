import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import {TextComponent} from '../..';

const DoctorInfoComponent = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../../assets/images/avatarDoctor.jpg')}
        alt="Logo"
        style={{
          width: 100,
          height: 100,
          borderRadius: 50,
        }}
      />
      <TextComponent uppercase>pgs ts bs. Bùi Hồng Thiên Anh</TextComponent>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '90%',
    height: 'auto',
    borderRadius: 10,
    backgroundColor: '#d35555',
    elevation: 10,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
});

export default DoctorInfoComponent;
