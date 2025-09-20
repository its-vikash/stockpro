import React from 'react'
import { dummyData } from '../data/dummyData'

export default function Statistics(){
  const now = new Date().toLocaleDateString('en-US', { weekday:'long', year:'numeric', month:'long', day:'numeric' })
  return (
    <section className="mt-10">
      <h2 className="section-title text-2xl font-bold mb-6 bg-gradient-to-r from-primary to-accent2 bg-clip-text text-transparent">Market Statistics — {now}</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {dummyData.statistics.map((s,i)=>(
          <div key={i} className="bg-white rounded-xl p-4 text-center shadow hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 group">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-accent1 to-accent2 flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform duration-300">
              <i className={s.icon + " text-white"}></i>
            </div>
            <div className="text-lg font-bold">{s.value}</div>
            <div className="text-sm text-slate-500">{s.title}</div>
          </div>
        ))}
      </div>
    </section>
  )
}