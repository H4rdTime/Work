// src/app/search/page.tsx
export default function SearchPage({
    searchParams,
  }: {
    searchParams: { q: string }
  }) {
    return (
      <div className="container mx-auto p-4">
        <h1>Результаты поиска: {searchParams.q}</h1>
        {/* Добавьте логику отображения результатов */}
      </div>
    )
  }