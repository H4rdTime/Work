# 🧪 SITE TESTING SCRIPTS

Набор тестовых скриптов для проверки функциональности, SEO и производительности сайта.

---

## 📋 **СКРИПТ 1: test-site-health.js**

### Что проверяет:
✅ **Page Status Checks** - доступность всех основных страниц  
✅ **Meta Tags** - og:title, og:description, og:image, viewport, charset  
✅ **JSON-LD Schemas** - структурированные данные для SEO  
✅ **Performance Indicators** - наличие WebVitals, Image optimization, Dynamic imports  
✅ **Content Quality** - количество изображений и внутренних ссылок  

### Как запустить:

```bash
# Локально (development)
node test-site-health.js http://localhost:3000

# На production (после deploy)
node test-site-health.js https://aqua-service-karelia.ru
```

### Пример вывода:

```
✅ Homepage - Status: 200 (245ms, 156KB)
✅ Blog - Status: 200 (320ms, 245KB)
✅ About - Status: 200 (189ms, 124KB)
✅ Contacts - Status: 200 (156ms, 98KB)

✓ og:title found
✓ og:description found
✓ og:image found
✅ Homepage - All meta tags present

✓ Schema 1: BlogPosting
✓ Schema 2: BreadcrumbList
✅ Blog post - Found 2 JSON-LD schema(s)

✓ WebVitalsComponent
✓ Next Image Optimization
✓ Dynamic imports
✅ Performance optimizations detected (4/5)

📈 Success Rate: 92% (23/25 tests)
🟢 HEALTH STATUS: EXCELLENT
```

---

## 🚀 **СКРИПТ 2: test-performance.js**

### Что проверяет:
📊 **Core Web Vitals** - FCP, LCP, CLS, TTFB, INP  
📄 **Page Load Metrics** - время загрузки, размер, количество ресурсов  
🎯 **Health Score** - общая оценка производительности сайта  
💡 **Recommendations** - рекомендации по оптимизации  

### Как запустить:

```bash
# Локально
node test-performance.js http://localhost:3000

# На production
node test-performance.js https://aqua-service-karelia.ru
```

### Пример вывода:

```
⚡ CORE WEB VITALS (Google Standards):
─────────────────────────────────────────────────
FCP    🟢 GOOD               1.20s    First Contentful Paint
LCP    🟢 GOOD               2.10s    Largest Contentful Paint
CLS    🟢 GOOD               0.05     Cumulative Layout Shift
TTFB   🟢 GOOD               0.40s    Time to First Byte
INP    🟢 GOOD               0.15s    Interaction to Next Paint

📄 PAGE PERFORMANCE DETAILS:
1. Homepage (http://localhost:3000/)
   Load Time: 1250ms | DOM Content: 890ms
   Size: 245KB | Resources: 42

2. Blog (http://localhost:3000/blog)
   Load Time: 1680ms | DOM Content: 1120ms
   Size: 380KB | Resources: 58

🎯 OVERALL HEALTH SCORE:
Score: ██████████░░░░░░░░ 92/100
🟢 STATUS: EXCELLENT - Your site is performing great!

📋 NEXT STEPS:
1. Deploy changes to Vercel: git push
2. Run Lighthouse: npx lighthouse https://aqua-service-karelia.ru --view
3. Monitor WebVitals in Google Analytics 4
4. Execute SQL migration in Supabase
```

---

## 📊 **КАЖДЫЙ СКРИПТ ГЕНЕРИРУЕТ:**

### HTML вывод в консоль:
- 🎨 Цветной вывод (green/yellow/red)
- ⏱️ Временная метка каждого теста
- 📈 Итоговая статистика

### JSON отчет (для анализа):
```bash
test-results.json # Сохраняется после запуска test-performance.js
```

---

## 🎯 **КОГДА ЗАПУСКАТЬ СКРИПТЫ**

### ✅ **После Локальных Изменений:**
```bash
# 1. Стартуем dev сервер
npm run dev

# 2. В другом терминале запускаем тесты
node test-site-health.js http://localhost:3000
node test-performance.js http://localhost:3000
```

### ✅ **После Deploy на Vercel:**
```bash
# Ждите 2-3 мин пока Vercel развернет
# Затем проверяем production

node test-site-health.js https://aqua-service-karelia.ru
node test-performance.js https://aqua-service-karelia.ru
```

### ✅ **Еженедельный Мониторинг:**
```bash
# Автоматизируйте через cron job или GitHub Actions
0 9 * * 1 cd ~/Projects/Work && node test-site-health.js https://aqua-service-karelia.ru
```

