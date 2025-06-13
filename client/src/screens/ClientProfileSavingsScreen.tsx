import React, { useState } from 'react';
// import Sidebar from "../components/Dashboard/Sidebar";
import InformationCard from "../components/Dashboard/InformationCard";
import CustomButton from "../components/Dashboard/CustomButton";

const ClientProfileSavingsScreen = () => {
  const columnHeadings = [
    'Date',
    'REF',
    'Received Amount',
    'Withdrawal',
    'Balance'
  ];

  const [rows, setRows] = useState<string[][]>([
    ['2023-01-01', 'OR001', '₱500', '₱0', '₱500'],
    ['2023-01-02', 'OR002', '₱300', '₱100', '₱700'],
    ['2023-01-03', 'OR003', '₱400', '₱50', '₱1050'],
    ['2023-01-04', 'OR004', '₱200', '₱0', '₱1250'],
    ['2023-01-01', 'OR001', '₱500', '₱0', '₱500'],
    ['2023-01-02', 'OR002', '₱300', '₱100', '₱700'],
    ['2023-01-03', 'OR003', '₱400', '₱50', '₱1050'],
    ['2023-01-04', 'OR004', '₱200', '₱0', '₱1250'],
    ['2023-01-01', 'OR001', '₱500', '₱0', '₱500'],
    ['2023-01-02', 'OR002', '₱300', '₱100', '₱700'],
    ['2023-01-03', 'OR003', '₱400', '₱50', '₱1050'],
    ['2023-01-04', 'OR004', '₱200', '₱0', '₱1250'],
    ['2023-01-01', 'OR001', '₱500', '₱0', '₱500'],
    ['2023-01-02', 'OR002', '₱300', '₱100', '₱700'],
    ['2023-01-03', 'OR003', '₱400', '₱50', '₱1050'],
    ['2023-01-04', 'OR004', '₱200', '₱0', '₱1250'],
  ]);

  const [newRow, setNewRow] = useState({
    date: '',
    ref: '',
    receivedAmount: '',
    withdrawal: '',
    balance: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewRow(prev => ({ ...prev, [name]: value }));
  };

  const handleAddRow = () => {
    const { date, ref, receivedAmount, withdrawal, balance } = newRow;
    if (date && ref && receivedAmount && withdrawal && balance) {
      setRows(prev => [...prev, [date, ref, receivedAmount, withdrawal, balance]]);
      setNewRow({ date: '', ref: '', receivedAmount: '', withdrawal: '', balance: '' });
    } else {
      alert("Please fill out all fields");
    }
  };

  return (
    <div className="d-flex" style={{ height: '100vh' }}>
      <div style={{ width: '200px', flexShrink: 0 }}>
        {/* <Sidebar /> */}
      </div>
      <div className="flex-grow-1 d-flex flex-column" style={{ padding: '40px 20px', overflow: 'hidden' }}>
        <h1>Client Profile</h1>

        {/* Scrollable InformationCard */}
        <div style={{ flexGrow: 1, overflowY: 'auto', paddingRight: '10px' }}>
          <InformationCard
            title="Client Loan Profile"
            name="John Doe"
            department="Finance"
            policyNumber="MHSTEMPC-123456"
            address="123 Main St, City, Country"
            contactNumber="+1234567890"
            loanStatus="Active"
            membershipType="Standard"
            membershipDate="2023-01-01"
            columnHeadings={columnHeadings}
            rows={rows}
          />
        </div>

        {/* Add Savings Entry Form - fixed at bottom */}
        <div className="mt-4 bg-white pt-3" style={{ flexShrink: 0 }}>
          <h5>Add New Savings Entry</h5>
          <div className="row g-2 align-items-end">
            <div className="col-md-2 col-6">
              <input
                type="date"
                name="date"
                value={newRow.date}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
            <div className="col-md-2 col-6">
              <input
                type="text"
                name="ref"
                value={newRow.ref}
                placeholder="REF"
                onChange={handleInputChange}
                className="form-control"
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
              />
            </div>
            <div className="col-md-2 col-6">
              <input
                type="text"
                name="balance"
                value={newRow.balance}
                placeholder="₱ Balance"
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
            <div className="col-md-2 col-12">
              <CustomButton label="Add Savings Entry" onClick={handleAddRow} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientProfileSavingsScreen;
