import axios from "axios";
import https from 'https'

export const axiosInstance = axios.create({
  baseURL: "https://naijacinemas.netlify.app/",
  httpsAgent: new https.Agent({ keepAlive: true }),
});


export const tokenInstance = (TOKEN:string) => axios.create({
  baseURL: "https://naijacinemas.netlify.app/",
  httpsAgent: new https.Agent({ keepAlive: true }),
  headers: {  token: `Bearer ${TOKEN}` },
});