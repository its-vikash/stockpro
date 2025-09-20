import React from 'react'
import MarketOverview from '../components/MarketOverview'
import StocksTable from '../components/StocksTable'

export default function Markets(){
  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="section-title text-2xl font-bold mb-4">Markets</h2>
      <MarketOverview />
      <section className="mt-10">
        <h3 className="text-xl font-semibold mb-3">Stocks Table</h3>
        <StocksTable />
      </section>
    </div>
  )
}
