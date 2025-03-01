// components/LocalBusinessSchema.tsx
export const LocalBusinessSchema = () => (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "АкваСервис",
          "image": "https://aqua-service-karelia.ru/logo.jpg",
          "priceRange": "от 20 000 ₽",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "ул. Коммунистов, д.50, стр.2",
            "addressLocality": "Петрозаводск",
            "addressRegion": "Карелия",
            "postalCode": "185035"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 61.785474,
            "longitude": 34.346939
          }
        })
      }}
    />
  );