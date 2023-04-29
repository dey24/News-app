import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StockTable = () => {
  const [stockData, setStockData] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=MSFT&apikey=YOUR_API_KEY`);
        const data = response.data['Time Series (Daily)'];
        const stocks = Object.keys(data).map(date => {
          return {
            date,
            open: data[date]['1. open'],
            high: data[date]['2. high'],
            low: data[date]['3. low'],
            close: data[date]['4. close'],
            volume: data[date]['6. volume']
          }
        });
        setStockData(stocks);
      } catch (error) {
        setError('Error fetching data');
      }
    };

    // Fetch data initially
    fetchData();

    // Fetch data every 5 seconds
    const interval = setInterval(() => {
      fetchData();
    }, 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  if (!stockData.length) {
    return <div>Loading...</div>;
  }

  // Display the first item of the stockData array
  const stock = stockData[0];

  return (
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Open</th>
          <th>High</th>
          <th>Low</th>
          <th>Close</th>
          <th>Volume</th>
        </tr>
      </thead>
      <tbody>
        <tr key={stock.date}>
          <td>{stock.date}</td>
          <td>{stock.open}</td>
          <td>{stock.high}</td>
          <td>{stock.low}</td>
          <td>{stock.close}</td>
          <td>{stock.volume}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default StockTable;
