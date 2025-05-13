import type { Category } from "./Category";
import type { TradeType } from "./TradeType";

export interface Trade {
  id: number;
  sum: number;
  comment: string;
  creationDate: string;
  type: TradeType;
  category: Category;
}
