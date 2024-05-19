import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Button } from '@nextui-org/react';
import { fetchStockData } from '../api/stock'; // Import fetchStockData to refetch data

interface StockChartProps {
  data: any[];
  symbol: string;
}

const StockChart: React.FC<StockChartProps> = ({ data, symbol }) => {
  const [chartData, setChartData] = useState(data);
  const [timePeriod, setTimePeriod] = useState('1M'); // Default to 1 Month

  const handleTimePeriodChange = async (period: string) => {
    setTimePeriod(period);
    try {
      const fetchedData = await fetchStockData(symbol, period);
      setChartData(fetchedData);
    } catch (error) {
      console.error(`Failed to fetch data for ${period} period:`, error);
    }
  };

  useEffect(() => {
    // Fetch data when the component mounts
    handleTimePeriodChange(timePeriod);
  }, [symbol]);

  return (
    <div className="my-8">
      <h2 className="text-center text-xl font-bold">{symbol.toUpperCase()} Stock Price</h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={chartData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis 
            domain={['auto', 'auto']} // Automatically adjust the domain
            tickCount={8} // Increase the number of ticks
            allowDecimals={true} // Allow decimals in the tick values
            padding={{ top: 20, bottom: 20 }} // Add padding to the Y-axis
          />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="close" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="open" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
      <div className="flex justify-end space-x-2 mt-4">
        <Button
          color={timePeriod === '1M' ? 'primary' : 'default'}
          onClick={() => handleTimePeriodChange('1M')}
        >
          1 Month
        </Button>
        <Button
          color={timePeriod === '3M' ? 'primary' : 'default'}
          onClick={() => handleTimePeriodChange('3M')}
        >
          3 Months
        </Button>
        <Button
          color={timePeriod === '6M' ? 'primary' : 'default'}
          onClick={() => handleTimePeriodChange('6M')}
        >
          6 Months
        </Button>
      </div>
    </div>
  );
};

export default StockChart;
