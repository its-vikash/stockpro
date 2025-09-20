import React from 'react'
import Marquee from '../components/Marquee'
import MarketOverview from '../components/MarketOverview'
import Statistics from '../components/Statistics'
import Testimonials from '../components/Testimonials'
import TopDerivatives from '../components/TopDerivatives'
import QuickActions from '../components/QuickActions'

export default function Dashboard(){
  return (
    <>
      <Marquee />
      <div className="container mx-auto px-4 py-6">
        <MarketOverview />
        <Statistics />
        
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <h2 className="section-title text-2xl font-bold mb-6 bg-gradient-to-r from-primary to-accent2 bg-clip-text text-transparent">Top Derivatives</h2>
            <TopDerivatives />
          </div>
          
          <div>
            <h2 className="section-title text-2xl font-bold mb-6 bg-gradient-to-r from-primary to-accent2 bg-clip-text text-transparent">Quick Actions</h2>
            <QuickActions />
          </div>
        </div>
        
        <div className="mt-10">
          <h2 className="section-title text-2xl font-bold mb-6 bg-gradient-to-r from-primary to-accent2 bg-clip-text text-transparent">Market News</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-lg font-semibold mb-3">NIFTY Reaches All-Time High</h3>
              <p className="text-gray-600">The NIFTY index closed at a record high today, driven by strong performance in the banking sector.</p>
              <div className="mt-4 text-sm text-gray-500">2 hours ago</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-lg font-semibold mb-3">New Derivatives Products Launch</h3>
              <p className="text-gray-600">The exchange announced new weekly options contracts for several popular stocks.</p>
              <div className="mt-4 text-sm text-gray-500">5 hours ago</div>
            </div>
          </div>
        </div>
      </div>    
      <Testimonials />
    </>
  )
}