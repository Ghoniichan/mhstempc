/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import CustomTable from "../components/Dashboard/CustomTable";
import Backbutton from "../components/Dashboard/Backbutton";
import SearchBar from "../components/Dashboard/SearchBar";
import ButtonCustom from "../components/Dashboard/ButtonCustom";
import * as XLSX from "xlsx";

// QuickSort Function
const quickSort = <T extends Record<string, any>>(arr: T[], key: string, order: 'asc' | 'desc' = 'asc'): T[] => {
  if (arr.length <= 1) return arr;
  const pivot = arr[arr.length - 1];
  const left: T[] = [];
  const right: T[] = [];

  for (let i = 0; i < arr.length - 1; i++) {
    const a = arr[i][key];
    const b = pivot[key];
    const cond = order === 'asc' ? a < b : a > b;
    if (cond) left.push(arr[i]);
    else right.push(arr[i]);
  }

  return [...quickSort(left, key, order), pivot, ...quickSort(right, key, order)];
};

// Column name to key mapping
const sortKeyMap: Record<string, string> = {
  "Date": "date",
  "OR": "or",
  "REF": "ref",
  "Received": "received",
  "Balance": "balance"
};

const UserCapitalShare = () => {
  const [capitalShares, setCapitalShares] = useState<any[]>([]);
  const [filteredShares, setFilteredShares] = useState<any[]>([]);
  const [selectedColumn, setSelectedColumn] = useState<string>("Date");
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    document.title = "MHSTEMPC | Capital Share";

    const sample = [
      { date: "2025-06-01", or: "OR001", ref: "REF001", received: "₱1,000.00", balance: "₱5,000.00" },
      { date: "2025-05-15", or: "OR002", ref: "REF002", received: "₱500.00", balance: "₱4,000.00" },
    ];
    setCapitalShares(sample);
    setFilteredShares(sample);
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const q = query.trim().toLowerCase();

    if (!q) {
      setFilteredShares(capitalShares);
      return;
    }

    const result = capitalShares.filter(share =>
      Object.values(share).some(val =>
        typeof val === "string" && val.toLowerCase().includes(q)
      )
    );

    setFilteredShares(result);
  };

  const handleSort = (columnLabel: string, order: 'asc' | 'desc') => {
    const key = sortKeyMap[columnLabel];
    if (!key) return;
    let sorted = [...filteredShares];

    if (["received", "balance"].includes(key)) {
      sorted.sort((a, b) => {
        const aVal = parseFloat(a[key].replace(/[₱,]/g, ""));
        const bVal = parseFloat(b[key].replace(/[₱,]/g, ""));
        return order === "asc" ? aVal - bVal : bVal - aVal;
      });
    } else {
      sorted = quickSort(sorted, key, order);
    }

    setFilteredShares(sorted);
    setSelectedColumn(columnLabel);
    setSortOrder(order);
  };

  const handleExportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filteredShares);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "CapitalShare");
    XLSX.writeFile(wb, "capital_share.xlsx");
  };

  const handleExportToWord = () => {
    const content = filteredShares.map(row =>
      `Date: ${row.date}\nOR: ${row.or}\nREF: ${row.ref}\nReceived: ${row.received}\nBalance: ${row.balance}\n`
    ).join("\n");
    const blob = new Blob([content], { type: "application/msword;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "capital_share.doc";
    link.click();
  };

  const rows = filteredShares.map(row => [
    row.date,
    row.or,
    row.ref,
    row.received,
    row.balance
  ]);

  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      <div style={{ width: "200px", flexShrink: 0 }} />
      <div className="flex-grow-1 d-flex flex-column justify-content-start align-items-start" style={{ padding: "40px 20px" }}>
        <div className="d-flex align-items-center mb-3" style={{ gap: "12px" }}>
          <Backbutton />
          <h3 className="mb-0">Capital Share</h3>
        </div>

        <div className="d-flex align-items-center mb-4 w-100" style={{ gap: "5px" }}>
          <div style={{ flex: 1 }}>
            <SearchBar value={searchQuery} onSearch={handleSearch} />
          </div>

          <ButtonCustom
            text="Sort"
            icon="bi bi-arrow-down-up"
            backgroundColor="#fff"
            textColor="#000"
            borderColor="#d9d9d9"
            height="45px"
            isDropdown
            dropdownItems={[
              { label: "Choose column to sort by:", onClick: () => {} },
              ...Object.keys(sortKeyMap).map(label => ({
                label: label === selectedColumn ? `✓ ${label}` : label,
                onClick: () => handleSort(label, sortOrder),
              })),
              { label: "────────────", onClick: () => {} },
              {
                label: sortOrder === "asc" ? "✓ Ascending" : "Ascending",
                onClick: () => handleSort(selectedColumn, "asc")
              },
              {
                label: sortOrder === "desc" ? "✓ Descending" : "Descending",
                onClick: () => handleSort(selectedColumn, "desc")
              }
            ]}
          />

          <ButtonCustom
            text="Download"
            icon="bi bi-download"
            backgroundColor="#fff"
            textColor="#000"
            borderColor="#d9d9d9"
            height="45px"
            isDropdown
            dropdownItems={[
              { label: "Export to Excel", onClick: handleExportToExcel },
              { label: "Export to Word", onClick: handleExportToWord },
            ]}
          />
        </div>

        {filteredShares.length === 0 ? (
          <div className="text-center w-100 mt-4 text-muted fs-5">No results found.</div>
        ) : (
          <CustomTable
            columnHeadings={["Date", "OR", "REF", "Received", "Balance"]}
            rows={rows}
          />
        )}
      </div>
    </div>
  );
};

export default UserCapitalShare;
