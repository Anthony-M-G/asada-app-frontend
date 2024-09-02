import axios from "axios";
import { saveAs } from 'file-saver';

export const api = axios.create({
  baseURL: "https://asada-app-backend-production.up.railway.app",
});

axios.defaults.withCredentials = true;

export const login = async (username, cedula, password) => {
  try {
    const response = await api.post("/admin/login", { username, cedula, password },{
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}
export const getAllReceipts = async () => {
  try {
    const response = await api.get("/receipts",{
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export const updateReceipt = async (id) => {
  try {
    const response = await api.patch(`/receipts/${id}`,{
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export const verifyToken = async (token) => {
  try {
    const response = await api.post("/admin/verify-token", token,{
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}
export const logout = async () => {
  try {
    const response = await api.get("/admin/logout",{
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export const generatePdf = async (id) => {
  try {
    const response = await api.get(`/receipts/pdf/${id}`,{
      responseType: "blob",
      withCredentials: true,
    });
    // Crea un objeto Blob y usa file-saver para guardar el archivo
    const blob = new Blob([response.data], { type: 'application/pdf' });
    saveAs(blob, 'receipt.pdf'); // Puedes ajustar el nombre del archivo si lo deseas
  
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export const createReceipt = async (data) => {
  try {
   
    console.log(data);
    const response = await api.post("/receipts", data,{
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}
