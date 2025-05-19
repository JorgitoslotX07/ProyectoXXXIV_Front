import bcrypt from "bcryptjs";
import type { Usuario } from "../interfaces/Usuario";

export function validateMail(mail: string): boolean {
  const mailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return mailRegex.test(mail);
}

export function validateName(name: string): boolean {
  const nameRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{2,50}$/;

  return nameRegex.test(name);
}
export function validatePassword(pass: string): boolean {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  // (mínimo 8 caracteres, al menos una mayúscula, una minúscula, un número y un símbolo)
  return passwordRegex.test(pass);
}
export function validateFechaNacimiento(fn: string): boolean {
  const fechaNacimientoRegex = /^\d{4}-\d{2}-\d{2}$/;

  return fechaNacimientoRegex.test(fn);
}

export function validarDNI(dni: string): boolean {
  const dniRegex = /^\d{8}[A-Za-z]$/;
  if (!dniRegex.test(dni)) return false;

  const letras = "TRWAGMYFPDXBNJZSQVHLCKE";
  const numero = parseInt(dni.slice(0, 8), 10);
  const letra = dni.charAt(8).toUpperCase();

  return letra === letras[numero % 23];
}

export function validarNIE(nie: string): boolean {
  const nieRegex = /^[XYZ]\d{7}[A-Za-z]$/;
  if (!nieRegex.test(nie)) return false;

  const letras = "TRWAGMYFPDXBNJZSQVHLCKE";
  const numero = parseInt(nie.slice(0, 8), 10);
  const letra = nie.slice(8).toUpperCase();

  return letra === letras[numero % 23];
}

export function valodateForm(form: Usuario) {
  const validates = [];

  validates.push(!validateName(form.name));
  validates.push(!validateMail(form.email));
  validates.push(!validatePassword(form.password));

  let verifi = true;
  validates.forEach((item) => {
    if (item) {
      verifi = false;
    }
  });

  return verifi;
}

export const hashPassword = async (plainPassword: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10); // ajustar complejidad de hash
  return await bcrypt.hash(plainPassword, salt);
};

export const comparePassword = async (
  plainPassword: string,
  hashedPassword: string
): Promise<boolean> => {
  return bcrypt.compare(plainPassword, hashedPassword);
};

export function verificarUsuario(user: Usuario): Usuario | null {
  const usuario = usuarios.find(
    (u) => u.email === user.email && u.password === user.password
  );
  return usuario || null;
}

const usuarios = [
  {
    name: "Lucía González",
    email: "lucia.gonzalez@example.com",
    password: "Lucia1234!",
    fechaNacimiento: "1995-04-22",
    dni: "12345678Z",
  },
  {
    name: "Carlos Pérez",
    email: "carlos.perez@example.com",
    password: "Carlos@2023",
    fechaNacimiento: "1988-10-11",
    dni: "87654321X",
  },
  {
    name: "Ana Torres",
    email: "ana.torres@example.com",
    password: "Ana_T0rr3s",
    fechaNacimiento: "2000-07-30",
    dni: "45612378L",
  },
  {
    name: "Miguel Rodríguez",
    email: "miguel.rodriguez@example.com",
    password: "MiguelR#55",
    fechaNacimiento: "1992-01-18",
    dni: "32165498M",
  },
  {
    name: "Toni Jorda Leon",
    email: "tjorda@gmail.com",
    password: "Servidor.18",
    fechaNacimiento: "1999-12-05",
    dni: "15975346P",
  },
];
