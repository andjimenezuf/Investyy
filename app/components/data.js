export const columns = [
  { name: "Ticker", uid: "ticker" },
  { name: "Open", uid: "open" },
  { name: "High", uid: "high" },
  { name: "Low", uid: "low" },
  { name: "Close", uid: "close" },
  { name: "Date", uid: "date" },
  { name: "Change", uid: "change" },
  { name: "Actions", uid: "actions" },
];

export const users = [
  {
    id: 1,
    ticker: "AAPL",
    avatar: "https://example.com/avatar1.jpg",
    open: 150,
    high: 155,
    low: 149,
    close: 152,
    date: "2023-01-01",
    change: 1.33,
  },
  {
    id: 2,
    ticker: "GOOGL",
    avatar: "https://example.com/avatar2.jpg",
    open: 2800,
    high: 2850,
    low: 2780,
    close: 2825,
    date: "2023-01-01",
    change: -0.89,
  },
  // Add more users as needed
];
