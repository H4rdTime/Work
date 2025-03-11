// app/api/upload/route.ts
import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json(
        { error: 'Файл не получен' }, 
        { status: 400 }
      );
    }

    // Генерируем уникальное имя файла
    const timestamp = Date.now();
    const fileExt = file.name.split('.').pop();
    const fileName = `${timestamp}.${fileExt}`;

    const { data, error } = await supabase.storage
      .from('water-analysis')
      .upload(`analyses/${fileName}`, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      console.error('Ошибка Supabase:', error);
      return NextResponse.json(
        { error: 'Ошибка загрузки файла' }, 
        { status: 500 }
      );
    }

    const publicUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/water-analysis/${data.path}`;
    
    return NextResponse.json({ 
      success: true,
      url: publicUrl 
    });

  } catch (error) {
    console.error('Ошибка загрузки:', error);
    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера' }, 
      { status: 500 }
    );
  }
}