import React, { useState, useEffect } from 'react';
// import Sidebar from "../components/Dashboard/Sidebar";
import InformationCard from "../components/Dashboard/InformationCard";
import CustomButton from "../components/Dashboard/CustomButton";
import axios from "../api/axiosInstance";
import { useLocation } from 'react-router-dom';

const ClientProfileSavingsScreen = () => {
  const location = useLocation();
  const { title, name, department, policyNumber, address, contactNumber, loanStatus, membershipType, membershipDate } = location.state || {};

  const columnHeadings = [
    'Date',
    'REF',
    'Received Amount',
    'Withdrawal',
    'Balance'
  ];

  const [rows, setRows] = useState<string[][]>([]);

  const [newRow, setNewRow] = useState({
    date: '',
    receivedAmount: '',
    withdrawal: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewRow(prev => ({ ...prev, [name]: value }));
  };

  const handleAddRow = async () => {
    const { date, receivedAmount, withdrawal } = newRow;
    if (date && receivedAmount && withdrawal) {
      try {
        const policyNumber = localStorage.getItem('selectedPolicyNumber');
        if (!policyNumber) {
          console.error('No policy number found in localStorage');
          return;
        }

        await axios.post(`/api/savings/add/${policyNumber}`, newRow);
        alert('New savings entry added successfully');
      } catch (error) {
        console.error('Error adding new row:', error);
      }
    } else {
      alert("Please fill out all fields");
    }
  };

  useEffect(() => {
    try {
      const policyNumber = localStorage.getItem('selectedPolicyNumber');
      if (!policyNumber) {
        console.error('No policy number found in localStorage');
        return;
      }

      type SavingsEntry = {
        entry_date: string;
        ref_code: string;
        received_amount: number | string;
        withdrawal: number | string;
        balance: number | string;
      };

      const fetchSavingsData = async () => {
        const response = await axios.get(`/api/savings/${policyNumber}`);
        const savingsData: SavingsEntry[] = response.data;

        const formattedRows = savingsData.map((entry: SavingsEntry) => [
          entry.entry_date.slice(0, 10),
          entry.ref_code,
          `₱${entry.received_amount}`,
          `₱${entry.withdrawal}`,
          `₱${entry.balance}`,
        ]);
        setRows(formattedRows);
      };
      fetchSavingsData();
    } catch (error) {
      console.error('Error fetching savings data:', error);
    }
  }, []);

  return (
    <div className="d-flex flex-column" style={{ minHeight: '100vh', overflowY: 'auto' }}>
      <div style={{ width: '200px', flexShrink: 0 }}>
        {/* <Sidebar /> */}
      </div>
      <div className="flex-grow-1 d-flex flex-column" style={{ padding: '40px 20px', paddingLeft: '220px' }}>
        <h3>Client Profile</h3>

        <div
          style={{
            flexGrow: 1,
            overflowY: 'auto',
            overflowX: 'hidden',
            paddingRight: '10px',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
          className="no-scrollbar"
        >
          <InformationCard
            title= {title || "Client Savings Profile"}
            name={name || "—"}
            department={department || "—"}
            policyNumber={policyNumber || "—"}
            address={address || "—"}
            contactNumber={contactNumber || "—"}
            loanStatus={loanStatus || "—"}
            membershipType={membershipType || "—"}
            membershipDate={membershipDate || "—"}
            columnHeadings={columnHeadings}
            rows={rows}
          />
        </div>

        {/* Add Savings Entry Form */}
        <div className="mt-4 bg-white pt-2" style={{ flexShrink: 0 }}>
          <h5 className='savingstxt gothic-a1-bold'>Add New Savings Entry</h5>
          <div className="row g-2 align-items-end">
            <div className="col-md-2 col-6">
              <input
                type="date"
                name="date"
                value={newRow.date}
                onChange={handleInputChange}
                className="form-control"
                style={{ width: '100%', height: '55px' }}
              />
            </div>
            <div className="col-md-2 col-6">
              <input
                type="text"
                name="receivedAmount"
                value={newRow.receivedAmount}
                placeholder="₱ Received"
                onChange={handleInputChange}
                className="form-control"
                style={{ width: '100%', height: '55px' }}
              />
            </div>
            <div className="col-md-2 col-6">
              <input
                type="text"
                name="withdrawal"
                value={newRow.withdrawal}
                placeholder="₱ Withdrawal"
                onChange={handleInputChange}
                className="form-control"
                style={{ width: '100%', height: '55px' }}
              />
            </div>
            <div className="col-md-3 col-12">
              <CustomButton label="Add Savings Entry" onClick={handleAddRow} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientProfileSavingsScreen;
