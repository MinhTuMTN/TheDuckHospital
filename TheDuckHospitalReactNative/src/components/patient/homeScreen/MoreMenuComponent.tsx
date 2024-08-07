import {X} from 'lucide-react-native';
import React, {useEffect} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {appInfo} from '../../../constants/appInfo';
import MoreMenuItemComponent from './MoreMenuItemComponent';

interface MoreMenuComponentProps {
  onClose: () => void;
  show: boolean;
}

const items = [
  {
    text: 'homeScreen.makeAppointmentNoNewLine',
    image: require('../../../assets/images/appointment.png'),
    screenNavigate: 'ChooseDoctorsScreen',
  },
  {
    text: 'homeScreen.lookupMedicalResultNoNewLine',
    image: require('../../../assets/images/loupe.png'),
    screenNavigate: 'AllPatientProfilesScreen',
  },
  {
    text: 'homeScreen.payHospitalFeeNoNewLine',
    image: require('../../../assets/images/payment.png'),
    screenNavigate: 'EnterHospitalPaymentCodeScreen',
  },
  {
    text: 'homeScreen.medicineReminderNoNewLine',
    image: require('../../../assets/images/animal.png'),
    screenNavigate: 'MedicineRemiderNavigator',
  },
  {
    text: 'homeScreen.quickSupport',
    image: require('../../../assets/images/chat.png'),
    screenNavigate: 'ChatScreen',
  },
  {
    text: 'homeScreen.instructionBooking',
    image: require('../../../assets/images/instructions.png'),
  },
  {
    text: 'homeScreen.bookingViaHotline',
    image: require('../../../assets/images/customer-support.png'),
  },
];

const initOffset = -200;

const MoreMenuComponent = (props: MoreMenuComponentProps) => {
  const {onClose, show} = props;

  const [showMoreMenu, setShowMoreMenu] = React.useState(false);

  const offsetValue = useSharedValue(initOffset);
  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{translateY: offsetValue.value}],
  }));

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;
    if (show) {
      setShowMoreMenu(true);
      offsetValue.value = withSpring(0, {duration: 1000});
    } else {
      offsetValue.value = withSpring(initOffset, {duration: 1000});

      timeoutId = setTimeout(() => {
        setShowMoreMenu(false);
      }, 200);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [show]);

  return (
    showMoreMenu && (
      <Animated.View style={[styles.container, animatedStyles]}>
        {items.map((item, index) => {
          return (
            <MoreMenuItemComponent
              key={index}
              text={item.text}
              image={item.image}
              screenNavigate={item.screenNavigate}
            />
          );
        })}

        <TouchableOpacity
          onPress={onClose}
          style={{
            marginTop: 16,
          }}>
          <X size={50} color={'#fff'} />
        </TouchableOpacity>
      </Animated.View>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: '15%',
    backgroundColor: 'rgba(95, 95, 95, 0.8)',
    zIndex: 0,
    position: 'absolute',
    top: 0,
    left: 0,
    width: appInfo.size.width,
    height: appInfo.size.height + 1000,
  },
});

export default MoreMenuComponent;
