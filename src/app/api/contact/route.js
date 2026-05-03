import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const { name, phone, email, subject, message } = await request.json();

        console.log('Новое сообщение:', { name, phone, email, subject, message });

        const botToken = process.env.TELEGRAM_BOT_TOKEN;
        const chatId = process.env.TELEGRAM_CHAT_ID;

        const currentDate = new Date().toLocaleString('ru-RU');

        const messageText = `📬 НОВОЕ СООБЩЕНИЕ AL MAKTUM\n\n━━━━━━━━━━━━━━━━━━\n👤 Имя: ${name}\n📞 Телефон: ${phone}\n📧 Email: ${email || 'Не указан'}\n📝 Тема: ${subject}\n💬 Сообщение: ${message}\n🕐 Время: ${currentDate}\n━━━━━━━━━━━━━━━━━━`;

        if (botToken && chatId) {
            await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: messageText,
                    parse_mode: 'HTML'
                })
            });
        }

        // Здесь также можно отправить email
        // await sendEmail({ name, phone, email, subject, message });

        return NextResponse.json({
            success: true,
            message: 'Сообщение отправлено!'
        });
    } catch (error) {
        console.error('Contact error:', error);
        return NextResponse.json({
            success: false,
            message: 'Ошибка сервера'
        }, { status: 500 });
    }
}