---

## 📌 **ИНТЕРПРЕТАЦИЯ РЕЗУЛЬТАТОВ**

### Health Score интерпретация:

| Score | Статус | Действие |
|-------|--------|---------|
| 90-100 | 🟢 EXCELLENT | Ничего не менять, мониторить |
| 75-89 | 🟡 GOOD | Малые оптимизации, когда будет время |
| 50-74 | 🟡 FAIR | Требуется внимание, исправить в спринте |
| <50 | 🔴 POOR | КРИТИЧНО, требует срочного исправления |

### Core Web Vitals пороги (Google):

| Метрика | GOOD | NEEDS IMPROVEMENT | POOR |
|---------|------|------------------|------|
| FCP | ≤1.8s | ≤3.0s | >3.0s |
| LCP | ≤2.5s | ≤4.0s | >4.0s |
| CLS | ≤0.1 | ≤0.25 | >0.25 |
| TTFB | ≤0.8s | ≤1.8s | >1.8s |
| INP | ≤0.2s | ≤0.5s | >0.5s |

---

## 🔧 **ИНТЕГРАЦИЯ С CI/CD (GitHub Actions)**

Создать `.github/workflows/test.yml`:

```yaml
name: Site Health Tests

on:
  push:
    branches: [main]
  schedule:
    - cron: '0 9 * * 1' # Еженедельно по понедельникам в 9:00

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Wait for Vercel deployment
        run: sleep 120
      
      - name: Run health tests
        run: node test-site-health.js https://aqua-service-karelia.ru
      
      - name: Run performance tests
        run: node test-performance.js https://aqua-service-karelia.ru
```

---

## 🚀 **РЕАЛЬНЫЕ ПРИМЕРЫ ИСПОЛЬЗОВАНИЯ**

### Пример 1: Проверка после commit
```bash
# После git commit перед push
npm run build
node test-site-health.js http://localhost:3000

# Если success rate < 90% - не push, исправить!
```

### Пример 2: Мониторинг после deploy
```bash
# Через 5 минут после push
git push
sleep 300
node test-performance.js https://aqua-service-karelia.ru

# Если health score drop > 5 points - откатить!
```

### Пример 3: Еженедельный отчет
```bash
# Скопировать результаты в email
node test-site-health.js https://aqua-service-karelia.ru > health_report.txt
node test-performance.js https://aqua-service-karelia.ru > perf_report.txt

# Отправить в Slack или Email
```

---

## 📝 **ПОЛЕЗНЫЕ КОМАНДЫ**

```bash
# Запустить оба теста подряд
node test-site-health.js http://localhost:3000 && node test-performance.js http://localhost:3000

# Сохранить результаты в файл
node test-site-health.js http://localhost:3000 > test_results_$(date +%Y%m%d).txt

# Сравнить результаты двух запусков (diff)
node test-performance.js https://aqua-service-karelia.ru > perf_before.json
# ... сделать оптимизации ...
node test-performance.js https://aqua-service-karelia.ru > perf_after.json
diff perf_before.json perf_after.json
```

---

## 💡 **СОВЕТЫ**

1. **Запускайте тесты несколько раз** - результаты немного варьируются из-за сетевой задержки
2. **Используйте production URL для реальных метрик** - localhost не показывает реальную скорость
3. **Смотрите Google Analytics 4** - там WebVitals от реальных пользователей
4. **Сравнивайте ДО и ПОСЛЕ** - так видна реальная разница от оптимизаций
5. **Не зацикливайтесь на микрооптимизациях** - скорость важна, но пользовательский опыт важнее

---

## 🐛 **TROUBLESHOOTING**

### Скрипт не запускается
```bash
# Проверьте права доступа
chmod +x test-site-health.js test-performance.js

# Или запустите через node явно
node test-site-health.js http://localhost:3000
```

### Ошибка подключения
```bash
# Убедитесь что сервер запущен
npm run dev
# ИЛИ что Vercel deployment завершен
```

### Странные результаты
```bash
# Очистьте кеш браузера
# Или используйте приватное окно для тестирования
```

---

## 📚 **ДОПОЛНИТЕЛЬНЫЕ РЕСУРСЫ**

- [Google Web Vitals](https://web.dev/vitals/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [Google Analytics 4 WebVitals](https://support.google.com/analytics/answer/9947490)

---

**Создано:** Февраль 2026  
**Для:** aqua-service-karelia.ru  
**Статус:** ✅ готово к использованию
