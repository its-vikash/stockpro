export const dummyData = {
  marketIndices: [
    { name: 'NIFTY 50', value: 19856.45, change: 124.35, changePercent: 0.63 },
    { name: 'BANK NIFTY', value: 45236.75, change: 356.25, changePercent: 0.79 },
    { name: 'NIFTY FIN SERVICE', value: 20568.32, change: 145.68, changePercent: 0.71 },
    { name: 'INDIA VIX', value: 12.45, change: -0.65, changePercent: -4.96 }
  ],
  derivatives: [
    { symbol: 'NIFTY23SEP19800CE', name: 'NIFTY SEP 19800 CE', price: 86.45, change: 12.35, changePercent: 16.67, volume: '2.5L', openInterest: '15.2L', underlying: 'NIFTY', expiry: '28-SEP-2023', strike: 19800, type: 'Call' },
    { symbol: 'BANKNIFTY23SEP45200PE', name: 'BANKNIFTY SEP 45200 PE', price: 124.75, change: -8.25, changePercent: -6.21, volume: '1.8L', openInterest: '9.6L', underlying: 'BANKNIFTY', expiry: '28-SEP-2023', strike: 45200, type: 'Put' },
    { symbol: 'RELIANCE23SEP2500CE', name: 'RELIANCE SEP 2500 CE', price: 32.50, change: 5.75, changePercent: 21.49, volume: '85K', openInterest: '3.2L', underlying: 'RELIANCE', expiry: '28-SEP-2023', strike: 2500, type: 'Call' },
    { symbol: 'HDFCBANK23OCT1650PE', name: 'HDFCBANK OCT 1650 PE', price: 28.90, change: 3.45, changePercent: 13.55, volume: '72K', openInterest: '2.8L', underlying: 'HDFCBANK', expiry: '26-OCT-2023', strike: 1650, type: 'Put' },
    { symbol: 'INFY23SEP1450CE', name: 'INFOSYS SEP 1450 CE', price: 22.75, change: -1.25, changePercent: -5.21, volume: '68K', openInterest: '2.1L', underlying: 'INFY', expiry: '28-SEP-2023', strike: 1450, type: 'Call' },
    { symbol: 'TATAMOTORS23OCT620CE', name: 'TATAMOTORS OCT 620 CE', price: 18.35, change: 4.20, changePercent: 29.69, volume: '95K', openInterest: '3.5L', underlying: 'TATAMOTORS', expiry: '26-OCT-2023', strike: 620, type: 'Call' }
  ],
  trendingDerivatives: [
    { symbol: 'NIFTY23SEP19800CE', price: 86.45, change: 12.35, changePercent: 16.67 },
    { symbol: 'BANKNIFTY23SEP45200PE', price: 124.75, change: -8.25, changePercent: -6.21 },
    { symbol: 'RELIANCE23SEP2500CE', price: 32.50, change: 5.75, changePercent: 21.49 },
    { symbol: 'HDFCBANK23OCT1650PE', price: 28.90, change: 3.45, changePercent: 13.55 },
    { symbol: 'TATAMOTORS23OCT620CE', price: 18.35, change: 4.20, changePercent: 29.69 },
    { symbol: 'SBIN23SEP600CE', price: 15.80, change: 2.75, changePercent: 21.05 }
  ],
  statistics: [
    { title: 'Total Open Interest', value: '₹2.8Cr', icon: 'fas fa-chart-line' },
    { title: 'Options Volume', value: '15.2L', icon: 'fas fa-exchange-alt' },
    { title: 'Call OI', value: '1.2Cr', icon: 'fas fa-arrow-up' },
    { title: 'Put OI', value: '98.5L', icon: 'fas fa-arrow-down' },
    { title: 'PCR Ratio', value: '0.82', icon: 'fas fa-balance-scale' },
    { title: 'IV Percentile', value: '68%', icon: 'fas fa-percentage' }
  ],
  notifications: [
    { title: 'NIFTY 19800 Call option volume surge detected', time: '10 mins ago', icon: 'fas fa-bell' },
    { title: 'Market update: Derivative positions building up', time: '30 mins ago', icon: 'fas fa-chart-line' },
    { title: 'Your watchlist: BANKNIFTY Put options moved more than 6%', time: '1 hour ago', icon: 'fas fa-star' },
    { title: 'New: Weekly expiry positions data available', time: '2 hours ago', icon: 'fas fa-file-alt' }
  ],
  testimonials: [
    { name: 'Rahul Sharma', role: 'Options Trader', text: "The options chain visualization helped me identify the perfect strike price for my strategy.", avatar: 'RS' },
    { name: 'Priya Patel', role: 'Derivatives Analyst', text: "My clients love the clear OI and volume data that helps in making informed decisions.", avatar: 'PP' },
    { name: 'Vikram Singh', role: 'F&O Trainer', text: "As someone who teaches about derivatives, I appreciate how this platform makes complex data accessible.", avatar: 'VS' }
  ]
}