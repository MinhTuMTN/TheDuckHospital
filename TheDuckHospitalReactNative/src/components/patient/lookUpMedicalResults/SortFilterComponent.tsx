import {ArrowDownWideNarrow} from 'lucide-react-native';
import React, {useMemo} from 'react';
import {appColors} from '../../../constants/appColors';
import SelectComponent from '../../SelectComponent';
import {onChange} from '@gluestack-style/react';

interface SortFilterComponentProps {
  onChange?: (sort: 'DESC' | 'ASC') => void;
}

const SortFilterComponent = (props: SortFilterComponentProps) => {
  const {onChange} = props;
  const [sort, setSort] = React.useState<'DESC' | 'ASC'>('DESC');
  const data = useMemo(() => {
    return [
      {
        label: 'Ngày mới nhất',
        value: 'DESC',
      },
      {
        label: 'Ngày cũ nhất',
        value: 'ASC',
      },
    ];
  }, []);
  return (
    <>
      <SelectComponent
        options={data}
        keyTitle="label"
        value={null}
        size="md"
        onChange={seletedSort => {
          setSort(seletedSort.value);
          onChange && onChange(seletedSort.value);
        }}
        selectInputStyle={{
          backgroundColor: appColors.white,
        }}
        borderColor={appColors.white}
        marginRight={2}
        selectIconColor={appColors.black}
        placeholder={sort === 'DESC' ? 'Mới nhất' : 'Cũ nhất'}
        triggerIcon={
          <ArrowDownWideNarrow
            color={appColors.black}
            size={18}
            style={{marginRight: 4}}
          />
        }
        placeholderColor={appColors.black}
        title="Sắp xếp"
        selectTextSize={16}
        iconSize={16}
        flex={1}
      />
    </>
  );
};

export default SortFilterComponent;
