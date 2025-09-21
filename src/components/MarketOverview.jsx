import React from 'react'
import { dummyData } from '../data/dummyData'

export default function MarketOverview(){
  return (
    <section className="mt-10">
      <h2 className="section-title text-2xl font-bold mb-6 bg-gradient-to-r from-primary to-accent2 bg-clip-text text-transparent">Derivatives Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {dummyData.marketIndices.map((idx,i)=>(
          <div key={i} className="bg-white rounded-xl p-4 shadow hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 border-l-4 border-accent2">
            <h3 className="text-sm text-slate-500">{idx.name}</h3>
            <div className="text-xl font-extrabold">{idx.value.toLocaleString()}</div>
            <div className={idx.change>=0? 'text-green-500 font-semibold mt-2 flex items-center':'text-red-500 font-semibold mt-2 flex items-center'}>
              {idx.change>=0? 
                <i className="fas fa-caret-up mr-1"></i> : 
                <i className="fas fa-caret-down mr-1"></i>
              }
              {idx.change>=0?'+':''}{idx.change} ({idx.change>=0?'+':''}{idx.changePercent}%)
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}