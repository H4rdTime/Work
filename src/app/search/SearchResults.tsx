// app/search/SearchResults.tsx (Клиентский компонент)
'use client'

import { useSearchParams } from 'next/navigation'

export default function SearchResults() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''

  return (
    <div>
      <h1>Результаты поиска для: {query}</h1>
      {/* Остальная клиентская логика */}
    </div>
  )
}