import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { useTrade } from '~/hooks/useTrades';

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale, BarElement);

enum TradeType {
  INCOME = 'Income',
  EXPENSE = 'Expense',
}

export function TradeCharts() {
  const { filteredTrades, loading, error } = useTrade();

  // Проверяем, есть ли данные
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // Если данных нет, отображаем пустое состояние
  if (!filteredTrades || filteredTrades.length === 0) {
    return <div>No trades available.</div>;
  }

  // Функция для обработки данных по типу (доходы/расходы)
  const getTradeTypeData = (data: any[]) => {
    const tradeTypes = data.reduce((acc: any, trade: any) => {
      const type = trade.type; // Assuming 'type' is either TradeType.INCOME or TradeType.EXPENSE
      acc[type] = acc[type] ? acc[type] + trade.sum : trade.sum;
      return acc;
    }, {});

    return Object.entries(tradeTypes).map(([type, sum]) => ({ type, sum }));
  };

  // Получаем данные по типам (доходы и расходы)
  const allTradeTypeData = getTradeTypeData(filteredTrades);

  // Подготовка данных для графика Pie (по типам доходов и расходов)
  const pieChartData = {
    labels: allTradeTypeData.map((item: any) => item.type),
    datasets: [
      {
        data: allTradeTypeData.map((item: any) => item.sum),
        backgroundColor: allTradeTypeData.map(() => `#${Math.floor(Math.random() * 16777215).toString(16)}`),
      },
    ],
  };

  // Подготовка данных для графика Bar (по типам доходов и расходов)
  const barChartData = {
    labels: allTradeTypeData.map((item: any) => item.type),
    datasets: [
      {
        label: 'Amount',
        data: allTradeTypeData.map((item: any) => item.sum),
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h2>Amount by Trade Type (Pie Chart)</h2>
      <Pie data={pieChartData} />

      <h2>Amount by Trade Type (Bar Chart)</h2>
      <Bar data={barChartData} />
    </div>
  );
}
