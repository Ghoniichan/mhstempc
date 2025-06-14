import { useNavigate, useLocation } from "react-router-dom";
import SimpleCard from "../components/Dashboard/SimpleCard";
import { useEffect, useState } from "react";

const Dashboard = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [userRole, setUserRole] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getUserRole = () => {
            const storedRole = localStorage.getItem('token');
            if (storedRole) {
                const decodedToken = JSON.parse(atob(storedRole.split('.')[1]));
                const isAdmin = decodedToken.user.isAdmin;
                const role = isAdmin ? 'admin' : 'user';
                setUserRole(role);
                setIsLoading(false);
            }
        };

        getUserRole();
    }, []);

    useEffect(() => {
        let title = "MHSTEMPC";

        if (userRole === 'admin') {
            if (location.pathname === '/application') {
                title = "MHSTEMPC | Applications";
            } else if (location.pathname === '/loans') {
                title = "MHSTEMPC | Loans";
            } else if (location.pathname === '/payment') {
                title = "MHSTEMPC | Payment";
            } else if (location.pathname === '/missedPayment') {
                title = "MHSTEMPC | Missed Payment";
            } else {
                title = "MHSTEMPC | Admin Dashboard";
            }
        } else if (userRole === 'user') {
            if (location.pathname === '/userLoan') {
                title = "MHSTEMPC | My Loan";
            } else if (location.pathname === '/userCapitalShare') {
                title = "MHSTEMPC | Capital Share";
            } else if (location.pathname === '/userSavings') {
                title = "MHSTEMPC | Savings";
            } else {
                title = "MHSTEMPC | My Dashboard";
            }
        }

        document.title = title;
    }, [location.pathname, userRole]);

    if (isLoading) {
        return (
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                paddingLeft: "200px"
            }}>
                <h3>Loading Dashboard...</h3>
            </div>
        );
    }

    const dashboardWrapperStyle: React.CSSProperties = {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        padding: "45px 20px",
        boxSizing: "border-box",
        marginLeft: window.innerWidth > 768 ? "200px" : "0",
    };

    const cardContainerStyle: React.CSSProperties = {
        display: "flex",
        flexWrap: "wrap",
        gap: "16px",
        justifyContent: "flex-start",
    };

    const renderAdminDashboard = () => (
        <>
            <h3 style={{ marginBottom: "20px" }}>Dashboard</h3>
            <div style={cardContainerStyle}>
                <SimpleCard title="Applications" onClick={() => navigate('/application')} />
                <SimpleCard title="Loans" onClick={() => navigate('/loans')} />
                <SimpleCard title="Payment" onClick={() => navigate('/payment')} />
                <SimpleCard title="Missed Payment" onClick={() => navigate('/missedPayment')} />
            </div>
        </>
    );

    const renderUserDashboard = () => (
        <>
            <h3 style={{ marginBottom: "20px" }}>My Dashboard</h3>
            <div style={cardContainerStyle}>
                <SimpleCard title="Loan" onClick={() => navigate('/userLoan')} />
                <SimpleCard title="Capital Share" onClick={() => navigate('/userCapitalShare')} />
                <SimpleCard title="Savings" onClick={() => navigate('/userSavings')} />
            </div>
        </>
    );

    return (
        <div style={{ overflowX: "hidden" }}>
            <div style={dashboardWrapperStyle}>
                {userRole === 'admin' ? renderAdminDashboard() : renderUserDashboard()}
            </div>
        </div>
    );
};

export default Dashboard;
