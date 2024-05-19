// app/components/StockTable.tsx
import React from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip, Tooltip } from "@nextui-org/react";
import { DeleteIcon } from './DeleteIcon';

interface StockTableProps {
  stocks: any[];
  onDelete: (symbol: string) => void;
}

const StockTable: React.FC<StockTableProps> = ({ stocks, onDelete }) => {
  const columns = [
    { name: "Ticker", uid: "ticker" },
    { name: "Open", uid: "open" },
    { name: "High", uid: "high" },
    { name: "Low", uid: "low" },
    { name: "Close", uid: "close" },
    { name: "Date", uid: "date" },
    { name: "Change", uid: "change" },
    { name: "Actions", uid: "actions" },
  ];

  const renderCell = (item, columnKey) => {
    const cellValue = item[columnKey];

    switch (columnKey) {
      case "ticker":
        return (
          <div className="flex items-center">
            <img src={`https://logo.clearbit.com/${item.symbol.toLowerCase()}.com`} alt={item.symbol} className="w-8 h-8 mr-2"/>
            {item.symbol.toUpperCase()}
          </div>
        );
      case "open":
      case "high":
      case "low":
      case "close":
      case "date":
        return cellValue;
      case "change":
        const changeColor = cellValue >= 0 ? "success" : "danger";
        return (
          <Chip className="capitalize" color={changeColor} size="sm" variant="flat">
            {cellValue.toFixed(2)}%
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip color="danger" content="Delete">
              <span 
                className="text-lg text-danger cursor-pointer active:opacity-50"
                onClick={() => onDelete(item.symbol)}
              >
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  };

  return (
    <Table aria-label="Stock Table">
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={stocks}>
        {(item) => (
          <TableRow key={item.symbol}>
            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default StockTable;
