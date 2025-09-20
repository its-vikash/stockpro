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

export default function StocksTable(){
  const { query } = useSearch()
  const [sectorFilter, setSectorFilter] = useState('All')
  const [sortKey, setSortKey] = useState('symbol')
  const [sortDir, setSortDir] = useState('asc')

  const sectors = useMemo(()=> ['All', ...new Set(dummyData.stocks.map(s=>s.sector))], [])

  const filtered = useMemo(()=>{
    let list = dummyData.stocks.filter(s => {
      const q = query.trim().toLowerCase()
      const match = q === '' || s.symbol.toLowerCase().includes(q) || s.name.toLowerCase().includes(q)
      const sectorOK = sectorFilter === 'All' || s.sector === sectorFilter
      return match && sectorOK
    })
    list = sortBy(list, sortKey, sortDir)
    return list
  }, [query, sectorFilter, sortKey, sortDir])

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <label className="text-sm">Sector</label>
          <select value={sectorFilter} onChange={e=>setSectorFilter(e.target.value)} className="px-3 py-2 rounded border">
            {sectors.map(s=> <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm">Sort By</label>
          <select value={sortKey} onChange={e=>setSortKey(e.target.value)} className="px-3 py-2 rounded border">
            <option value="symbol">Symbol</option>
            <option value="name">Name</option>
            <option value="price">Price</option>
            <option value="change">Change</option>
          </select>
          <button className="px-3 py-2 rounded bg-primary text-white" onClick={()=>setSortDir(d=> d==='asc' ? 'desc' : 'asc')}>{sortDir === 'asc' ? 'Asc' : 'Desc'}</button>
        </div>
      </div>

      <div className="overflow-auto bg-white rounded-xl shadow p-2">
        <table className="min-w-full">
          <thead>
            <tr className="text-left border-b">
              <th className="px-4 py-3">Symbol</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Change</th>
              <th className="px-4 py-3">Volume</th>
              <th className="px-4 py-3">Market Cap</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((s,i)=>(
              <tr key={i} className="hover:bg-slate-50">
                <td className="px-4 py-3 font-semibold">{s.symbol}</td>
                <td className="px-4 py-3">{s.name}</td>
                <td className="px-4 py-3">₹{s.price.toFixed(2)}</td>
                <td className={`px-4 py-3 font-semibold ₹{s.change>=0? 'text-secondary':'text-red-500'}`}>{s.change>=0?'+':''}{s.change.toFixed(2)} ({s.changePercent>=0?'+':''}{s.changePercent.toFixed(2)}%)</td>
                <td className="px-4 py-3">{s.volume}</td>
                <td className="px-4 py-3">{s.marketCap}</td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={6} className="text-center p-6">No results</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
