import { hashPassword } from "../utils/verficaciones";
export type Usuario = {
  name: string;
  email: string;
  password: string;
};

export function Usuario(): Usuario {
  return { name: "", email: "", password: "" };
}

export interface UsuarioToken {
  email: string;
  password: string;
}

export async function UsuarioToken(user: Usuario): Promise<UsuarioToken> {
  const pass: string = await hashPassword(user.password);
  return { email: user.email, password: pass };
}
