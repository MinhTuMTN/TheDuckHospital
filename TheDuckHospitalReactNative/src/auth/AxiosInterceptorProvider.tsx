import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import {useAuth} from './AuthProvider';
import axios from 'axios';
import axiosInstance from '../services/AxiosInstance';

interface AxiosInterceptorProviderProps {
  children: React.ReactNode;
}

const AxiosInterceptorProvider = (props: AxiosInterceptorProviderProps) => {
  const auth = useAuth();
  useEffect(() => {
    const interceptor = axiosInstance.interceptors.response.use(
      response => response,
      async error => {
        if (error.response?.status === 401) {
          auth.logout();
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
