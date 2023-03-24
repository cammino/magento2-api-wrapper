import { AxiosInstance, AxiosError, AxiosResponse, AxiosRequestConfig } from 'axios'

interface Magento2ApiConfig {
  url: string;
  consumerKey?: string;
  consumerSecret?: string;
  accessToken?: string;
  tokenSecret?: string;
}

interface Magento2ApiConstructorOptions {
  api: Magento2ApiConfig;
  axios?: AxiosRequestConfig;
}

interface Magento2ApiAxiosRequestConfig extends AxiosRequestConfig {
  storeCode?: string
}

interface Magento2ApiAxiosResponse<T = any> extends AxiosResponse<T> {
  magento: Magento2Api
}

export default class Magento2Api {
  constructor (config: Magento2ApiConstructorOptions);
  axios: AxiosInstance;
  baseUrl: string;
  getStoreBaseUrl (storeCode: string): string;
  request<T = any> (config: AxiosRequestConfig): Promise<T>;
  get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
  delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
  head<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
  options<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
  post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
  put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
  patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
}

interface Magento2ApiError extends AxiosError {
  magento: Magento2Api;
}
