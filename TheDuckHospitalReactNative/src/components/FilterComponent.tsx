import {View, FlatList, TouchableOpacity, ColorValue} from 'react-native';
import React from 'react';
import {StyleSheet} from 'react-native';
import {appColors} from '../constants/appColors';
import {TextComponent} from '.';

interface FilterComponentProps {
  items: string[];
  value: string;
  onChange: (value: string) => void;
  backgroundColor?: ColorValue | undefined;
}

const FilterItem = (props: {
  item: string;
  value: string;
  onChange: (value: string) => void;
}) => {
  const {item, value, onChange} = props;
  return (
    <TouchableOpacity
      onPress={() => {
        onChange(item);
      }}>
      <View style={[styles.item, item === value && styles.itemActive]}>
        <TextComponent
          color={appColors.textDarker}
          fontWeight="700"
          fontSize={14}>
          {item}
        </TextComponent>
      </View>
    </TouchableOpacity>
  );
};

const FilterComponent = (props: FilterComponentProps) => {
  const {items, value, onChange, backgroundColor} = props;
  return (
    <View
      style={{
        paddingHorizontal: 16,
        paddingVertical: 16,
        backgroundColor: backgroundColor || appColors.backgroundGray,
      }}>
      <FlatList
        data={items}
        contentContainerStyle={{
          alignItems: 'center',
        }}
        horizontal
        keyExtractor={(item, index) => `${item}-${index}`}
        renderItem={({item}) => (
          <FilterItem item={item} value={value} onChange={onChange} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderColor: appColors.primary,
    borderWidth: 2,
    borderRadius: 100,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemActive: {
    backgroundColor: appColors.lightPrimary,
    borderWidth: 2,
    borderColor: appColors.lightPrimary,
  },
});

export default FilterComponent;
