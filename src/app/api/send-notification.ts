import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Устанавливаем заголовки
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST');

  try {
    // Проверка метода запроса
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method Not Allowed' });
    }

    // Проверка наличия тела запроса
    if (!req.body) {
      return res.status(400).json({ error: 'Missing request body' });
    }

    // Извлечение данных
    const { name, phone, email, address } = req.body;

    // Проверка переменных окружения
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    if (!botToken || !chatId) {
      throw new Error('Telegram credentials not configured');
    }

    // Формирование сообщения
    const message = `Новая заявка:\nИмя: ${name}\nТелефон: ${phone}\nEmail: ${email}\nАдрес: ${address}`;

    // Отправка в Telegram
    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: 'Markdown'
        })
      }
    );

    // Обработка ответа Telegram
    if (!telegramResponse.ok) {
      const error = await telegramResponse.json();
      return res.status(500).json({ 
        error: 'Telegram API Error',
        details: error.description
      });
    }

    return res.status(200).json({ success: true });

  } catch (error) {
    console.error('Server Error:', error);
    return res.status(500).json({ 
      error: 'Internal Server Error',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}