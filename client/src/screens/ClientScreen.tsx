
import TableCard from "../components/Dashboard/TableCard";

const ClientProfileLoanScreen = () => {
  return (
    <div className="d-flex" style={{ minHeight: '100vh' }}>
      <div style={{ width: '200px', flexShrink: 0 }}>
        
      </div>
      <div
        className="flex-grow-1 d-flex flex-column justify-content-start align-items-start"
        style={{ padding: '40px 20px' }}
      >
        <h3>Clients</h3>
        <TableCard />
      </div>
    </div>
  );
};

export default ClientProfileLoanScreen;
