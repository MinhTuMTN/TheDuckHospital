import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import {StyleSheet} from 'react-native';
import {TextComponent} from '../components';
import {appColors} from '../constants/appColors';
import {appInfo} from '../constants/appInfo';
import {View} from 'react-native';

interface ToastProviderProps {
  children: React.ReactNode;
}
interface ToastContextProps {
  showToast: (message: string) => void;
}
interface ToastProps {
  message: string;
}
const ToastContext = createContext<ToastContextProps>({
  showToast: () => {},
});
export function useToast() {
  return useContext(ToastContext);
}

const Toast = (props: ToastProps) => {
  const {message} = props;
  return (
    <View style={styles.toastContainer}>
      {message && (
        <View style={styles.toast}>
          <TextComponent style={styles.toastMessage}>{message}</TextComponent>
        </View>
      )}
    </View>
  );
};

const ToastProvider = (props: ToastProviderProps) => {
  const [message, setMessage] = useState<string>('');
  const showToast = useCallback((message: string) => {
    setMessage(message);
  }, []);

  useEffect(() => {
    if (message) {
      const timeout = setTimeout(() => {
        setMessage('');
      }, 1500);
      return () => clearTimeout(timeout);
    }
  }, [message]);

  const value = {
    showToast,
  };

  return (
    <ToastContext.Provider value={value}>
      {props.children}
      <Toast message={message} />
    </ToastContext.Provider>
  );
};

const styles = StyleSheet.create({
  toastContainer: {
    position: 'absolute',
    bottom: 0,
    top: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toast: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 16,
    borderRadius: 10,
  },
  toastMessage: {
    color: appColors.white,
    textAlign: 'center',
    maxWidth: appInfo.size.width * 0.7,
  },
});

export default ToastProvider;
