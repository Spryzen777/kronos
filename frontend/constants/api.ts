const BASE_URL = 'http://192.168.0.102:3000/api'  // ← change IP

export const API = {
  login: `${BASE_URL}/auth/login`,
  register: `${BASE_URL}/auth/register`,
  me: `${BASE_URL}/user/me`,
  walletBalance: `${BASE_URL}/wallet/balance`,
  addMoney: `${BASE_URL}/wallet/add-money`,
  sendTransfer: `${BASE_URL}/transfer/send`,
  transferHistory: `${BASE_URL}/transfer/history`,
  chat: `${BASE_URL}/chat/message`,
}