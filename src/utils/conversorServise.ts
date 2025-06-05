import type { LatLngExpression, LatLngTuple } from "leaflet";

export const conversiorFile = (
  e: React.ChangeEvent<HTMLInputElement>,
  setImagePreview: React.Dispatch<React.SetStateAction<string | null>>
) => {
  const file = e.target.files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);
  }
};

export function base64ToBlob(base64: string, contentType = "image/png"): Blob {
  const byteCharacters = atob(base64);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);

  return new Blob([byteArray], { type: contentType });
}


export function toLatLngExpressions(polygon: LatLngTuple[]): LatLngExpression[] {
  return polygon.map(([lat, lng]) => [lat, lng] as LatLngTuple);
}

export function toLatLngExpression(coord: LatLngTuple): LatLngExpression {
  const [lat, lng] = coord;
  return [lat, lng] as LatLngTuple;
}


export function getPolygonCenter(polygon: LatLngTuple[]): LatLngTuple {
  let latSum = 0;
  let lngSum = 0;

  for (const [lat, lng] of polygon) {
    latSum += lat;
    lngSum += lng;
  }

  const count = polygon.length;
  return [latSum / count, lngSum / count];
}


export const calcularDiferenciaEnHoras = (inicio: string, fin: string): number => {
  const dInicio = new Date(inicio);
  const dFin = new Date(fin);

  // Diferencia en milisegundos
  const diffMs = dFin.getTime() - dInicio.getTime();

  // Convertimos a horas (puedes cambiar a minutos si prefieres):
  const diffHoras = diffMs / (1000 * 60 * 60);

  return diffHoras;
};
