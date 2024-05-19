// app/api/stock.ts
const ALPHA_VANTAGE_API_KEY = process.env.NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY;

export const fetchStockData = async (symbol: string, period: string = '1M') => {
  const response = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${ALPHA_VANTAGE_API_KEY}`);
  const data = await response.json();

  if (data["Error Message"]) {
    throw new Error("Failed to fetch stock data.");
  }

  const timeSeries = data["Time Series (Daily)"];
  const dates = Object.keys(timeSeries);
  const endDate = new Date(dates[0]); // Latest date
  let startDate;

  switch (period) {
    case '6M':
      startDate = new Date(endDate);
      startDate.setMonth(startDate.getMonth() - 6);
      break;
    case '3M':
      startDate = new Date(endDate);
      startDate.setMonth(startDate.getMonth() - 3);
      break;
    case '1M':
    default:
      startDate = new Date(endDate);
      startDate.setMonth(startDate.getMonth() - 1);
      break;
  }

  const filteredDates = dates.filter(date => {
    const currentDate = new Date(date);
    return currentDate >= startDate && currentDate <= endDate;
  });

  const stockData = filteredDates.map(date => ({
    date,
    open: parseFloat(timeSeries[date]["1. open"]),
    high: parseFloat(timeSeries[date]["2. high"]),
    low: parseFloat(timeSeries[date]["3. low"]),
    close: parseFloat(timeSeries[date]["4. close"]),
    change: ((parseFloat(timeSeries[date]["4. close"]) - parseFloat(timeSeries[date]["1. open"])) / parseFloat(timeSeries[date]["1. open"])) * 100
  }));

  return stockData;
};
