import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import {Space, TextComponent} from '../..';
import LineInfoComponent from '../../LineInfoComponent';
import {CaseUpper} from 'lucide-react-native';
import {Stethoscope} from '../../../assets/svgs';

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
          fontWeight="700"
          textAlign="justify"
          fontSize={14}>
          pgs ts bs. Bùi Hồng Thiên Anh
        </TextComponent>
        <LineInfoComponent
          startIcon={
            <Stethoscope width={20} height={20} style={{marginRight: 8}} />
          }
          label="Chuyên khoa:"
          labelColor={'#8F8F8F'}
          value="Nhi khoa"
          valueColor={'#4F4F4F'}
          valueStyles={{
            textTransform: 'uppercase',
            fontWeight: '500',
            fontSize: 13,
          }}
        />
        <LineInfoComponent
          label="Ngày khám:"
          labelColor={'#8F8F8F'}
          value="Thứ 2, Thứ 3"
          valueColor={'#4F4F4F'}
        />
        <LineInfoComponent
          label="Giới tính:"
          labelColor={'#8F8F8F'}
          value="Nữ"
          valueColor={'#4F4F4F'}
        />
        <LineInfoComponent
          label="Phí khám:"
          labelColor={'#8F8F8F'}
          value="150.000đ"
          valueColor={'#00A3E7'}
          valueStyles={{fontWeight: '500', fontSize: 13}}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flexDirection: 'row',
    width: '95%',
    borderRadius: 10,
    elevation: 16,
    marginBottom: 16,
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 15,
  },
  textView: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: 10,
    rowGap: 4,
  },
});

export default DoctorInfoComponent;
