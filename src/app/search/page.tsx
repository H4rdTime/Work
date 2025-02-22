'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'

function SearchResults() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''

  return (
    <div>
      <h1>Результаты поиска для: {query}</h1>
      {/* ... */}
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <SearchResults />
    </Suspense>
  )
}