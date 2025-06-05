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

// export type UsuarioCompleto = {
//   usuario: string;
//   email: string;
//   fechaNacimiento: string;
//   dni: string;
// };

// export function UsuarioCompleto(): UsuarioCompleto {
//   return { usuario: "", email: "", fechaNacimiento: "", dni: "" };
// }

export type UsuarioLogin = {
  usuario: string;
  email: string;
  avatar: string;
};

export function UsuarioLogin(): UsuarioLogin {
  return { usuario: "", email: "", avatar: "" };
}

export type UsuarioCompleto = {
  id: number;
  usuario: string;
  email: string;
  fechaNacimiento: string;
  dni: string;
  avatar: string | null;
  esAdministrador: boolean;
  estaBloqueado: boolean;
  motivoBloqueo: string;
  createdAt: string;
};

export const usuarioCompletoVacio: UsuarioCompleto = {
  id: 0,
  usuario: "",
  email: "",
  fechaNacimiento: "",
  dni: "",
  avatar: null,
  esAdministrador: false,
  estaBloqueado: false,
  motivoBloqueo: "",
  createdAt: "",
};

export type UsuarioAdministrar = {
  id: number;
  usuario: string;
  email: string;
  foto: string | null;
  esAdministrador: boolean;
  estaBloqueado: boolean;
  motivoBloqueo: string | null;
  createdAt: string;
};

export const usuarioAdministrarVacio: UsuarioAdministrar = {
  id: 1,
  usuario: "",
  email: "",
  foto: "",
  esAdministrador: false,
  estaBloqueado: false,
  motivoBloqueo: "",
  createdAt: "",
};

export interface UsuarioCarnet {
  id: number;
  usuario: string;
  nombre: string;
  email: string;
  numeroCarnet: string;
  fechaExpedicion: string;
  imagenUrl: string;
  
}

export interface UsuarioMe {
  email: string;
  username: string;
  fotoUrl: string;
}

export const UsuarioMe: UsuarioMe = {
  email: "",
  username: "",
  fotoUrl: "",
};
