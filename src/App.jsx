import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { SearchProvider } from './context/SearchContext'
import Header from './components/Header'
import Footer from './components/Footer'
import Dashboard from './pages/Dashboard'
import Derivatives from './pages/Derivatives'
import OptionsChain from './pages/OptionsChain'
import News from './pages/News'
import Pricing from './pages/Pricing'
import Support from './pages/Support'
import Login from './pages/Login'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'
import AuthGuard from './components/AuthGuard'
import './index.css'

function App() {
  return (
    <SearchProvider>
      <div className="App bg-slate-50 min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route
              path="/derivatives"
              element={
                <AuthGuard>
                  <Derivatives />
                </AuthGuard>
              }
            />
            <Route path="/options-chain" element={<OptionsChain />} />
            <Route path="/news" element={<News />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/support" element={<Support />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </SearchProvider>
  )
}

export default App
