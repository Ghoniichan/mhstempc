import InformationCard from "../components/Dashboard/InformationCard";
import axios from '../api/axiosInstance';
import { useState, useEffect } from "react";

const fetchClientInfo = async (policyNo: string) => {
  try {
    const { data } = await axios.get(`/api/user/${policyNo}`);
    return data;
  } catch (error) {
    console.error("Error fetching client information:", error);
    return null;
  }
};

const fetchLoansByPN = async (policyNo: string) => {
  try {
    const { data } = await axios.get(`/api/loans/by-policy/${policyNo}`);
    // If your endpoint returns a single object, wrap it in an array:
    return Array.isArray(data) ? data : [data];
  } catch (error) {
    console.error("Error fetching loans:", error);
    return [];
  }
};

const formatDateOnly = (isoString?: string): string =>
  isoString ? isoString.split('T')[0] : "";

const ClientProfileLoanScreen = () => {
  interface Client {
    first_name?: string;
    middle_name?: string;
    last_name?: string;
    present_address?: string;
    tel_cel_no?: string;
    membership_date?: string;
    // Add other fields as needed based on your API response
  }
  
  const [client, setClient] = useState<Client | null>(null);

  interface Loan {
    date?: string;
    or?: string | number;
    interest?: number;
    service_fee?: number;
    fines?: number;
    due_date?: string;
    received_amount?: number;
    // Add other fields as needed based on your API response
  }

  const [loans, setLoans] = useState<Loan[]>([]);
  const [loadingClient, setLoadingClient] = useState(false);
  const [loadingLoans, setLoadingLoans] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const policy = localStorage.getItem('selectedPolicyNumber') || "";

  useEffect(() => {
    if (!policy) {
      setError("No policy number provided.");
      return;
    }

    let mounted = true;

    const loadAll = async () => {
      setLoadingClient(true);
      setError(null);

      const clientData = await fetchClientInfo(policy);
      if (!mounted) return;

      if (clientData) {
        setClient(clientData);
      } else {
        setError("No client data found for the given policy number");
      }
      setLoadingClient(false);

      // now fetch loans
      setLoadingLoans(true);
      const loanData = await fetchLoansByPN(policy);
      if (!mounted) return;
      setLoans(loanData);
      setLoadingLoans(false);
    };

    loadAll();
    return () => { mounted = false; };
  }, [policy]);

  const columnHeadings = [
    'Date',
    'OR',
    'Interest',
    'Service Fee',
    'Fines',
    'Due Date',
    'Received Amount'
  ];

  // transform your loan objects into rows of strings/cells
  const rows = loans.map(loan => [
    formatDateOnly(loan.date),
    String(loan.or),
    `₱${loan.interest}`,
    `₱${loan.service_fee}`,
    `₱${loan.fines}`,
    formatDateOnly(loan.due_date),
    `₱${loan.received_amount}`
  ]);

  return (
    <div className="d-flex">
      <div style={{ width: '200px', flexShrink: 0 }}>
        {/* <Sidebar /> */}
      </div>
      <div
        className="flex-grow-1 d-flex flex-column justify-content-start align-items-start"
        style={{ padding: '40px 20px' }}
      >
        <h3>Client Profile</h3>

        {(loadingClient || loadingLoans) && <p>Loading...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        {!loadingClient && !loadingLoans && !error && client && (
          <InformationCard
            name={`${client.first_name ?? ""} ${client.middle_name ?? ""} ${client.last_name ?? ""}`.trim() || "—"}
            title="Client Loan Profile"
            department="Finance"
            policyNumber={policy}
            address={client.present_address || "—"}
            contactNumber={client.tel_cel_no || "—"}
            loanStatus="Active"
            membershipType="Standard"
            membershipDate={formatDateOnly(client.membership_date) || "—"}
            columnHeadings={columnHeadings}
            rows={rows}
          />
        )}
      </div>
    </div>
  );
};

export default ClientProfileLoanScreen;
