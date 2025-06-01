import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Context


// Pages
import Adoption from './pages/Adoption';
import Home from './pages/Home';
import ProductDetail from './pages/Product';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import ResetPassword from './pages/ResetPassword';
import Pets from './pages/pets';
import Vet from './pages/vet';

function App() {
  return (
    
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/pets" element={<Pets />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/home" element={<Home />} />
          <Route path="/product" element={<ProductDetail />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/vet" element={<Vet />} />
          <Route path='adoption' element={<Adoption />} />
        </Routes>
      </Router>
    
  );
}

export default App;
