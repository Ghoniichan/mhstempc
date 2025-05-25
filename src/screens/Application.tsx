import CustomTable from "../components/Dashboard/CustomTable"

const Application = () => {
    return (
        <div>
            <CustomTable 
            columnHeadings={['Name', 'ID', 'Loan No.', 'Loan Amount', 'Date Release', 'Approve by', 'Due Date', 'Approval Status', 'Update Status']} 
            rows={[]} />
        </div>
    )
}

export default Application