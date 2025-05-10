import type { Trade } from "./Trade";

export interface Category {
  id: number;
  name: string;
  textHex: string;
  bgHex: string;
  icon: string;
  trades?: Trade[];
}
