import { useEffect, useState } from "react";
import { fetchAllCategory } from "~/services/api/CategoryApi";
import type { Trade } from "~/types/Trade";
import { TradeType } from "~/types/TradeType";

type createTradeDto = Omit<Trade, "id" | "category" | "creationDate"> & {
  categoryId: number;
};

interface Props {
  trade: createTradeDto | null;
  onClose: () => void;
  onSubmit: (data: Partial<Trade>) => void;
  onDelete: () => void;
}

export function TradeModal({ trade, onClose, onSubmit, onDelete }: Props) {
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
  const [form, setForm] = useState<Partial<createTradeDto>>({
    sum: 0,
    comment: "",
    type: TradeType.INCOME,
    categoryId: 0,
    ...trade,
  });

  useEffect(() => {
    fetchAllCategory().then((data) => {
      setCategories(data);
      if (!trade && data.length > 0) {
        setForm((prev) => ({ ...prev, categoryId: data[0].id }));
      }
    });
  }, [trade]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "sum" || name === "categoryId" ? Number(value) : value,
    }));
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6 space-y-4 text-black">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          {trade ? "✏️ Edit Trade" : "➕ Add Trade"}
        </h2>

        <div className="space-y-3">
          <input
            type="number"
            name="sum"
            value={form.sum}
            onChange={handleChange}
            placeholder="Amount"
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />

          <input
            type="text"
            name="comment"
            value={form.comment}
            onChange={handleChange}
            placeholder="Comment"
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />

          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value={TradeType.INCOME}>Income</option>
            <option value={TradeType.EXPENSE}>Expense</option>
          </select>

          <select
            name="categoryId"
            value={form.categoryId}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-between items-center mt-4">
          {trade && (
            <button
              className="text-red-500 hover:underline text-sm"
              onClick={onDelete}
            >
              🗑 Delete
            </button>
          )}
          <div className="space-x-2">
            <button
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg transition"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
              onClick={() => onSubmit(form)}
            >
              {trade ? "Update" : "Create"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
