'use client'

import Script from 'next/script'
import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Header from '../components/Header'
import Footer from '../components/Footer'

function SearchResults() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''

  return (
    <main>
      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SearchResultsPage',
            name: 'Поиск',
            description: 'Поиск по сайту АкваСервис',
            url: 'https://aqua-service-karelia.ru/search',
          }),
        }}
      />
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold text-[#218CE9] mb-8">
          Результаты поиска: {query || 'все'}
        </h1>
        {/* ... */}
      </div>
      <Footer />
    </main>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <SearchResults />
    </Suspense>
  )
}