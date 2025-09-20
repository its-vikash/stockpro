import React, { useMemo, useState } from 'react'
import { dummyData } from '../data/dummyData'
import { useSearch } from '../context/SearchContext'

function sortBy(list, key, dir){
  return [...list].sort((a,b)=>{
    const A = typeof a[key] === 'string' ? a[key].toUpperCase() : a[key]
    const B = typeof b[key] === 'string' ? b[key].toUpperCase() : b[key]
    if(A < B) return dir === 'asc' ? -1 : 1
    if(A > B) return dir === 'asc' ? 1 : -1
    return 0
  })
}

export default function DerivativesTable(){
  const { query } = useSearch()
  const [typeFilter, setTypeFilter] = useState('All')
  const [underlyingFilter, setUnderlyingFilter] = useState('All')
  const [sortKey, setSortKey] = useState('symbol')
  const [sortDir, setSortDir] = useState('asc')

  const types = useMemo(()=> ['All', ...new Set(dummyData.derivatives.map(s=>s.type))], [])
  const underlyings = useMemo(()=> ['All', ...new Set(dummyData.derivatives.map(s=>s.underlying))], [])

  const filtered = useMemo(()=>{
    let list = dummyData.derivatives.filter(s => {
      const q = query.trim().toLowerCase()
      const match = q === '' || s.symbol.toLowerCase().includes(q) || s.name.toLowerCase().includes(q)
      const typeOK = typeFilter === 'All' || s.type === typeFilter
      const underlyingOK = underlyingFilter === 'All' || s.underlying === underlyingFilter
      return match && typeOK && underlyingOK
    })
    list = sortBy(list, sortKey, sortDir)
    return list
  }, [query, typeFilter, underlyingFilter, sortKey, sortDir])

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">Type</label>
            <select value={typeFilter} onChange={e=>setTypeFilter(e.target.value)} className="px-3 py-2 rounded border focus:ring-2 ring-accent2 outline-none">
              {types.map(s=> <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">Underlying</label>
            <select value={underlyingFilter} onChange={e=>setUnderlyingFilter(e.target.value)} className="px-3 py-2 rounded border focus:ring-2 ring-accent2 outline-none">
              {underlyings.map(s=> <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">Sort By</label>
          <select value={sortKey} onChange={e=>setSortKey(e.target.value)} className="px-3 py-2 rounded border focus:ring-2 ring-accent2 outline-none">
            <option value="symbol">Symbol</option>
            <option value="name">Name</option>
            <option value="price">Price</option>
            <option value="change">Change</option>
            <option value="volume">Volume</option>
            <option value="openInterest">OI</option>
          </select>
          <button 
            className="px-3 py-2 rounded bg-gradient-to-r from-accent1 to-accent2 text-white hover:shadow-md transition-all duration-300" 
            onClick={()=>setSortDir(d=> d==='asc' ? 'desc' : 'asc')}
          >
            {sortDir === 'asc' ? '↑ Asc' : '↓ Desc'}
          </button>
        </div>
      </div>

      <div className="overflow-auto bg-white rounded-xl shadow-lg p-4 border border-slate-100">
        <table className="min-w-full divide-y divide-slate-200">
          <thead>
            <tr className="text-left border-b border-slate-200">
              <th className="px-4 py-3 font-semibold text-slate-700">Symbol</th>
              <th className="px-4 py-3 font-semibold text-slate-700">Contract</th>
              <th className="px-4 py-3 font-semibold text-slate-700">Price</th>
              <th className="px-4 py-3 font-semibold text-slate-700">Change</th>
              <th className="px-4 py-3 font-semibold text-slate-700">Volume</th>
              <th className="px-4 py-3 font-semibold text-slate-700">OI</th>
              <th className="px-4 py-3 font-semibold text-slate-700">Type</th>
              <th className="px-4 py-3 font-semibold text-slate-700">Expiry</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map((s,i)=>(
              <tr key={i} className="hover:bg-slate-50 transition-colors duration-150 group">
                <td className="px-4 py-3 font-semibold group-hover:text-accent2 transition-colors duration-150">{s.symbol}</td>
                <td className="px-4 py-3 text-sm">{s.name}</td>
                <td className="px-4 py-3 font-medium">₹{s.price.toFixed(2)}</td>
                <td className={`px-4 py-3 font-semibold ${s.change>=0? 'text-green-500':'text-red-500'} flex items-center`}>
                  {s.change>=0? 
                    <i className="fas fa-caret-up mr-1"></i> : 
                    <i className="fas fa-caret-down mr-1"></i>
                  }
                  {s.change>=0?'+':''}{s.change.toFixed(2)} ({s.changePercent>=0?'+':''}{s.changePercent.toFixed(2)}%)
                </td>
                <td className="px-4 py-3">{s.volume}</td>
                <td className="px-4 py-3">{s.openInterest}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${s.type === 'Call' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {s.type}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm">{s.expiry}</td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={8} className="text-center p-6 text-slate-500">No derivatives found matching your criteria</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}