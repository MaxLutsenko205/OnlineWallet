import type { Trade } from "~/types/Trade";
import { api } from "./Api";

const ROUTE = "/trades";
export type createTradeDto = Omit<Trade, "id">;

export async function fetchAllTrade(): Promise<Trade[]> {
  const response = await api.getAll<Trade>(ROUTE);
  return response.data ?? [];
}

export async function getOneTrade(id: number): Promise<Trade> {
  const response = await api.getById<Trade>(ROUTE, id);
  return response.data ?? ({} as Trade);
}

export async function createTrade(body: createTradeDto): Promise<Trade> {
  const response = await api.create<createTradeDto, Trade>(ROUTE, body);
  return response.data ?? ({} as Trade);
}

export async function updateTrade(
  id: number,
  body: Partial<createTradeDto>
): Promise<Trade> {
  const response = await api.update<Partial<createTradeDto>, Trade>(
    ROUTE,
    id,
    body
  );
  return response.data ?? ({} as Trade);
}

export async function deleteTradeById(id: number): Promise<number> {
  const response = await api.remove(ROUTE, id);
  return id;
}
