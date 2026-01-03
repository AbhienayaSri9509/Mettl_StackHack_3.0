import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import Home from './pages/Home'
import ProjectDetail from './pages/ProjectDetail'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Cart from './pages/Cart'
import Footer from './components/Footer'
import './App.css'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col transition-colors duration-300 dark:bg-gray-900">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/project/:id" element={<ProjectDetail />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App

