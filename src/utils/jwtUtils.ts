// import jwt from "jsonwebtoken";
// import { encrypt, decrypt } from "./encryptUtils";
// import type { UsuarioToken } from "../interfaces/Usuario";

// const JWT_SECRET = process.env.JWT_SECRET || "jwtsecretdefault";

// export function generateToken({ email, password }: UsuarioToken): string {
//   const encryptedCredentials = encrypt(`${email}:${password}`);

//   const token = jwt.sign(
//     {
//       credentials: encryptedCredentials,
//     },
//     JWT_SECRET,
//     { expiresIn: "3d" }
//   );

//   return token;
// }

// export function decodeToken(token: string): UsuarioToken | null {
//   try {
//     const decoded = jwt.verify(token, JWT_SECRET) as {
//       credentials: string;
//     };

//     const [email, password] = decrypt(decoded.credentials).split(":");

//     return { email, password };
//   } catch (error) {
//     console.error("Error decofificando token:", error);
//     return null;
//   }
// }
