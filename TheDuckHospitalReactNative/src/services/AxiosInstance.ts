import axios from 'axios';
import axiosRetry from 'axios-retry';

interface ResultProps {
  success: boolean;
  data: any;
  error: any;
  statusCode: number;
}

var qs = require('qs');
const axiosInstance = axios.create({
  baseURL: 'http://42.115.33.2:8081/api',
  // baseURL: 'https://tb7drp6q-8080.asse.devtunnels.ms/api',
  // baseURL: 'https://z58krthx-8080.asse.devtunnels.ms/api',
  timeout: 3000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const updateToken = (token: string) => {
  axiosInstance.defaults.headers['Authorization'] = 'Bearer ' + token;
};

const handleRequest = async (
  requestMethod: any,
  url: string,
  data?: any,
  headers?: any,
  params?: any,
  timeout?: number,
) => {
  const result: ResultProps = {
    success: false,
    data: null,
    error: null,
    statusCode: 200,
  };

  if (timeout) {
    axiosInstance.defaults.timeout = timeout;
  } else {
    axiosInstance.defaults.timeout = 3000;
  }

  try {
    let response = null;
    if (requestMethod === axiosInstance.get)
      response = await requestMethod(url, {
        headers: headers,
        params: params,
        paramsSerializer: (params: any) => {
          return qs.stringify(params, {arrayFormat: 'repeat'});
        },
      });
    else
      response = await requestMethod(url, data, {
        headers: headers,
        params: params,
      });

    result.success = true;
    result.data = response.data;
    result.statusCode = requestMethod.status;
  } catch (error: any) {
    if (error.response) {
      result.statusCode =
        error.response.data?.statusCode || error.response?.status;
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log('Axios has request error');
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }

    result.error = error.message;
    if (error.response) {
      result.error = error.response.data.message;
    }
  }

  return result;
};

export const get = async (url: string, params?: any, headers?: any) => {
  return handleRequest(axiosInstance.get, url, null, headers, params);
};

export const getNonAuth = async (url: string, params?: any, headers?: any) => {
  return handleRequest(
    axiosInstance.get,
    url,
    null,
    {...headers, Authorization: ''},
    params,
  );
};

export const post = async (
  url: string,
  data?: any,
  headers?: any,
  timeout?: number,
) => {
  return handleRequest(axiosInstance.post, url, data, headers, null, timeout);
};

export const postNonAuth = async (
  url: string,
  data?: any,
  headers?: any,
  timeout?: number,
) => {
  return handleRequest(
    axiosInstance.post,
    url,
    data,
    {...headers, Authorization: ''},
    null,
    timeout,
  );
};

export const put = async (
  url: string,
  data?: any,
  headers?: any,
  timeout?: number,
) => {
  return handleRequest(axiosInstance.put, url, data, headers, null, timeout);
};

export const del = async (url: string, params?: any, headers?: any) => {
  return handleRequest(axiosInstance.delete, url, {headers, params});
};

export default axiosInstance;
