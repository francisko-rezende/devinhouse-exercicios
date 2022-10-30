import { Pizza } from "./pizza.types";

export interface Solicitation {
  id: string;
  client: string;
  document: string;
  address: string;
  phoneNumber: string;
  paymentMethod: string;
  notes: string;
  order: Pizza[];
  status: string;
}
