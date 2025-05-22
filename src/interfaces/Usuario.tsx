export type Usuario = {
  usuario: string;
  contrasenya: string;
  email: string;
};

export function Usuario(): Usuario {
  return { usuario: "", contrasenya: "", email: "" };
}

export interface UsuarioToken {
  contrasenya: string;
  email: string;
}

export async function UsuarioToken(user: Usuario): Promise<UsuarioToken> {
  // const pass: string = await hashemail(user.email);
  return { contrasenya: user.contrasenya, email: user.email };
}

export type UsuarioCompleto = {
  usuario: string;
  email: string;
  fechaNacimiento: string;
  dni: string;
};

export function UsuarioCompleto(): UsuarioCompleto {
  return { usuario: "", email: "", fechaNacimiento: "", dni: "" };
}

export type UsuarioLogin = {
  usuario: string;
  email: string;
  avatar: string;
};

export function UsuarioLogin(): UsuarioLogin {
  return { usuario: "", email: "", avatar: "" };
}
