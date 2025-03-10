import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const { name, phone, email, address } = await req.json();

        const token = process.env.TELEGRAM_BOT_TOKEN;
        const chatId = process.env.TELEGRAM_CHAT_ID;

        if (!token || !chatId) {
            return NextResponse.json({ error: "Отсутствуют переменные окружения" }, { status: 500 });
        }

        const message = `
📌 *Новая заявка!*  

👤 Имя: ${name}
📞 Телефон: ${phone}
📧 Email: ${email}
📍 Адрес: ${address}
        `.trim();

        const telegramUrl = `https://api.telegram.org/bot${token}/sendMessage`;

        const telegramResponse = await fetch(telegramUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json; charset=utf-8" },
            body: JSON.stringify({
                chat_id: chatId,
                text: message, // Просто передаем строку без encodeURIComponent()
                parse_mode: "Markdown"
            })
        });

        const result = await telegramResponse.json();

        if (!result.ok) {
            throw new Error(`Ошибка Telegram: ${result.description}`);
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Ошибка API:", error);
        return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
    }
}
