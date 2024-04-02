import {
  Select,
  SelectBackdrop,
  SelectContent,
  SelectIcon,
  SelectPortal,
  SelectTrigger,
} from '@gluestack-ui/themed';
import {ChevronDownIcon, ChevronRight, Search} from 'lucide-react-native';
import React, {memo, useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  AnimatableNumericValue,
  ColorValue,
  DimensionValue,
  FlatList,
  StyleProp,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {FlexComponent, InputComponent, TextComponent} from '.';
import {appColors} from '../constants/appColors';
import {appInfo} from '../constants/appInfo';
import LoadingComponent from './LoadingComponent';

interface SelectComponentProps {
  options: string[] | any[];
  keyTitle?: string;
  value: string | any;
  onChange: (value: any) => void;
  isLoading?: boolean;
  isDisabled?: boolean;
  enableSearch?: boolean;
  placeholder?: string;
  placeholderColor?: ColorValue | undefined;
  selectTextColor?: ColorValue | undefined;
  selectTextSize?: number | undefined;
  placeholderSearch?: string;
  title?: string;
  selectInputStyle?: StyleProp<ViewStyle>;
  selectInputIcon?: any;
  width?: DimensionValue;
  size?: 'sm' | 'md' | 'lg' | 'xl' | undefined;
  flex?: number;
  marginTop?: DimensionValue | undefined;
  marginRight?: DimensionValue | undefined;
  marginBottom?: DimensionValue | undefined;
  marginLeft?: DimensionValue | undefined;
  margin?: DimensionValue | undefined;
  padding?: DimensionValue | undefined;
  paddingTop?: DimensionValue | undefined;
  paddingRight?: DimensionValue | undefined;
  paddingBottom?: DimensionValue | undefined;
  paddingLeft?: DimensionValue | undefined;
  selectIconColor?: ColorValue | undefined;
  borderRadius?: AnimatableNumericValue | undefined;
  borderColor?: ColorValue | undefined;
  error?: boolean;
  errorMessage?: string;
}

interface CustomSelectItemComponentProps {
  option: any;
  title?: string;
  onPress?: (value: string) => void;
}

const CustomSelectItemComponent = memo(
  (props: CustomSelectItemComponentProps) => {
    const {option, title, onPress} = props;

    return (
      <TouchableOpacity
        onPress={() => onPress && onPress(option)}
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingVertical: 8,
          paddingHorizontal: 8,
        }}>
        <TextComponent>{title}</TextComponent>
        <ChevronRight color={appColors.black} />
      </TouchableOpacity>
    );
  },
);

