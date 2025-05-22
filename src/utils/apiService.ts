import axios from "axios";

const API_URL = "http://192.168.198.105:8080/v1"; // Cambia si tu backend está en otro puerto o path

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

export async function httpPut<T, D>(ruta: string, data: D): Promise<T | null> {
  try {
    const response = await axios.put<T>(`${API_URL}${ruta}`, data);
    return response.data;
  } catch (error) {
    console.error("PUT - Error:", error);
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
