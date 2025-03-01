module.exports = {
    siteUrl: 'https://aqua-service-karelia.ru/',
    generateRobotsTxt: true,
    exclude: ['/server-sitemap.xml'], 
    robotsTxtOptions: {
      policies: [
        { userAgent: '*', allow: '/' },
        { userAgent: 'Yandex', allow: '/' }
      ],
      additionalSitemaps: [
        'https://aqua-service-karelia.ru/server-sitemap.xml',
      ],
    },
  };