
import './App.css';
import Login from './login';
import Dashboard from './Dashboard';
import { Routes, Route } from "react-router-dom"
function App() {
  return (

    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
