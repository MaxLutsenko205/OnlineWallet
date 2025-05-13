import { DateFilter } from "~/components/ui/DateFilter";
import { TradeCharts } from "~/components/ui/TradeCharts";

export default function StatsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Stats</h1>

      <DateFilter />
      <TradeCharts />
    </div>
  );
}
