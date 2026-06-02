import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Table from './components/table'
import './App.css'
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import Users from "./pages/user";

function App() {
  

  return (
    <>
    <BrowserRouter>
      
     

      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/users" element={<Users />} />

      </Routes>
    </BrowserRouter>
      
    </>
  )
}

export default App
