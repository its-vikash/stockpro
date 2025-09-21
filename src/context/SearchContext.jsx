import React, { createContext, useContext, useState } from 'react'

const SearchContext = createContext()

export function useSearch() {
  const context = useContext(SearchContext)
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider')
  }
  return context
}

export function SearchProvider({ children }) {
  const [query, setQuery] = useState('')

  const value = {
    query,
    setQuery
  }

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  )
}