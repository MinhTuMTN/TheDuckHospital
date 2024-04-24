import {List} from 'lucide-react-native';
import React, {useEffect} from 'react';
import {appColors} from '../../../constants/appColors';
import SelectComponent from '../../SelectComponent';
import {getAllMedicalTestTypes} from '../../../services/medicalTestServices';
import {onChange} from '@gluestack-style/react';

interface TestTypeFilterComponentProps {
  onChange?: (serviceId: number) => void;
}

const TestTypeFilterComponent = (props: TestTypeFilterComponentProps) => {
  const {onChange} = props;
  const [medicalTestTypes, setMedicalTestTypes] = React.useState<any>([]);
  const [selectedMedicalTestType, setSelectedMedicalTestType] =
    React.useState<any>({
      serviceName: 'Tất cả loại xét nghiệm',
      serviceId: -1,
    });
  useEffect(() => {
    const handleGetMedicalTestTypes = async () => {
      const response = await getAllMedicalTestTypes();
      if (response.success)
        setMedicalTestTypes([
          {
            serviceName: 'Tất cả loại xét nghiệm',
            serviceId: -1,
          },
          ...response.data.data,
        ]);
    };
    handleGetMedicalTestTypes();
  }, []);
  return (
    <>
      <SelectComponent
        options={medicalTestTypes}
        value={selectedMedicalTestType}
        keyTitle="serviceName"
        size="md"
        onChange={seletedMedicalTest => {
          setSelectedMedicalTestType(seletedMedicalTest);
          onChange && onChange(seletedMedicalTest.serviceId);
        }}
        selectInputStyle={{
          backgroundColor: appColors.white,
        }}
        borderColor={appColors.white}
        marginRight={0}
        selectIconColor={appColors.black}
        title={'Loại xét nghiệm'}
        triggerIcon={
          <List color={appColors.black} size={18} style={{marginRight: 4}} />
        }
        placeholderColor={appColors.black}
        placeholder="Loại xét nghiệm"
        selectTextSize={16}
        iconSize={16}
        flex={3}
      />
    </>
  );
};

export default TestTypeFilterComponent;
