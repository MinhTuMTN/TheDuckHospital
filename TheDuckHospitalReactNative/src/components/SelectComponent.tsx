import {
  Icon,
  Select,
  SelectBackdrop,
  SelectContent,
  SelectIcon,
  SelectInput,
  SelectPortal,
  SelectTrigger,
} from '@gluestack-ui/themed';
import {ChevronDownIcon, ChevronRight, Search} from 'lucide-react-native';
import React, {memo, useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
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

interface SelectComponentProps {
  options: string[] | any[];
  keyTitle?: string;
  value: string;
  onChange: (value: string) => void;
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
  } = props;

  const handleOnChange = useCallback(
    (value: any) => {
      onChange && onChange(value);
      setIsOpen(false);
    },
    [onChange],
  );
  const renderItem = useCallback(
    ({item}: {item: any}) => (
      <CustomSelectItemComponent
        option={item}
        title={typeof item === 'string' ? item : item[keyTitle]}
        onPress={handleOnChange}
      />
    ),
    [],
  );
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
    <Select
      selectedValue={typeof value === 'string' ? value : value[keyTitle]}
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
      flex={flex}>
      <SelectTrigger
        style={[
          {
            borderRadius: 10,
            paddingHorizontal: 8,
          },
          selectInputStyle,
        ]}
        variant="outline"
        size={size}
        onPress={() => setIsOpen(true)}>
        <SelectInput
          placeholder={placeholder || 'Select Option'}
          placeholderTextColor={placeholderColor}
          fontSize={selectTextSize || 14}
          style={{color: selectTextColor, textAlign: 'left', flex: 1}}
        />
        <SelectIcon>
          {selectInputIcon || <Icon as={ChevronDownIcon} />}
        </SelectIcon>
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
                  width: '100%',
                  maxHeight: appInfo.size.height * 0.4,
                  marginTop: enableSearch ? 0 : 24,
                }}
              />
            )}
          </FlexComponent>
        </SelectContent>
      </SelectPortal>
    </Select>
  );
};

export default SelectComponent;
