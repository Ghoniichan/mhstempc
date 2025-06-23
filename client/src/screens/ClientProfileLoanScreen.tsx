import InformationCard from "../components/Dashboard/InformationCard";
import axios from '../api/axiosInstance';
import { useState, useEffect } from "react";

const fetchClientInfo = async (policyNo: string) => {
  try {
    const response = await axios.get(`/api/user/${policyNo}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching client information:", error);
    return null;
  }
};

const formatDateOnly = (isoString?: string): string => {
  return isoString ? isoString.split('T')[0] : '';
};

const ClientProfileLoanScreen = () => {
  const [data, setData] = useState<{
    first_name?: string;
    middle_name?: string;
    last_name?: string;
    present_address?: string;
    tel_cel_no?: string;
    policy_number?: string;
    membership_date?: string;
  } | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const p = localStorage.getItem('selectedPolicyNumber');

  useEffect(() => {
    if (!p) {
      // No policy number: you may redirect or show error
      setError("No policy number provided.");
      return;
    }
    let isMounted = true;
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const clientData = await fetchClientInfo(p);
        if (isMounted) {
          if (clientData) {
            setData(clientData);
          } else {
            setError("No client data found for the given policy number");
            setData(null);
          }
        }
      } catch (err) {
        if (isMounted) {
          console.error(err);
          setError("Error fetching client data");
          setData(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };
    load();

    // cleanup in case component unmounts before fetch completes
    return () => {
      isMounted = false;
    };
  }, [p]);

  const columnHeadings = [
    'Date',
    'OR',
    'Interest',
    'Service Fee',
    'Fines',
    'Due Date',
    'Received Amount'
  ];

  // You probably will fetch rows dynamically too; here is just static example
  const rows = [
    ['2023-01-01', 'OR001', '₱500', '₱50', '₱0', '2023-02-01', '₱550'],
    // ...
  ];

  // Render logic
  return (
    <div className="d-flex">
      <div style={{ width: '200px', flexShrink: 0 }}>
        {/* <Sidebar /> */}
      </div>
      <div
        className="flex-grow-1 d-flex flex-column justify-content-start align-items-start"
        style={{ padding: '40px 20px' }}
      >
        <h1>Client Profile</h1>

        {loading && <p>Loading client data...</p>}

        {error && <p style={{ color: 'red' }}>{error}</p>}

        {!loading && !error && data && (
          <InformationCard
            name={`${data.first_name || ""} ${data.middle_name || ""} ${data.last_name || ""}`.trim() || "—"}
            title="Client Loan Profile"
            department="Finance"
            policyNumber={p || "—"}
            address={data.present_address || "—"}
            contactNumber={data.tel_cel_no || "—"}
            loanStatus="Active"           // or derive from data if available
            membershipType="Standard"     // or derive if available
            membershipDate={formatDateOnly(data.membership_date) || "—"}
            columnHeadings={columnHeadings}
            rows={rows}
          />
        )}

        {!loading && !error && data === null && (
          <p>No client data to display.</p>
        )}
      </div>
    </div>
  );
};

export default ClientProfileLoanScreen;
