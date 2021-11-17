/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import axios, { AxiosInstance } from 'axios'
// import { authService } from './auth'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
  }
}

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const api = axios.create({ baseURL: 'http://127.0.0.1:999/graphql' })

// eslint-disable-next-line @typescript-eslint/no-explicit-any
api.interceptors.request.use((config: any) => {
  // const accessToken = await authService.getAccessToken() as string
  const accessToken = '123'
  config.headers.common.Authorization = `Bearer ${accessToken}`
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return config
})

export { api }
