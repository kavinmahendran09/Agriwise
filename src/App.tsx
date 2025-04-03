import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Chatbot from './pages/Chatbot';
import UserForm from './pages/UserForm';
import Dashboard from './pages/Dashboard';
import OpenMarket from './pages/OpenMarket'; 
import PricePrediction from './pages/PrircePrediction';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/open-market" element={<OpenMarket />} /> {/* Add OpenMarket Route */}
        <Route path="/user-form" element={<UserForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/price-prediction" element={<PricePrediction />} /> {/* Add PricePrediction Route */}
      </Routes>
    </Router>
  );
};

export default App;
