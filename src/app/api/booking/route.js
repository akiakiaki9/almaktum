import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const booking = await request.json();

        console.log('Новое бронирование:', booking);

        const botToken = process.env.TELEGRAM_BOT_TOKEN;
        const chatId = process.env.TELEGRAM_CHAT_ID;

        const hallsMap = {
            main: '🏛️ Основной зал',
            cabins: '🚪 Кабины',
            banquet: '🎉 Банкетный зал',
            wedding: '💒 Свадебный зал',
            family: '👨‍👩‍👧‍👦 Семейный зал',
            terrace: '🌿 Терраса'
        };

        const message = `📅 НОВОЕ БРОНИРОВАНИЕ AL MAKTUM\n\n━━━━━━━━━━━━━━━━━━\n👤 Имя: ${booking.name}\n📞 Телефон: ${booking.phone}\n📅 Дата: ${booking.date}\n⏰ Время: ${booking.time}\n👥 Гостей: ${booking.guests}\n🏛 Зал: ${hallsMap[booking.hall] || booking.hall}\n💬 Пожелания: ${booking.comment || 'Нет'}\n━━━━━━━━━━━━━━━━━━`;

        if (botToken && chatId) {
            await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ chat_id: chatId, text: message, parse_mode: 'HTML' })
            });
        }

        return NextResponse.json({ success: true, message: 'Бронирование подтверждено!' });
    } catch (error) {
        console.error('Booking error:', error);
        return NextResponse.json({ success: false, message: 'Ошибка сервера' }, { status: 500 });
    }
}