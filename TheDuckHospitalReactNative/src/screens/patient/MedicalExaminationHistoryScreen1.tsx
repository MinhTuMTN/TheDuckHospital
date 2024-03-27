import {MoreHorizontal} from 'lucide-react-native';
import {ContainerComponent, Header} from '../../components';
import {appColors} from '../../constants/appColors';

const MedicalExaminationHistory1 = () => {
  return (
    <ContainerComponent paddingTop={0}>
      <Header
        title={'Lịch sử khám bệnh'}
        titleSize={19}
        showBackButton={true}
        paddingTop={35}
        noBackground
        titleColor={appColors.textDarker}
        backButtonColor={appColors.textDarker}
        backgroundColor={appColors.white}
        icon={<MoreHorizontal size={30} color={appColors.textDarker} />}
      />
    </ContainerComponent>
  );
};

export default MedicalExaminationHistory1;
