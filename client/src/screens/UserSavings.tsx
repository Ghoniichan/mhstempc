/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import CustomTable from "../components/Dashboard/CustomTable";
import Backbutton from "../components/Dashboard/Backbutton";
import SearchBar from "../components/Dashboard/SearchBar";
import ButtonCustom from "../components/Dashboard/ButtonCustom";
import * as XLSX from "xlsx";
import axios from "../api/axiosInstance";
import { getUserIdFromJwt } from "../utils/tokenDecoder";

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

// Column mapping
const sortKeyMap: Record<string, string> = {
  "Date": "date",
  "REF": "ref",
  "Received": "received",
  "Withdrawal": "withdrawal",
  "Balance": "balance",
};

const UserSavings = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [savings, setSavings] = useState<any[]>([]);
  const [filteredSavings, setFilteredSavings] = useState<any[]>([]);
  const [selectedColumn, setSelectedColumn] = useState<string>("Date");
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    document.title = "MHSTEMPC | Savings";
    const sample = [
      {
        date: "2025-06-05",
        ref: "SAV001",
        received: "₱1,000.00",
        withdrawal: "₱0.00",
        balance: "₱5,000.00",
      },
      {
        date: "2025-05-20",
        ref: "SAV002",
        received: "₱500.00",
        withdrawal: "₱0.00",
        balance: "₱4,000.00",
      },
    ];
    setSavings(sample);
    setFilteredSavings(sample);
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const q = query.toLowerCase().trim();

    if (q === "") {
      setFilteredSavings(savings);
      return;
    }

    const filtered = savings.filter(entry =>
      Object.values(entry).some(val =>
        typeof val === "string" && val.toLowerCase().includes(q)
      )
    );

    setFilteredSavings(filtered);
  };

  const handleSort = (columnLabel: string, order: 'asc' | 'desc') => {
    const key = sortKeyMap[columnLabel];
    if (!key) return;

    let sorted = [...filteredSavings];

    if (["received", "withdrawal", "balance"].includes(key)) {
      sorted.sort((a, b) => {
        const aVal = parseFloat(a[key].replace(/[₱,]/g, ""));
        const bVal = parseFloat(b[key].replace(/[₱,]/g, ""));
        return order === "asc" ? aVal - bVal : bVal - aVal;
      });
    } else {
      sorted = quickSort(sorted, key, order);
    }

    setFilteredSavings(sorted);
    setSelectedColumn(columnLabel);
    setSortOrder(order);
  };

  const handleExportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filteredSavings);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Savings");
    XLSX.writeFile(wb, "savings.xlsx");
  };

  const handleExportToWord = () => {
    const content = filteredSavings.map(item =>
      `Date: ${item.date}\nREF: ${item.ref}\nReceived: ${item.received}\nWithdrawal: ${item.withdrawal}\nBalance: ${item.balance}\n`
    ).join("\n");

    const blob = new Blob([content], { type: "application/msword;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "savings.doc";
    link.click();
  };

  const rows = filteredSavings.map(entry => [
    entry.entry_date instanceof Date
      ? entry.entry_date.toISOString().slice(0,10)
      : String(entry.entry_date || '').slice(0,10),
    entry.ref_code,
    entry.received_amount,
    entry.withdrawal,
    entry.balance
  ]);

  useEffect(() => {
    const fetchSavings = async () => {
      const userId = getUserIdFromJwt(localStorage.getItem('token') || '');
      
      try {
        const response = await axios.get(`/api/user/profile/${userId}`);
        const policy_no = response.data?.policy_number;
        if (!policy_no) {
          console.error('No policy number found in user profile');
          return;
        }
        const savingsResponse = await axios.get(`/api/savings/${policy_no}`);

        setSavings(savingsResponse.data);
        setFilteredSavings(savingsResponse.data);
      } catch (error) {
        console.error("Error fetching savings data:", error);
      }
    };

    fetchSavings();
  }, []);

  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      <div style={{ width: "200px", flexShrink: 0 }} />
      <div
        className="flex-grow-1 d-flex flex-column justify-content-start align-items-start"
        style={{ padding: "40px 20px" }}
      >
        <div className="d-flex align-items-center mb-3" style={{ gap: "12px" }}>
          <Backbutton />
          <h3 className="mb-0">Savings</h3>
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

        {filteredSavings.length > 0 ? (
          <CustomTable
            columnHeadings={[
              "Date",
              "REF",
              "Received",
              "Withdrawal",
              "Balance",
            ]}
            rows={rows}
          />
        ) : (
          <div className="text-center w-100 mt-4 text-muted fs-5">
            No results found.
          </div>
        )}
      </div>
    </div>
  );
};

export default UserSavings;
