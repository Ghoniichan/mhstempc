import ApplicationForm from "../components/Dashboard/ApplicationForm"

const LoanApplicationFormScreen = () => {
    return(
        <div style={{
            marginLeft: '130px',
            paddingTop: "45px",
            paddingLeft: '10px',
            paddingRight: '20px',
            maxWidth: 'calc(100vw - 240px)',
            boxSizing: 'border-box'
        }}>
            <h3 style={{
            margin: '10px',
            width: "100%",
            paddingLeft: '80px'
            }}>Loan Application</h3>
            <ApplicationForm/>
        </div>
    )
}

export default LoanApplicationFormScreen