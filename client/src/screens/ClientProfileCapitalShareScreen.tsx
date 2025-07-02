import React, { useEffect, useState } from 'react';
// import Sidebar from "../components/Dashboard/Sidebar";
import InformationCard from "../components/Dashboard/InformationCard";
import CustomButton from "../components/Dashboard/CustomButton";
import axios from '../api/axiosInstance';
import { useLocation } from 'react-router-dom';

type CapitalShareEntry = {
  date: string;
  or: string;
  ref: string;
  amount: number;
  balance: number;
};

const ClientProfileCapitalShareScreen = () => {
  const columnHeadings = ['Date', 'OR', 'REF', 'Received Amount', 'Balance'];

  const [rows, setRows] = useState<CapitalShareEntry[]>([]);
  const [newRow, setNewRow] = useState({ date: '', amount: '' });
  const location = useLocation();
  const state = location.state as { 
      name: string,
      department: string,
      policyNumber: string,
      address: string,
      contactNumber: string,
      loanStatus: string,
      membershipType: string,
      membershipDate: string,
  } | undefined;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewRow(prev => ({ ...prev, [name]: value }));
  };

  const handleAddRow = async () => {
    const { date, amount } = newRow;
    if (date && amount) {
      const numericReceived = parseFloat(amount.replace(/[^0-9.-]+/g, '')) || 0;
      const entry: CapitalShareEntry = {
        date,
        or: '',
        ref: '',
        amount: numericReceived,
        balance: (rows.length > 0 ? rows[rows.length - 1].balance : 0) + numericReceived,
      };

      setRows(prev => [...prev, entry]);
      console.log(JSON.stringify(entry));

      const policyNumber = localStorage.getItem('selectedPolicyNumber');
      if (!policyNumber) {
        console.error('No policy number found in localStorage');
        return;
      }

      try {
        await axios.post(`/api/capital/add/${policyNumber}`, entry);
        alert('New capital share entry added successfully');
      } catch (error) {
        console.error('Error adding new row:', error);
      }
    } else {
      alert('Please fill out all fields');
    }
  };

  useEffect(() => {
    const fetchCapitalShare = async () => {
      const policyNumber = localStorage.getItem('selectedPolicyNumber');
      if (!policyNumber) {
        console.error('No policy number found in localStorage');
        return;
      }

      try {
        const response = await axios.get(`/api/capital/${policyNumber}`);
        const transformed: CapitalShareEntry[] = response.data.map((entry: Record<string, unknown>) => ({
          date: typeof entry.entry_date === 'string' ? entry.entry_date.slice(0, 10) : '',
          or: typeof entry.or_code_generated === 'string' ? entry.or_code_generated : '',
          ref: typeof entry.ref_code === 'string' ? entry.ref_code : '',
          amount: typeof entry.amount === 'string' ? parseFloat(entry.amount) : 0,
          balance: typeof entry.balance === 'string' ? parseFloat(entry.balance) : 0,
        }));
        setRows(transformed);
      } catch (error) {
        console.error('Error initializing client profile:', error);
      }
    };

    fetchCapitalShare();
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
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
          className="no-scrollbar"
        >
          <InformationCard
            name={state?.name || "—"}
            title= "Client Capital Share Profile"
            department={state?.department || "—"}
            policyNumber={state?.policyNumber || "—"}
            address={state?.address || "—"}
            contactNumber={state?.contactNumber || "—"}
            loanStatus={state?.loanStatus || "—"}
            membershipType={state?.membershipType || "—"}
            membershipDate={state?.membershipDate || "—"}
            columnHeadings={columnHeadings}
            rows={rows.map(r => [r.date, r.or, r.ref, `₱${r.amount}`, `₱${r.balance}`])}
          />
        </div>

        <div className="mt-4 w-100 bg-white pt-2" style={{ flexShrink: 0 }}>
          <h5 className='captsharetxt gothic-a1-bold'>Add New Capital Share Entry</h5>
          <div className="row g-2 align-items-end">
            <div className="col-md-3 col-6">
              <input
                type="date"
                name="date"
                value={newRow.date}
                onChange={handleInputChange}
                className="form-control"
                style={{ width: '100%', height: '55px' }}
              />
            </div>
            <div className="col-md-3 col-6">
              <input
                type="text"
                name="amount"
                value={newRow.amount}
                placeholder="₱ Amount"
                onChange={handleInputChange}
                className="form-control"                
                style={{ width: '100%', height: '55px' }}
              />
            </div>
            <div className="col-md-3 col-12">
              <CustomButton 
                label="Add Capital Share" onClick={handleAddRow}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientProfileCapitalShareScreen;
