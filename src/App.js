import './App.css';
import Dashboard from './components/Dashboard/Dashboard';
import { BrowserRouter } from 'react-router-dom';
import { RowDataProvider } from './UserContext';
function App() {
  return (
    // <RowDataProvider>
    <BrowserRouter>
      <Dashboard />
    </BrowserRouter>
    // </RowDataProvider>
  );
}

export default App;
