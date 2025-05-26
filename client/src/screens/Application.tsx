import SearchBar from "../components/Dashboard/SearchBar"
import CustomTable from "../components/Dashboard/CustomTable"

const Application = () => {
    return (
        <div className="d-flex" style={{ minHeight: '100vh' }}>
      <div style={{ width: '200px', flexShrink: 0 }}>
        
      </div>
      <div
        className="flex-grow-1 d-flex flex-column justify-content-start align-items-start"
        style={{ padding: '40px 20px' }}
      >
        <h1>Applications</h1>

        <div>
            <SearchBar />
        </div>
        
        <CustomTable 
        columnHeadings={['Name', 'ID', 'Loan No.', 'Loan Amount', 'Date Release', 'Approve by', 'Due Date', 'Approval Status', 'Update Status']} 
        rows={[]} />
      </div>
    </div>
    )
}

export default Application