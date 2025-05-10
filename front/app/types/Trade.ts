import type { Category } from "./Category";
import type { TradeType } from "./TradeType";
import type { User } from "./User";

export interface Trade {
  id: number;
  sum: number;
  comment: string;
  creationDate: string;
  type: TradeType;
  category: Category;
  user: User;
}
