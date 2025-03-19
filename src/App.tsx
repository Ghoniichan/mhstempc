import './App.css'
import Sidebar from './components/Dashboard/Sidebar'




function App() {

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <Sidebar />
        
        {/* Main Content */}
        <div className="col p-4">
          <h2>Main Content</h2>
          <p>This is the main content area.</p>
        </div>
      </div>
    </div>
  )
}

export default App
