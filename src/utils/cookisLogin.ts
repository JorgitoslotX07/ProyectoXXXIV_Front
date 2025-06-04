import Cookies from "js-cookie";
import type { UserData } from "../interfaces/UserData";
import type { JwtPayload } from "jsonwebtoken";
import { jwtDecode } from "jwt-decode";

export const deleteCookiesLogin = (): void => {
  Cookies.remove("sessionToken");
};

export const getCookiesLogin = (): string | null => {
  const token = Cookies.get("sessionToken");
  try {
    return token ? JSON.parse(token) : null;
  } catch (error) {
    console.error("Error al parsear el token:", error);
    return null;
  }
};

export const setLoginCookiesAndRedirect = (userData: UserData) => {
  Cookies.set("sessionToken", JSON.stringify(userData.token), {
    expires: 1 / 24,
    sameSite: "Strict",
    path: "/",
    // secure: true,
  });
};

export function isAdminFromToken(token: string | null): boolean {
  if (!token) return false;
  console.log("DECODE")

  console.log(token)
  try {
    const decoded = jwtDecode<JwtPayload>(token);
    console.log(decoded)

    return decoded.esAdmin;
  } catch (e) {
    return false;
  }
}
