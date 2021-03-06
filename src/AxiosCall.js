import axios from "axios";
import https from "https";
const api = axios.create({
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
  baseURL: `http://localhost:38305/api`,
});

export default api;