const SelectComponent = (props: SelectComponentProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [optionsToShow, setOptionsToShow] = useState<string[]>(props.options);
  const [searchText, setSearchText] = useState('');
  const {
    options,
    keyTitle = 'title',
    value,
    onChange,
    isLoading,
    isDisabled,
    enableSearch,
    placeholder,
    placeholderColor,
    selectTextColor,
    placeholderSearch,
    title,
    selectInputIcon,
    selectInputStyle,
    width,
    size = 'md',
    flex = 1,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    margin,
    padding,
    paddingTop,
    paddingRight,
    paddingBottom,
    paddingLeft,
    selectTextSize,
    selectIconColor,
    borderRadius,
    borderColor,
    error,
    errorMessage,
  } = props;

  const handleOnChange = useCallback(
    (value: any) => {
      onChange && onChange(value);
      setIsOpen(false);
    },
    [onChange],
  );
  const renderItem = useCallback(({item}: {item: any}) => {
    return (
      <CustomSelectItemComponent
        option={item}
        title={typeof item === 'string' ? item : item[keyTitle]}
        onPress={handleOnChange}
      />
    );
  }, []);
  const keyExtractor = useCallback(
    (item: any, index: any) =>
      typeof item === 'string'
        ? `${item}-${index}`
        : `${item[keyTitle]}-${index}`,
    [],
  );

  useEffect(() => {
    if (searchText === '') {
      setOptionsToShow(options);
    } else {
      let filteredOptions;
      if (typeof options[0] === 'string') {
        filteredOptions = options.filter(option =>
          option.toLowerCase().includes(searchText.toLowerCase()),
        );
      } else {
        filteredOptions = options.filter(option =>
          option[keyTitle].toLowerCase().includes(searchText.toLowerCase()),
        );
      }
      setOptionsToShow(filteredOptions);
    }
  }, [searchText, options]);

  return (
    <>
      <Select
        selectedValue={
          !value || typeof value === 'string' ? value : value[keyTitle]
        }
        isDisabled={isDisabled}
        style={{
          marginTop,
          marginRight,
          marginBottom,
          marginLeft,
          margin,
          padding,
          paddingTop,
          paddingRight,
          paddingBottom,
          paddingLeft,
        }}
        width={width}
        flex={width ? undefined : flex}>
        <SelectTrigger
          variant="outline"
          size={size}
          style={{
            borderRadius: borderRadius || 10,
            borderColor: borderColor,
          }}
          onPress={() => setIsOpen(true)}>
          <View
            style={[
              {
                borderRadius: borderRadius || 10,
                backgroundColor: appColors.white,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                height: '100%',
                width: '100%',
                paddingHorizontal: 4,
              },
              selectInputStyle,
            ]}>
            <View style={{flex: 1}}>
              <TextComponent
                numberOfLines={1}
                ellipsizeMode="tail"
                color={!value ? placeholderColor : selectTextColor}
                fontSize={selectTextSize || 14}>
                {!value
                  ? placeholder
                  : typeof value === 'string'
                  ? value
                  : value[keyTitle]}
              </TextComponent>
            </View>
            <SelectIcon>
              {selectInputIcon || (
                <ChevronDownIcon
                  width={20}
                  height={20}
                  color={selectIconColor || '#000000'}
                />
              )}
            </SelectIcon>
          </View>
        </SelectTrigger>
        <SelectPortal isOpen={isOpen}>
          <SelectBackdrop onPress={() => setIsOpen(false)} />
          <SelectContent
            style={{
              paddingVertical: 16,
              flexDirection: 'row',
            }}>
            <FlexComponent style={{flex: 1}} alignItems="center">
              <TextComponent
                textAlign="center"
                bold
                uppercase
                fontSize={18}
                color={appColors.textGray}>
                {title}
              </TextComponent>

              {enableSearch && (
                <InputComponent
                  value={searchText}
                  onChangeText={text => setSearchText(text)}
                  startIcon={<Search color={appColors.primary} />}
                  placeholder={placeholderSearch}
                  variant="rounded"
                  _inputContainerStyle={{
                    marginTop: 16,
                    borderWidth: 0,
                    width: '100%',
                    backgroundColor: 'rgba(211,211,211,0.31)',
                  }}
                />
              )}

              <LoadingComponent
                styles={{
                  width: '100%',
                }}>
                {isLoading ? (
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginVertical: 40,
                    }}>
                    <ActivityIndicator size="large" color={appColors.primary} />
                  </View>
                ) : (
                  <FlatList
                    showsVerticalScrollIndicator={true}
                    indicatorStyle="black"
                    data={optionsToShow}
                    keyExtractor={keyExtractor}
                    renderItem={renderItem}
                    style={{
                      maxHeight: appInfo.size.height * 0.4,
                      marginTop: enableSearch ? 0 : 24,
                    }}
                  />
                )}
              </LoadingComponent>
            </FlexComponent>
          </SelectContent>
        </SelectPortal>
      </Select>
      {error && errorMessage && (
        <TextComponent
          color={appColors.error}
          fontSize={12}
          style={{
            paddingTop: 10,
            paddingLeft: 5,
          }}>
          {errorMessage}
        </TextComponent>
      )}
    </>
  );
};

export default SelectComponent;
