import {ChevronRight} from 'lucide-react-native';
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {FlexComponent} from '../..';
import {appColors} from '../../../constants/appColors';
import LineInfoComponent from '../../LineInfoComponent';

const InfoProfileItemComponent = () => {
  return (
    <TouchableOpacity style={styles.container}>
      <LineInfoComponent
        startIcon={
          <Ionicons
            name="information-circle"
            size={24}
            style={{marginRight: 5}}
            color={appColors.textLight}
          />
        }
        label="Nguyễn Thị Ngọc Ánh"
        labelUppercase
        labelStyles={{
          fontSize: 18,
          fontWeight: '700',
          color: appColors.textLight,
        }}
      />
      <FlexComponent direction="row">
        <LineInfoComponent
          startIcon={
            <MaterialCommunityIcons
              name="card-bulleted-settings-outline"
              size={18}
              style={{marginRight: 5}}
              color={appColors.textLight}
            />
          }
          label="N12-123456"
          labelStyles={{
            fontSize: 18,
            fontWeight: '500',
            color: appColors.black,
          }}
          containerFlex={1}
        />
        <LineInfoComponent
          startIcon={
            <FontAwesome
              name="mobile-phone"
              size={18}
              style={{marginRight: 5}}
              color={appColors.textLight}
            />
          }
          label="037****123"
          labelUppercase
          labelStyles={{
            fontSize: 18,
            fontWeight: '500',
            color: appColors.black,
          }}
          containerFlex={1}
        />
      </FlexComponent>

      <View style={styles.buttonNext}>
        <ChevronRight size={28} color={appColors.textLight} />
      </View>
    </TouchableOpacity>
  );
};

export default InfoProfileItemComponent;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'white',
    borderColor: appColors.frameColor1,
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: 'column',
    elevation: 7,
  },
  buttonNext: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
});
