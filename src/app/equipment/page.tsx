// app/equipment/page.tsx
import { supabase } from '@/lib/supabase';
import Header from "../components/Header";
import EquipmentCategoryCard from "../components/EquipmentCategoryCard";

interface Category {
  name: string;
  image_url: string | null;
  description?: string;
}

async function getCategoriesWithImages(): Promise<Category[]> {
  try {
    // Получаем уникальные категории из оборудования
    const { data: equipmentData, error: equipmentError } = await supabase
      .from('equipment')
      .select('category')
      .not('category', 'is', null)
      .order('category', { ascending: true });

    if (equipmentError) throw equipmentError;

    // Извлекаем уникальные имена категорий
    const uniqueCategories = Array.from(new Set(
      equipmentData?.map(item => item.category)
    )).filter(Boolean);

    // Получаем полные данные категорий из таблицы categories
    const { data: categoriesData, error: categoriesError } = await supabase
      .from('categories')
      .select('name, image_url, description')
      .in('name', uniqueCategories)
      .order('name', { ascending: true });

    if (categoriesError) throw categoriesError;

    return categoriesData || [];
  } catch (error) {
    console.error("Ошибка загрузки категорий:", error);
    return [];
  }
}

export default async function EquipmentPage() {
  const categories = await getCategoriesWithImages();

  return (
    <main>
      <Header />
      <section className="container mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold text-[#218CE9] text-center mb-8">
          Категории оборудования
        </h1>

        {categories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category) => (
              <EquipmentCategoryCard 
                key={category.name}
                category={category}
              />
            ))}
          </div>
        ) : (
          <div className="text-center text-red-500 py-8">
            Категории временно недоступны
          </div>
        )}
      </section>
    </main>
  );
}