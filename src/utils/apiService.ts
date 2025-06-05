import axios from "axios";
import { axiosInstance } from "./axiosInstance";
import { API_URL } from "./enum/constantes";

// GET
export async function httpGet<T>(ruta: string): Promise<T | null> {
  try {
    const response = await axios.get<T>(`${API_URL}${ruta}`);
    return response.data;
  } catch (error) {
    console.error("GET - Error:", error);
    return null;
  }
}

export async function httpGetTok<T>(ruta: string): Promise<T | null> {
  try {
    const response = await axiosInstance.get<T>(ruta);
    return response.data;
  } catch (error) {
    console.error("GET - Error:", error);
    return null;
  }
}

export async function httpGetImageTok(ruta: string): Promise<string | null> {
  try {
    const response = await axiosInstance.get(ruta, {
      responseType: "blob",
    });
    const imageUrl = URL.createObjectURL(response.data);
    return imageUrl;
  } catch (error) {
    console.error("GET Image - Error:", error);
    return null;
  }
}

export async function httpGetParam<T, D>(
  ruta: string,
  data: D
): Promise<T | null> {
  try {
    const response = await axios.get<T>(`${API_URL}${ruta}`, {
      params: data,
    });
    return response.data;
  } catch (error) {
    console.error("GET - Error:", error);
    return null;
  }
}

export async function httpPost<T, D>(ruta: string, data: D): Promise<T | null> {
  try {
    const response = await axios.post<T>(`${API_URL}${ruta}`, data);
    return response.data;
  } catch (error) {
    console.error("POST - Error:", error);
    return null;
  }
}

export async function httpPostTok<T, D>(
  ruta: string,
  data: D
): Promise<T | null> {
  try {
    const response = await axiosInstance.post<T>(`${API_URL}${ruta}`, data);
    return response.data;
  } catch (error) {
    console.error("POST - Error:", error);
    return null;
  }
}

export async function httpPostTokImg<T, D>(
  ruta: string,
  data: D
): Promise<T | null> {
  try {
    const axio = axiosInstance;
    // axio.interceptors.request.use((config) => {
    //     config.headers["Content-Type"] = "multipart/form-data";
    //   return config;
    // });

    const response = await axio.post<T>(`${API_URL}${ruta}`, data);
    return response.data;
  } catch (error) {
    console.error("POST - Error:", error);
    return null;
  }
}

export async function httpPut<T, D>(ruta: string, data: D): Promise<T | null> {
  try {
    const response = await axios.put<T>(`${API_URL}${ruta}`, data);
    return response.data;
  } catch (error) {
    console.error("PUT - Error:", error);
    return null;
  }
}

export async function httpPutTok<T, D>(
  ruta: string,
  data: D
): Promise<T | null> {
  try {
    const response = await axiosInstance.put<T>(`${API_URL}${ruta}`, data);
    return response.data;
  } catch (error) {
    console.error("PUT - Error:", error);
    return null;
  }
}

export async function httpPatch<T, D>(
  ruta: string,
  data: D
): Promise<T | null> {
  try {
    const response = await axios.patch<T>(`${API_URL}${ruta}`, data);
    return response.data;
  } catch (error) {
    console.error("PUT - Error:", error);
    return null;
  }
}

export async function httpPatchTok<T, D>(
  ruta: string,
  data: D
): Promise<T | null> {
  try {
    const response = await axiosInstance.patch<T>(`${API_URL}${ruta}`, data);
    return response.data;
  } catch (error) {
    console.error("PUT - Error:", error);
    return null;
  }
}

export async function httpPatchTokSin<T>(ruta: string): Promise<T | null> {
  try {
    const response = await axiosInstance.patch<T>(`${API_URL}${ruta}`);
    return response.data;
  } catch (error) {
    console.error("PUT - Error:", error);
    return null;
  }
}

export async function httpPatchTokImg<T, D>(
  ruta: string,
  data: D
): Promise<T | null> {
  try {
    const response = await axiosInstance.patch<T>(`${API_URL}${ruta}`, data, {
      headers: {
        ...axiosInstance.defaults.headers.common,
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("PATCH - Error:", error);
    return null;
  }
}

export async function httpDelete<T>(ruta: string): Promise<T | null> {
  try {
    const response = await axios.delete<T>(`${API_URL}${ruta}`);
    return response.data;
  } catch (error) {
    console.error("DELETE - Error:", error);
    return null;
  }
}

export async function httpDeleteTok<T>(ruta: string): Promise<T | null> {
  try {
    const response = await axiosInstance.delete<T>(`${API_URL}${ruta}`);
    return response.data;
  } catch (error) {
    console.error("DELETE - Error:", error);
    return null;
  }
}

export async function getCityFromCoords(lat: string, lon: string) {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
  );
  const data = await response.json();
  console.log(data.address);
  console.log("hal");

  return (
    data.address.city ||
    data.address.town ||
    data.address.village ||
    data.address.county
  );
}
