import bcrypt from "bcryptjs";

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

export function valodateForm(form: {
  name: string;
  email: string;
  password: string;
  fechaNacimiento: string;
  dni: string;
}) {
  const validates = [];

  validates.push(!validateName(form.name));
  validates.push(!validateMail(form.email));
  validates.push(!validatePassword(form.password));
  validates.push(!validateFechaNacimiento(form.fechaNacimiento));
  validates.push(!validarDNI(form.dni));

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
  return bcrypt.hash(plainPassword, salt);
};

export const comparePassword = async (
  plainPassword: string,
  hashedPassword: string
): Promise<boolean> => {
  return bcrypt.compare(plainPassword, hashedPassword);
};
