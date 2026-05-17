export type Step = 1 | 2 | 3 | 4;
export type PaymentStatus = "idle" | "processing" | "success" | "error";

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  whatsapp: string;
}

export interface ShippingInfo {
  line1: string;
  line2: string;
  city: string;
  state: string;
  pin: string;
  country: string;
  instructions: string;
}
