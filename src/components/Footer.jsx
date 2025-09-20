import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer(){
  return (
    <footer className="bg-gradient-to-r from-dark to-primary text-white">
      <div className="container mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-accent2 font-bold text-lg mb-4">StockPro</h3>
          <p className="mt-2 text-md">Advanced derivatives trading platform for options and futures traders with real-time analytics.</p>
          <div className="mt-4 flex space-x-4">
            <a href="#" className="text-slate-300 hover:text-accent1 transition-colors duration-200">
              <i className="fab fa-twitter text-xl"></i>
            </a>
            <a href="#" className="text-slate-300 hover:text-accent1 transition-colors duration-200">
              <i className="fab fa-facebook text-xl"></i>
            </a>
            <a href="#" className="text-slate-300 hover:text-accent1 transition-colors duration-200">
              <i className="fab fa-linkedin text-xl"></i>
            </a>
            <a href="#" className="text-slate-300 hover:text-accent1 transition-colors duration-200">
              <i className="fab fa-instagram text-xl"></i>
            </a>
          </div>
        </div>
        <div>
          <h4 className="text-accent2 font-semibold mb-4">Trading</h4>
          <ul className="space-y-2">
            {/* <li><Link to="/" className="text-slate-300 hover:text-accent1 transition-colors duration-200">Dashboard</Link></li> */}
            <li><Link to="/derivatives" className="text-slate-300 hover:text-accent1 transition-colors duration-200">Derivatives</Link></li>
            <li><Link to="/options-chain" className="text-slate-300 hover:text-accent1 transition-colors duration-200">Options Chain</Link></li>
            <li><Link to="/news" className="text-slate-300 hover:text-accent1 transition-colors duration-200">Market News</Link></li>
            <li><Link to="/pricing" className="text-slate-300 hover:text-accent1 transition-colors duration-200">Pricing</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-accent2 font-semibold mb-4">Resources</h4>
          <ul className="space-y-2">
            <li><a href="#" className="text-slate-300 hover:text-accent1 transition-colors duration-200">Learning Center</a></li>
            <li><a href="#" className="text-slate-300 hover:text-accent1 transition-colors duration-200">Market Analysis</a></li>
            <li><a href="#" className="text-slate-300 hover:text-accent1 transition-colors duration-200">Trading Strategies</a></li>
            <li><a href="#" className="text-slate-300 hover:text-accent1 transition-colors duration-200">Webinars</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-accent2 font-semibold mb-4">Support</h4>
          <ul className="space-y-2">
            <li><a href="/support" className="text-slate-300 hover:text-accent1 transition-colors duration-200">Help Center</a></li>
            <li><a href="#" className="text-slate-300 hover:text-accent1 transition-colors duration-200">Contact Us</a></li>
            <li><a href="#" className="text-slate-300 hover:text-accent1 transition-colors duration-200">System Status</a></li>
            <li><a href="#" className="text-slate-300 hover:text-accent1 transition-colors duration-200">FAQ</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center">
          <div className="text-slate-300 text-sm">
            &copy; {new Date().getFullYear()} StockPro. All rights reserved.
          </div>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-slate-300 hover:text-accent1 text-sm transition-colors duration-200">Privacy Policy</a>
            <a href="#" className="text-slate-300 hover:text-accent1 text-sm transition-colors duration-200">Terms of Service</a>
            <a href="#" className="text-slate-300 hover:text-accent1 text-sm transition-colors duration-200">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  )
}