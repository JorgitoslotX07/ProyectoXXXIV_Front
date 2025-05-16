export const generateToken = (userId: string): string => {
  const header = {
    alg: "HS256",
    typ: "JWT",
  };

  const payload = {
    userId,
    iat: Date.now(),
    rand: cryptoRandomString(16),
  };

  const encodedHeader = btoa(JSON.stringify(header));
  const encodedPayload = btoa(JSON.stringify(payload));

  return `${encodedHeader}.${encodedPayload}`;
};

// Función auxiliar para generar un string aleatorio (hexadecimal)
const cryptoRandomString = (length: number) => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  array.forEach((x) => (result += chars[x % chars.length]));
  return result;
};
