import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import UserDashboard from './pages/UserDashboard';
import ProviderDashboard from './pages/ProviderDashboard';
import RequestForm from './pages/RequestForm';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <header className="App-header">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/SignIn" element={<SignIn />} />
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/UserDashboard" element={<UserDashboard />} />
            <Route path="/ProviderDashboard" element={<ProviderDashboard />} />
            <Route path="/RequestForm" element={<RequestForm />} />
          </Routes>
        </header>
      </BrowserRouter>
    </div>
  );
}

export default App;
