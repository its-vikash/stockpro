import React from 'react';
import MarketOverview from '../components/MarketOverview';
import DerivativesDataTable from '../components/DerivativesDataTable';
import AuthGuard from '../components/AuthGuard';

export default function Derivatives(){
  return (
    <AuthGuard>
      <div className="container mx-auto px-4 py-6">
        {/* <h2 className="section-title text-2xl font-bold mb-6 bg-gradient-to-r from-primary to-accent2 bg-clip-text text-transparent">Derivatives Market</h2> */}
        <MarketOverview />
        <DerivativesDataTable />
      </div>
    </AuthGuard>
  );
}