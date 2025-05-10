import type { Category } from "./Category";
import type { Trade } from "./Trade";

export interface User {
  id: number | null;
  email: string;
  budget: number;
  trades?: Trade[];
  categories?: Category[];
}
