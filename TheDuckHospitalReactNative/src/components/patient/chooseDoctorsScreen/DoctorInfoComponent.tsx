import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import {Space, TextComponent} from '../..';
import LineInfoComponent from '../../LineInfoComponent';
import {CaseUpper} from 'lucide-react-native';

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
      <View style={styles.textView}>
        <TextComponent
          uppercase
          flexWrap="wrap"
          fontWeight="500"
          textAlign="justify">
          pgs ts bs. Bùi Hồng Thiên Anh
        </TextComponent>
        <LineInfoComponent
          label="Chuyên khoa:"
          labelColor={'#8F8F8F'}
          value="Nhi khoa"
          valueStyles={{textTransform: 'uppercase', fontWeight: '500'}}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '90%',
    borderRadius: 10,
    elevation: 1,
    marginBottom: 16,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  textView: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: 10,
  },
});

export default DoctorInfoComponent;
