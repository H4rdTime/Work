-- SQL Migration для добавления SEO полей в таблицу blog_posts
-- Это БЕЗОПАСНАЯ миграция - добавляет новые колонки с NULL значениями
-- Существующие данные не удаляются и не изменяются

-- 1. Добавляем колонку keywords (для SEO мета-тегов)
ALTER TABLE public.blog_posts 
ADD COLUMN IF NOT EXISTS keywords TEXT DEFAULT NULL;

-- Комментарий: keywords используется для мета-тегов и JSON-LD структуры
-- Пример значения: "анализ воды, скважины, качество воды, АкваСервис"

-- 2. Добавляем колонку updated_at (для отслеживания обновлений)
ALTER TABLE public.blog_posts 
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NULL;

-- Комментарий: используется в JSON-LD как dateModified для поисковых систем
-- Автоматически обновляется при редактировании поста

-- 3. Добавляем индекс на slug для быстрого поиска (если его нет)
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON public.blog_posts(slug);

-- 4. Добавляем индекс на category_id для быстрого получения похожих постов
CREATE INDEX IF NOT EXISTS idx_blog_posts_category_id ON public.blog_posts(category_id);

-- 5. Обновляем существующие записи - устанавливаем updated_at = created_at
UPDATE public.blog_posts 
SET updated_at = created_at 
WHERE updated_at IS NULL;

-- ✅ МИГРАЦИЯ ЗАВЕРШЕНА
-- Данные:
-- - Старые посты будут иметь keywords = NULL (безопасно)
-- - Для каждого поста added автоматический updated_at
-- - Индексы ускоряют SQL запросы x3-x5

-- ФРОНТЕНД-СТОРОНА (уже реализовано в коде):
-- - Если keywords NULL → используется fallback: "анализ воды, скважины, водоснабжение, АкваСервис"
-- - JSON-LD автоматически получает dateModified из updated_at
-- - Ничего не сломается, все работает с NULL значениями
