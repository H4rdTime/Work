import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        // Деструктурируем с предоставлением значений по умолчанию, если поля отсутствуют
        const { 
            name = 'Не указано', 
            phone = 'Не указан', 
            email = 'Не указан', // <-- Установили значение по умолчанию
            address = 'Не указан', 
            service = 'Не выбрана', 
            file_url, // file_url может быть undefined, это нормально
            preferred_contact = 'Не указан' 
        } = await req.json();

        const token = process.env.TELEGRAM_BOT_TOKEN;
        const chatIdsStr = process.env.TELEGRAM_CHAT_IDS;
        if (!token || !chatIdsStr) {
            console.error("Отсутствуют переменные окружения: TELEGRAM_BOT_TOKEN или TELEGRAM_CHAT_IDS"); // Уточняем сообщение
            return NextResponse.json({ error: "Ошибка конфигурации сервера" }, { status: 500 });
        }

        const chatIds = chatIdsStr.split(',').map(id => id.trim());

        // Экранирование подчеркиваний только если email не "Не указан"
        // И также экранировать точки, так как они могут быть интерпретированы как Markdown
        const displayEmail = (email === 'Не указан' || !email.trim()) 
                             ? 'Не указан' 
                             : email.replace(/_/g, '\\_').replace(/\./g, '\\.'); // <-- Улучшенное экранирование

        // Формируем сообщение с Markdown-разметкой, добавляя способ связи
        let message = `
📌 *Новая заявка!*

👤 *Имя:* ${name}
📞 *Телефон:* \`${phone}\`
📧 *Email:* ${displayEmail}
📍 *Адрес:* ${address}
🛠 *Услуга:* ${service}
🗣 *Способ связи:* ${preferred_contact}
        `;

        if (file_url) {
            // URL в Markdown должен быть в формате [текст](ссылка)
            // И сам URL не должен содержать пробелов или спецсимволов без экранирования
            // Лучше просто передать URL, Telegram сам его сделает кликабельным
            message += `\n📎 *Файл:* ${file_url}`;
        }

        const telegramUrl = `https://api.telegram.org/bot${token}/sendMessage`;

        // Добавим больше логов для отладки
        console.log('Sending message to Telegram:', {
            chat_ids: chatIds,
            message_text: message,
            parse_mode: "Markdown"
        });

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
                        parse_mode: "Markdown", // Или "MarkdownV2" если вы используете все его возможности
                        disable_web_page_preview: true
                    })
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    // Логируем ошибку с конкретным chatId
                    console.error(`Telegram API Error for chat ${chatId}:`, errorData);
                    throw new Error(`Chat ${chatId}: ${errorData.description || 'Unknown error'}`);
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
        console.error("Критическая ошибка в API роуте /api/telegramNotify:", error); // Уточняем сообщение
        return NextResponse.json({
            success: false, // Добавим success:false для ясности на фронте
            error: "Внутренняя ошибка сервера",
            details: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
}