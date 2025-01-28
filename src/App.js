import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom'; // Import Routes instead of Switch
import Admin from './views/Admin';
import Mint from './views/Mint';
import Test from './views/Text';
import Test2 from './views/Test2';
import LogIn from './views/Login';
import Dashboard from './views/Dashboard';
import AllUsers from './views/AllUsers';

/* Moralis.start({
  apiKey: process.env.REACT_APP_MORALIS_APY_KEY,
}); */

function App() {
  return (
    <Router>
      <Routes> {/* Use Routes instead of Switch */}
        <Route path="/" element={<Mint />} /> {/* Use 'element' prop */}
        <Route path="/test" element={<Test />} />
        <Route path="/test2" element={<Test2 />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin/all-users/cario" element={<AllUsers />} />
      </Routes>
    </Router>
  );
}

export default App;
