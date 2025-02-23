import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query');

  if (!query || query.length < 3) {
    return NextResponse.json({ error: 'Invalid query' }, { status: 400 });
  }

  const YANDEX_API_KEY = process.env.NEXT_PUBLIC_YANDEX_API_KEY;
  if (!YANDEX_API_KEY) {
    return NextResponse.json({ error: 'Yandex API key not found' }, { status: 500 });
  }

  try {
    const res = await fetch(
      `https://suggest-maps.yandex.ru/v1/suggest?apikey=${YANDEX_API_KEY}&text=${encodeURIComponent(query)}&lang=ru_RU`
    );
    if (!res.ok) {
      return NextResponse.json({ error: 'Error from Yandex API' }, { status: res.status });
    }
    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch suggestions' }, { status: 500 });
  }
}
