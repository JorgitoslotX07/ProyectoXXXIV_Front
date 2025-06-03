export type PaymentType = "Alquiler por hora" | "Alquiler por día" | "Reservación";
export type PaymentMethod = "Tarjeta" | "PayPal" | "Transferencia bancaria";

export interface DataPayment {
    vehicleId: number;
    paymentType: PaymentType;
    paymentMethod: PaymentMethod;
    amount: number;
    duration: number;
}