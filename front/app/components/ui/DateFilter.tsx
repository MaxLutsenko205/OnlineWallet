import { useDispatch } from "react-redux";
import { setEndDate, setStartDate } from "~/features/trades/tradeSlice";

export function DateFilter() {
  const dispatch = useDispatch();

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setStartDate(e.target.value));
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setEndDate(e.target.value));
  };

  return (
    <div>
      <input
        type="date"
        onChange={handleStartDateChange}
        placeholder="Start Date"
        className="border p-2 rounded"
      />
      <input
        type="date"
        onChange={handleEndDateChange}
        placeholder="End Date"
        className="border p-2 rounded"
      />
    </div>
  );
}
