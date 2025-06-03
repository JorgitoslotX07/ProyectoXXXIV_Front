export const TipoVehiculo = {
  Turismo: "TURISMO",
  SUV: "SUV",
  Monovolumen: "MONOVOLUMEN",
  Biplaza: "BIPLAZA",
} as const;

export type TipoVehiculo = (typeof TipoVehiculo)[keyof typeof TipoVehiculo];
