// app/components/StockTable.tsx
import React from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip, Tooltip } from "@nextui-org/react";
import { DeleteIcon } from './DeleteIcon';
import Image from 'next/image';

interface Stock {
  symbol: string;
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  change: number;
}

interface StockTableProps {
  stocks: Stock[];
  onDelete: (symbol: string) => void;
}

const StockTable: React.FC<StockTableProps> = ({ stocks, onDelete }) => {
  const columns = [
    { name: "Symbol", uid: "symbol" },
    { name: "Open", uid: "open" },
    { name: "High", uid: "high" },
    { name: "Low", uid: "low" },
    { name: "Close", uid: "close" },
    { name: "Date", uid: "date" },
    { name: "Change", uid: "change" },
    { name: "Actions", uid: "actions" },
  ];

  const renderCell = (item: Stock, columnKey: keyof Stock | "actions") => {
    const cellValue = item[columnKey as keyof Stock];

    switch (columnKey) {
      case "symbol":
        return (
          <div className="flex items-center">
            <Image src={`https://logo.clearbit.com/${item.symbol.toLowerCase()}.com`} alt={item.symbol} width={32} height={32} className="mr-2"/>
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
        const changeValue = cellValue as number;
        const changeColor = changeValue >= 0 ? "success" : "danger";
        return (
          <Chip className="capitalize" color={changeColor} size="sm" variant="flat">
            {changeValue.toFixed(2)}%
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
            {(columnKey) => <TableCell>{renderCell(item, columnKey as keyof Stock | "actions")}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default StockTable;
