import { Suspense } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import SearchResults from './SearchResults'

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>
}) {
  const query = (await searchParams).q || ''

  return (
    <main>
      <script
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
        <Suspense fallback={<div>Загрузка...</div>}>
           <SearchResults />
        </Suspense>
      </div>
      <Footer />
    </main>
  )
}