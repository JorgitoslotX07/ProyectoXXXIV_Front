import Cookies from "js-cookie";
import type { UserData } from "../interfaces/UserData";

export const deleteCookiesLogin = () => {
  Cookies.remove("sessionToken");
  Cookies.remove("userId");
};

export const getCookiesLogin = () => {
  Cookies.get("sessionToken");
  Cookies.get("userId");
};

export const setLoginCookiesAndRedirect = (userData: UserData) => {
  // Guardar cookies por 3 días
  Cookies.set("sessionToken", userData.token, {
    expires: 3,
    sameSite: "Strict",
    path: "/",
  });

  Cookies.set("userId", userData.id, {
    expires: 3,
    sameSite: "Strict",
    path: "/",
  });
};
