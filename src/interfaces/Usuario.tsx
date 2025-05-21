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
