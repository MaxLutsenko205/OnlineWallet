import { useEffect, useState } from "react";
import { TradeModal } from "~/components/modals/TradeModal";

import type { Trade } from "~/types/Trade";
import { useTrade } from "~/hooks/useTrades";
import type { createTradeDto } from "~/services/api/TradeApi";

export default function DashboardPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTrade, setSelectedTrade] = useState<Trade | null>(null);

  const {
    trades,
    fetchAllTrades,
    createTrade,
    updateTrade,
    deleteTrade,
    loading,
    error,
  } = useTrade();

  useEffect(() => {
    fetchAllTrades();
  }, []);

  const handleSubmit = async (data: Partial<createTradeDto>) => {
    if (selectedTrade) {
      await updateTrade(selectedTrade.id, data);
    } else {
      await createTrade(data as createTradeDto);
    }
    closeModal();
  };

  const handleDelete = async () => {
    if (selectedTrade) {
      await deleteTrade(selectedTrade.id);
      closeModal();
    }
  };

  const handleOpenModal = (trade?: Trade) => {
    setSelectedTrade(trade || null);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedTrade(null);
  };

  const getModalTradeData = (trade: Trade) => ({
    sum: trade.sum,
    comment: trade.comment,
    type: trade.type,
    categoryId: trade.category?.id ?? "",
  });

  return (
    <div className="px-4 py-6 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold text-gray-800">📊 My Trades</h1>
        <button
          onClick={() => handleOpenModal()}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl text-sm font-semibold shadow transition"
        >
          + Add Trade
        </button>
      </div>

      {loading && <p className="text-gray-600 text-sm mb-4">Loading...</p>}
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <div className="space-y-4">
        {trades?.length ? (
          trades.map((trade) => (
            <div
              key={trade.id}
              className="bg-white shadow-md rounded-xl p-4 flex justify-between items-center hover:bg-gray-50 transition cursor-pointer"
              onClick={() => handleOpenModal(trade)}
            >
              <div>
                <div className="text-lg font-semibold text-gray-800 capitalize">
                  {trade.type} — ${trade.sum}
                </div>
                <div className="text-sm text-gray-500">{trade.comment}</div>
              </div>
              
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400">No trades found.</p>
        )}
      </div>

      {modalOpen && (
        <TradeModal
          onClose={closeModal}
          onSubmit={handleSubmit}
          onDelete={handleDelete}
          trade={selectedTrade ? getModalTradeData(selectedTrade) : null}
        />
      )}
    </div>
  );
}
