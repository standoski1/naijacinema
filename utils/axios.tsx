import axios from "axios";
import https from 'https'

export const axiosInstance = axios.create({
  // baseURL: "http://localhost:3000/",
  baseURL: "https://naijacinemas.com/",
  timeout: 360000,
  httpsAgent: new https.Agent({ keepAlive: true }),
});


export const tokenInstance = (TOKEN:string) => axios.create({
  // baseURL: "http://localhost:3000/",
  baseURL: "https://naijacinemas.com/",
  timeout: 360000,
  httpsAgent: new https.Agent({ keepAlive: true }),
  headers: {  token: `Bearer ${TOKEN}` },
});