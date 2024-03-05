import axios from 'axios';
// import Realm from 'realm';

interface ResultProps {
  success: boolean;
  data: any;
  error: any;
  statusCode: number;
}

var qs = require('qs');
const axiosInstance = axios.create({
  baseURL: 'https://tb7drp6q-8080.asse.devtunnels.ms/api',
  // baseURL: 'https://z58krthx-8080.asse.devtunnels.ms/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': '69420',
    // Authorization: "Bearer " + Realm.Sync.User.current?.accessToken,
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

  // console.log('url', url);

  if (timeout) {
    axiosInstance.defaults.timeout = timeout;
  } else {
    axiosInstance.defaults.timeout = 30000;
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
    result.error = error.message;
    result.statusCode = error.response?.status;
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
