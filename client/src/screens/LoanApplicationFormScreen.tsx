import ApplicationForm from "../components/Dashboard/ApplicationForm"

const LoanApplicationFormScreen = () => {
    return(
        <div >
            <h3 style={{display: "flex",
            flexDirection: "column",
            width: "100%",
            marginLeft: "200px",
            paddingTop: "45px",
            paddingLeft: '20px'}}>Loan Application</h3>
            <ApplicationForm onNext={function (): void {
                throw new Error("Function not implemented.")
            } } />
        </div>
    )
}

export default LoanApplicationFormScreen