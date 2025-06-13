import React, { useState } from 'react';
// import Sidebar from "../components/Dashboard/Sidebar";
import InformationCard from "../components/Dashboard/InformationCard";
import CustomButton from "../components/Dashboard/CustomButton";

const ClientProfileCapitalShareScreen = () => {
  const columnHeadings = ['Date', 'OR', 'REF', 'Received Amount', 'Balance'];

  const [rows, setRows] = useState<string[][]>([
    ['2023-01-01', 'OR001', 'REF001', '₱500', '₱500'],
    ['2023-01-01', 'OR001', 'REF001', '₱500', '₱500'],
    ['2023-01-01', 'OR001', 'REF001', '₱500', '₱500'],
    ['2023-01-01', 'OR001', 'REF001', '₱500', '₱500'],
  ]);

  const [newRow, setNewRow] = useState({
    date: '',
    or: '',
    ref: '',
    receivedAmount: '',
    balance: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewRow(prev => ({ ...prev, [name]: value }));
  };

  const handleAddRow = () => {
    const { date, or, ref, receivedAmount, balance } = newRow;
    if (date && or && ref && receivedAmount && balance) {
      setRows(prev => [...prev, [date, or, ref, receivedAmount, balance]]);
      
      setNewRow({ date: '', or: '', ref: '', receivedAmount: '', balance: '' });
    } else {
      alert("Please fill out all fields");
    }
  };

  return (
  <div className="d-flex" style={{ height: '100vh' }}>
    <div style={{ width: '200px', flexShrink: 0 }}>
      {/* <Sidebar /> */}
    </div>
    <div
      className="flex-grow-1 d-flex flex-column"
      style={{ padding: '40px 20px', overflow: 'hidden' }}
    >
      <h1>Client Profile</h1>

      <div
        style={{
          flexGrow: 1,
          overflowY: 'auto',
          paddingRight: '10px',  
        }}
      >
        <InformationCard
          title="Client Loan Profile"
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

      {/* Add Row Form  */}
      <div className="mt-4 w-100 bg-white pt-3" style={{ flexShrink: 0 }}>
        <h5>Add New Capital Share Entry</h5>
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
              name="or"
              value={newRow.or}
              placeholder="OR"
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
              placeholder="₱ Amount"
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
            <CustomButton label="Add Capital Share" onClick={handleAddRow} />
          </div>
        </div>
      </div>
    </div>
  </div>
);

};

export default ClientProfileCapitalShareScreen;
