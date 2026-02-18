import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { getStripeClient } from '@/lib/stripe';
import { kv } from '@/lib/store';
import { sendPilotNotification } from '@/lib/email';

export async function POST(request: Request) {
  const signature = (await headers()).get('stripe-signature');
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !webhookSecret) {
    return NextResponse.json(
      { error: 'Missing webhook signature or secret.' },
      { status: 400 }
    );
  }

  const body = await request.text();

  const stripe = getStripeClient();
  let event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    return NextResponse.json(
      { error: `Webhook error: ${(err as Error).message}` },
      { status: 400 }
    );
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const metadata = session.metadata || {};
    const pilotId = session.id;

    const pilotRecord = {
      id: pilotId,
      sessionId: session.id,
      name: metadata.name || '',
      email: session.customer_email || metadata.email || '',
      company: metadata.company || '',
      useCase: metadata.useCase || '',
      systemCount: metadata.systemCount || '',
      amountTotal: session.amount_total ?? null,
      currency: session.currency ?? null,
      createdAt: Date.now()
    };

    await kv.set(`pilot:${pilotId}`, pilotRecord);
    const index = (await kv.get<string[]>('pilot:index')) || [];
    await kv.set('pilot:index', [pilotId, ...index]);

    await sendPilotNotification(pilotRecord);
  }

  return NextResponse.json({ received: true });
}
