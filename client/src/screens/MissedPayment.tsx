import SearchBar from "../components/Dashboard/SearchBar";
import CustomTable from "../components/Dashboard/CustomTable";
import ButtonCustom from "../components/Dashboard/ButtonCustom";
import Backbutton from "../components/Dashboard/Backbutton";

const MissedPayment = () => {
    return (
        <div className="d-flex" style={{ minHeight: '100vh' }}>
      <div style={{ width: '200px', flexShrink: 0 }}>
        {/* Sidebar or nav placeholder */}
      </div>
      <div
        className="flex-grow-1 d-flex flex-column justify-content-start align-items-start"
        style={{ padding: '40px 20px' }}
      >
        <div className="d-flex align-items-center mb-3" style={{ gap: '12px' }}>
          <Backbutton />
          <h3 className="mb-0">Missed Payments</h3>
        </div>


        {/* row for search + buttons */}
        <div className="d-flex align-items-center w-100 mb-4" style={{ gap: '16px' }}>
          <div style={{ flex: 1 }}>
            <SearchBar />
          </div>

          <ButtonCustom
            text="Export Excel"
            icon="bi bi-file-earmark-excel"
            backgroundColor="#0d7239"
            textColor="#fff"
            borderColor="#0d7239"
            iconSize="20px"
            fontSize="15px"
            height="43px"
          />
        </div>

        <CustomTable
          columnHeadings={[
            'Name',
            'ID',
            'Loan No.',
            'Loan Amount',
            'Due Date',
            'Penalty',
            'Total Amount',
            'Contact No.',
            
          ]}
          rows={[]}
        />
      </div>
    </div>
    )
}

export default MissedPayment