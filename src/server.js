import 'dotenv/config';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_TEST_KEY, {
    apiVersion: '2024-04-10',
});

const SLOT_PRICES = {
    '9:00 AM': 10.00,
    '10:00 AM': 10.00,
    '11:00 AM': 12.00,
    '2:00 PM': 12.00,
    '3:00 PM': 15.00
};


export const createCheckoutSession = async (slot, userId) => {
    if (!SLOT_PRICES[slot]) {
        throw new Error('Invalid slot selected');
    }t

    const amount = SLOT_PRICES[slot];

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: `Booking for slot: ${slot}`,
                        },
                        unit_amount: Math.floor(amount * 100), 
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${process.env.SUCCESS_URL}?slot=${encodeURIComponent(slot)}&userId=${userId}`,
            cancel_url: `${process.env.CANCEL_URL}?slot=${encodeURIComponent(slot)}&userId=${userId}`,
            metadata: {
                slot,
                userId,
                platform: 'telegram'
            }
        });

        return {
            sessionId: session.id,
            url: session.url
        };
    } catch (error) {
        console.error('Stripe checkout session creation error:', error);
        throw error;
    }
};


export const handleStripeWebhook = async (event, sendTelegramMessage) => {
    switch (event.type) {
        case 'checkout.session.completed':
            const session = event.data.object;
            const { slot, userId, platform } = session.metadata;

            if (platform === 'telegram' && userId) {
                try {
                    await sendTelegramMessage(
                        userId, 
                        `✅ Payment successful for ${slot} slot! Your booking is confirmed.`
                    );
                } catch (telegramError) {
                    console.error('Failed to send Telegram confirmation:', telegramError);
                }
            }
            break;

        default:
            console.log(`Unhandled event type ${event.type}`);
    }
};


export const verifyWebhookSignature = (rawBody, signature) => {
    try {
        return stripe.webhooks.constructEvent(
            rawBody, 
            signature, 
            process.env.STRIPE_ENDPOINT_SECRET
        );
    } catch (err) {
        console.error('Webhook signature verification failed:', err);
        throw err;
    }
};


export const getAvailableSlots = () => Object.keys(SLOT_PRICES);
export const getSlotPrice = (slot) => SLOT_PRICES[slot];

export default {
    createCheckoutSession,
    handleStripeWebhook,
    verifyWebhookSignature,
    getAvailableSlots,
    getSlotPrice
};