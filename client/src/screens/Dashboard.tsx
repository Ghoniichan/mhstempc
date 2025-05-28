import { useNavigate } from "react-router-dom"
import SimpleCard from "../components/Dashboard/SimpleCard"

const Dashboard = () => {
    const navigate = useNavigate();

    return (
        <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        marginLeft: "200px", 
        padding: "45px 20px 450px 25px",
        boxSizing: "border-box",
      }}
    >
      {/* Page Title */}
      <h3 style={{ marginBottom: "20px" }}>Dashboard</h3>

      {/* Cards */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
        }}
      >
        <SimpleCard title="Applications" onClick={() => navigate('/application')}/>
        <SimpleCard title="Loans" onClick={() => navigate('/loans')}/>
        <SimpleCard title="Payment" onClick={() => navigate('/payment')}/>
        <SimpleCard title="Missed Payment" onClick={() => navigate('/missedPayment')}/>
      </div>
    </div>
    )
}

export default Dashboard