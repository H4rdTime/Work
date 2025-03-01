// components/SchemaOrganization.tsx
export const SchemaOrganization = () => (
    <script type="application/ld+json">
      {JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "АкваСервис",
        "url": "https://aqua-service-karelia.ru/",
        "logo": "https://aqua-service-karelia.ru/images/logo.png",
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+7-8142-27-05-45",
          "contactType": "customer service"
        }
      })}
    </script>
  );