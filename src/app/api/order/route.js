import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const { order, total, customer } = await request.json();

        // Здесь можно добавить отправку в Telegram, Email или CRM
        console.log('Новый заказ:', { order, total, customer });

        // Пример отправки в Telegram (требует .env)
        const botToken = process.env.TELEGRAM_BOT_TOKEN;
        const chatId = process.env.TELEGRAM_CHAT_ID;

        if (botToken && chatId) {
            const message = `🛎 НОВЫЙ ЗАКАЗ AL MAKTUM\n\nКлиент: ${customer.name}\nТелефон: ${customer.phone}\nСумма: ${total} сум\n\nСостав заказа:\n${order.map(item => `- ${item.name} x${item.quantity} = ${item.price * item.quantity} сум`).join('\n')}`;

            await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ chat_id: chatId, text: message })
            });
        }

        return NextResponse.json({ success: true, message: 'Заказ принят!' });
    } catch (error) {
        return NextResponse.json({ success: false, message: 'Ошибка сервера' }, { status: 500 });
    }
}