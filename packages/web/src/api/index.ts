import { Hono } from 'hono';
import { cors } from "hono/cors";
import { createHmac } from "crypto";

const app = new Hono()
  .basePath('api')
  .use(cors({
    origin: (origin) => origin ?? "*",
    credentials: true,
  }))
  .get('/ping', (c) => c.json({ message: `Pong! ${Date.now()}` }, 200))
  .get('/health', (c) => c.json({ status: 'ok' }, 200))

  // POST /api/create-order
  .post('/create-order', async (c) => {
    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      return c.json({ error: 'Payment not configured' }, 500);
    }

    let body: { amount?: number; currency?: string; receipt?: string };
    try {
      body = await c.req.json();
    } catch {
      return c.json({ error: 'Invalid JSON body' }, 400);
    }

    const amount = body.amount;
    if (!amount || typeof amount !== 'number' || amount < 100) {
      return c.json({ error: 'amount must be >= 100 paise' }, 400);
    }

    const currency = body.currency ?? 'INR';
    const receipt = body.receipt ?? `rcpt_${Date.now()}`;

    const auth = Buffer.from(`${keyId}:${keySecret}`).toString('base64');

    let rzpRes: Response;
    try {
      rzpRes = await fetch('https://api.razorpay.com/v1/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${auth}`,
        },
        body: JSON.stringify({ amount, currency, receipt }),
      });
    } catch (err) {
      return c.json({ error: 'Failed to reach Razorpay' }, 502);
    }

    if (!rzpRes.ok) {
      const errBody = await rzpRes.json().catch(() => ({}));
      return c.json({ error: 'Razorpay order creation failed', details: errBody }, rzpRes.status as 400 | 401 | 500);
    }

    const order = await rzpRes.json() as { id: string; amount: number; currency: string };
    return c.json({ order_id: order.id, amount: order.amount, currency: order.currency }, 200);
  })

  // POST /api/verify-payment
  .post('/verify-payment', async (c) => {
    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keySecret) {
      return c.json({ error: 'Payment not configured' }, 500);
    }

    let body: { razorpay_order_id?: string; razorpay_payment_id?: string; razorpay_signature?: string };
    try {
      body = await c.req.json();
    } catch {
      return c.json({ error: 'Invalid JSON body' }, 400);
    }

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return c.json({ error: 'Missing required fields' }, 400);
    }

    const payload = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSig = createHmac('sha256', keySecret)
      .update(payload)
      .digest('hex');

    if (expectedSig !== razorpay_signature) {
      return c.json({ error: 'Signature mismatch — payment not verified' }, 400);
    }

    return c.json({ verified: true, payment_id: razorpay_payment_id }, 200);
  });

export type AppType = typeof app;
export default app;
