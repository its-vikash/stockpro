import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useSearch } from '../context/SearchContext'
import { dummyData } from '../data/dummyData'
import classNames from 'classnames'
import { Search, Bell, User, LogOut, ChevronDown } from 'lucide-react'

export default function Header(){
  const { query, setQuery } = useSearch()
  const [userOpen, setUserOpen] = React.useState(false)
  const [notifOpen, setNotifOpen] = React.useState(false)
  const [searchSuggestions, setSearchSuggestions] = React.useState([])
  const [showSuggestions, setShowSuggestions] = React.useState(false)
  const navigate = useNavigate()
  const loc = useLocation()
  const userMenuRef = useRef(null)
  const notifMenuRef = useRef(null)
  const searchRef = useRef(null)

  // Check authentication status
  const isAuthenticated = localStorage.getItem('authToken')

  function onSearch(e){
    const value = e.target.value
    setQuery(value)
    
    // Show search suggestions
    if (value.length > 0) {
      const filtered = dummyData.derivatives.filter(item => 
        item.symbol.toLowerCase().includes(value.toLowerCase()) || 
        item.name.toLowerCase().includes(value.toLowerCase())
      )
      setSearchSuggestions(filtered.slice(0, 5))
      setShowSuggestions(true)
    } else {
      setShowSuggestions(false)
    }
  }

  function handleSuggestionClick(suggestion) {
    setQuery(suggestion.symbol)
    setShowSuggestions(false)
    if(loc.pathname !== '/derivatives') navigate('/derivatives')
  }

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserOpen(false)
      }
      if (notifMenuRef.current && !notifMenuRef.current.contains(event.target)) {
        setNotifOpen(false)
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  useEffect(() => {
    setUserOpen(false)
    setNotifOpen(false)
    setShowSuggestions(false)
  }, [loc])

  const handleLogout = () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('rememberMe')
    navigate('/login')
  }

  return (
    <header className="header-main bg-gradient-to-r from-dark to-primary text-white shadow-lg">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <i className="fas fa-chart-line text-accent2 text-2xl animate-pulse"></i>
          <Link to="/" className="header-logo-text text-xl font-extrabold bg-gradient-to-r from-accent1 to-accent2 bg-clip-text text-transparent">StockPro</Link>
        </div>

        <nav className="hidden md:block">
          <ul className="flex items-center gap-6">
            <li><Link to="/" className={classNames('px-3 py-2 rounded-lg transition-all duration-300 hover:bg-white/10 hover:scale-105', { 'bg-white/10 text-accent2 shadow-lg': loc.pathname==='/' })}>Dashboard</Link></li>
            <li><Link to="/derivatives" className={classNames('px-3 py-2 rounded-lg transition-all duration-300 hover:bg-white/10 hover:scale-105', { 'bg-white/10 text-accent2 shadow-lg': loc.pathname==='/derivatives' })}>Derivatives</Link></li>
            <li><Link to="/options-chain" className={classNames('px-3 py-2 rounded-lg transition-all duration-300 hover:bg-white/10 hover:scale-105', { 'bg-white/10 text-accent2 shadow-lg': loc.pathname==='/options-chain' })}>Options Chain</Link></li>
            <li><Link to="/news" className={classNames('px-3 py-2 rounded-lg transition-all duration-300 hover:bg-white/10 hover:scale-105', { 'bg-white/10 text-accent2 shadow-lg': loc.pathname==='/news' })}>News</Link></li>
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <div className="relative" ref={searchRef}>
            <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 transition-all duration-300 hover:bg-white/15 focus-within:ring-2 ring-accent2">
              <Search className="h-4 w-4 text-accent1" />
              <input 
                className="bg-transparent outline-none placeholder-white/70 text-white w-48 md:w-64" 
                value={query} 
                onChange={onSearch} 
                placeholder="Search derivatives, symbols..." 
              />
            </div>
            
            {showSuggestions && searchSuggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white text-slate-900 rounded-xl shadow-xl overflow-hidden z-50 border border-slate-200">
                {searchSuggestions.map((item, index) => (
                  <div 
                    key={index} 
                    className="px-4 py-3 hover:bg-slate-50 cursor-pointer transition-colors duration-200 border-b border-slate-100 last:border-b-0"
                    onClick={() => handleSuggestionClick(item)}
                  >
                    <div className="font-semibold">{item.symbol}</div>
                    <div className="text-sm text-slate-500">{item.name}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="relative" ref={notifMenuRef}>
            <button onClick={()=>setNotifOpen(n=>!n)} className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center relative hover:bg-white/15 transition-all duration-300 hover:scale-110">
              <Bell className="h-5 w-5 text-accent1" />
              <span className="absolute -top-2 -right-2 bg-accent2 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center animate-bounce">{dummyData.notifications.length}</span>
            </button>
            <div className={classNames('absolute right-0 mt-2 w-72 bg-white text-slate-900 rounded-xl shadow-xl overflow-hidden transition-all z-50 border border-slate-200', { 'hidden': !notifOpen })}>
              <div className="px-4 py-2 font-semibold border-b bg-slate-50">Notifications</div>
              <div className="max-h-56 overflow-y-auto">
                {dummyData.notifications.map((n,i)=>(
                  <div key={i} className="flex items-start gap-3 px-4 py-3 hover:bg-slate-50 transition-colors duration-200 border-b border-slate-100 last:border-b-0">
                    <i className={n.icon + " text-primary mt-1"}></i>
                    <div>
                      <div className="font-medium">{n.title}</div>
                      <div className="text-sm text-slate-500">{n.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {isAuthenticated ? (
            <div className="relative" ref={userMenuRef}>
              <div onClick={()=>setUserOpen(u=>!u)} className="flex items-center gap-2 cursor-pointer group">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-accent1 to-accent2 text-dark font-bold flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                  <User className="h-5 w-5" />
                </div>
                <div className="hidden md:flex items-center">
                  <span>Vikash Singh</span>
                  <ChevronDown className={`h-4 w-4 ml-1 transition-transform ${userOpen ? 'rotate-180' : ''}`} />
                </div>
              </div>
              <div className={classNames('absolute right-0 mt-2 w-48 bg-white text-slate-900 rounded-xl shadow-xl overflow-hidden transition-all z-50 border border-slate-200', { 'hidden': !userOpen })}>
                <button onClick={handleLogout} className="w-full text-left px-4 py-3 hover:bg-slate-50 transition-colors duration-200 flex items-center">
                  <LogOut className="h-4 w-4 mr-2 text-primary" />
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login" className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors duration-300">Login</Link>
              <Link to="/register" className="px-3 py-2 rounded-lg bg-accent2 text-dark hover:bg-accent1 transition-colors duration-300">Register</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}