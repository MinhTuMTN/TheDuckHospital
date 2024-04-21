import React, {useEffect} from 'react';
import axiosInstance from '../services/AxiosInstance';
import {ignoreAxiosIntercepter} from '../services/ignoreAxiosIntercepter';
import { useAuth } from './AuthHooks';

interface AxiosInterceptorProviderProps {
  children: React.ReactNode;
}

const AxiosInterceptorProvider = (props: AxiosInterceptorProviderProps) => {
  const auth = useAuth();

  useEffect(() => {
    const interceptor = axiosInstance.interceptors.response.use(
      response => response,
      async error => {
        // Retry if network error with max retry 3 times
        if (error.message === 'Network Error') {
          console.log('Retry ', error.config.retry);

          const retry = error.config.retry || 0;
          if (retry < 3) {
            error.config.retry = retry + 1;
            return axiosInstance.request(error.config);
          }
        }

        const errorURL = error.response?.request?.responseURL;
        if (errorURL && ignoreAxiosIntercepter.includes(errorURL)) {
          return Promise.reject(error);
        }

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
