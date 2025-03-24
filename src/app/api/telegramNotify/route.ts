import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const { name, phone, email, address, service, file_url, preferred_contact } = await req.json();

        const token = process.env.TELEGRAM_BOT_TOKEN;
        const chatIdsStr = process.env.TELEGRAM_CHAT_IDS;
        if (!token || !chatIdsStr) {
            console.error("Отсутствуют переменные окружения");
            return NextResponse.json({ error: "Ошибка конфигурации сервера" }, { status: 500 });
        }

        const chatIds = chatIdsStr.split(',').map(id => id.trim());

        // Escape underscores in the email address
        const escapedEmail = email.replace(/_/g, '\\_');

        // Формируем сообщение с Markdown-разметкой, добавляя способ связи
        let message = `
📌 *Новая заявка!*

👤 *Имя:* ${name || 'Не указано'}
📞 *Телефон:* \`${phone || 'Не указан'}\`
📧 *Email:* ${escapedEmail || 'Не указан'}
📍 *Адрес:* ${address || 'Не указан'}
🛠 *Услуга:* ${service || 'Не выбрана'}
🗣 *Способ связи:* ${preferred_contact || 'Не указан'}
        `;

        if (file_url) {
            message += `\n📎 *Файл:* [Скачать анализ](${file_url})`;
        }

        const telegramUrl = `https://api.telegram.org/bot${token}/sendMessage`;

        const results = await Promise.allSettled(
            chatIds.map(async (chatId) => {
                const response = await fetch(telegramUrl, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json; charset=utf-8",
                        "User-Agent": "AquaServiceBot/1.0"
                    },
                    body: JSON.stringify({
                        chat_id: chatId,
                        text: message,
                        parse_mode: "Markdown",
                        disable_web_page_preview: true
                    })
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(`Chat ${chatId}: ${errorData.description}`);
                }
                return response.json();
            })
        );

        results.forEach((result, index) => {
            if (result.status === "rejected") {
                console.error(`Ошибка отправки в чат ${chatIds[index]}:`, result.reason);
            }
        });

        return NextResponse.json({
            success: true,
            stats: {
                total: chatIds.length,
                success: results.filter(r => r.status === "fulfilled").length
            }
        });

    } catch (error) {
        console.error("Ошибка API:", error);
        return NextResponse.json({
            error: "Внутренняя ошибка сервера",
            details: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
}
