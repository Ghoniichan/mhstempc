import ApplicationFormSecond from "../components/Dashboard/ApplicationFormSecond"

const LoanAppFormTwo = () => {
    return(
        <div>
            <h3 style={{display: "flex",
            flexDirection: "column",
            width: "100%",
            marginLeft: "200px",
            paddingTop: "45px",
            paddingLeft: '20px'}}>Loan Application</h3>
            <ApplicationFormSecond onCancel={function (): void {
                throw new Error("Function not implemented.")
            } } />
        </div>
    )
}

export default LoanAppFormTwo