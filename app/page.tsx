// app/page.tsx
"use client";
import React, { useState } from "react";
import SearchBar from "./components/SearchBar"; // Import SearchBar
import StockTable from "./components/StockTable"; // Import StockTable
import StockChart from "./components/StockChart"; // Import StockChart
import { fetchStockData } from "./api/stock"; // Import the fetch function

interface Stock {
  symbol: string;
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  change: number;
}

const Page: React.FC = () => {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [chartData, setChartData] = useState<Stock[] | null>(null);
  const [chartSymbol, setChartSymbol] = useState<string>("");

  const handleSearch = async (symbol: string) => {
    const upperSymbol = symbol.toUpperCase();
    // Check if the stock already exists in the list
    if (stocks.some(stock => stock.symbol === upperSymbol)) {
      alert(`Stock ${upperSymbol} is already in the list.`);
      return;
    }

    try {
      const data = await fetchStockData(upperSymbol);
      const newStock: Stock = {
        symbol: upperSymbol,
        ...data[0]
      };
      setStocks((prevStocks) => [...prevStocks, newStock]);
    } catch (error) {
      console.error("Failed to fetch stock data:", error);
    }
  };

  const handleVisualize = async (symbol: string) => {
    const upperSymbol = symbol.toUpperCase();
    try {
      const data = await fetchStockData(upperSymbol);
      const chartDataWithSymbol = data.map((item: Omit<Stock, 'symbol'>) => ({
        ...item,
        symbol: upperSymbol,
      }));
      setChartData(chartDataWithSymbol);
      setChartSymbol(upperSymbol);
    } catch (error) {
      console.error("Failed to fetch stock data for visualization:", error);
    }
  };
  

  const handleDelete = (symbol: string) => {
    setStocks((prevStocks) => prevStocks.filter(stock => stock.symbol !== symbol));
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} onVisualize={handleVisualize} /> {/* Pass handleSearch and handleVisualize to SearchBar */}
      <StockTable stocks={stocks} onDelete={handleDelete} /> {/* Pass stocks and handleDelete to StockTable */}
      {chartData && <StockChart data={chartData} symbol={chartSymbol} />} {/* Render StockChart if chartData is available */}
    </div>
  );
};

export default Page;
