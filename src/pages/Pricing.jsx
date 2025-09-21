import React from 'react'
export default function Pricing(){
  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="section-title text-2xl font-bold mb-4">Pricing</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-xl shadow text-center">
          <h3 className="text-xl font-bold">Free</h3>
          <div className="text-3xl font-extrabold my-3">₹0</div>
          <div>Basic watchlist + dummy data</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow text-center border-2 border-primary">
          <h3 className="text-xl font-bold">Pro</h3>
          <div className="text-3xl font-extrabold my-3">₹19 / mo</div>
          <div>Realtime-feel data & advanced filters</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow text-center">
          <h3 className="text-xl font-bold">Enterprise</h3>
          <div className="text-3xl font-extrabold my-3">Contact</div>
          <div>Team features + SSO</div>
        </div>
      </div>
    </div>
  )
}
