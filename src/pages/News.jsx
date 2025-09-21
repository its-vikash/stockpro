import React from 'react'
import { dummyData } from '../data/dummyData'

export default function News(){
  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="section-title text-2xl font-bold mb-6 bg-gradient-to-r from-primary to-accent2 bg-clip-text text-transparent">Derivatives News & Analysis</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {dummyData.notifications.map((n,i)=>(
          <div key={i} className="bg-white p-5 rounded-xl shadow hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-l-4 border-accent2">
            <h4 className="font-semibold text-lg mb-2">{n.title}</h4>
            <div className="text-sm text-slate-500 flex items-center">
              <i className="far fa-clock mr-2"></i>
              {n.time}
            </div>
            <p className="mt-3 text-slate-700">Latest market movements and analysis for derivatives traders. Stay updated with the changing market sentiments.</p>
            <button className="mt-4 px-4 py-2 bg-gradient-to-r from-accent1 to-accent2 text-white rounded-md hover:shadow-md transition-all duration-300">
              Read More
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}