import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import {useAuth} from './AuthProvider';
import axios from 'axios';
import axiosInstance from '../services/AxiosInstance';
import {ignoreAxiosIntercepter} from '../services/ignoreAxiosIntercepter';
import {useToast} from './ToastProvider';

interface AxiosInterceptorProviderProps {
  children: React.ReactNode;
}

const AxiosInterceptorProvider = (props: AxiosInterceptorProviderProps) => {
  const auth = useAuth();
  const toast = useToast();
  useEffect(() => {
    const interceptor = axiosInstance.interceptors.response.use(
      response => response,
      async error => {
        const errorURL = error.response.request.responseURL;
        if (ignoreAxiosIntercepter.includes(errorURL)) {
          return Promise.reject(error);
        }

        if (error.response?.status === 401) {
          auth.logout();
          toast.showToast('Phiên đăng nhập hết hạn, vui lòng đăng nhập lại');
        }
        return Promise.reject(error);
      },
    );

    return () => {
      axiosInstance.interceptors.response.eject(interceptor);
    };
  }, []);
  return props.children;
};

export default AxiosInterceptorProvider;
