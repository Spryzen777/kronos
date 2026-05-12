const BASE_URL = 'http://172.20.11.225:3000/api'
export const API = {
  login: `${BASE_URL}/auth/login`,
  register: `${BASE_URL}/auth/register`,
  me: `${BASE_URL}/user/me`,
  walletBalance: `${BASE_URL}/wallet/balance`,
  addMoney: `${BASE_URL}/wallet/add-money`,
  sendTransfer: `${BASE_URL}/transfer/send`,
  transferHistory: `${BASE_URL}/transfer/history`,
  chat: `${BASE_URL}/chat/message`,
  rates: `${BASE_URL}/wallet/rates`,
}