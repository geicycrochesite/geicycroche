// src/app/api/mercado-pago/preference/route.ts
import { NextRequest, NextResponse } from 'next/server';

type Item = { name: string; quantity: number; price: number };

type PreferenceRequestBody = {
  items: Item[];
  orderId: string;
  payerEmail?: string;
};

const accessToken = process.env.MERCADO_PAGO_ACCESS_TOKEN;
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

export async function POST(req: NextRequest) {
  const body: PreferenceRequestBody = await req.json();

  if (!accessToken) {
    return NextResponse.json({ error: 'MP token não configurado' }, { status: 500 });
  }

  const mappedItems = body.items.map((item, idx) => ({
    id: `item-${idx}`,
    title: item.name,
    quantity: Number(item.quantity),
    currency_id: 'BRL',
    unit_price: Number(item.price),
  }));

  const preferencePayload = {
    items: mappedItems,
    back_urls: {
      success: `${siteUrl}/loja/pedido/${body.orderId}?status=success`,
      failure: `${siteUrl}/loja/pedido/${body.orderId}?status=failure`,
      pending: `${siteUrl}/loja/pedido/${body.orderId}?status=pending`,
    },
    auto_return: 'approved',
    notification_url: `${siteUrl}/api/mercado-pago/webhook`,
    external_reference: body.orderId,
    payer: body.payerEmail ? { email: body.payerEmail } : undefined,
  };

  const mpResponse = await fetch('https://api.mercadopago.com/checkout/preferences', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(preferencePayload),
  });

  const data = await mpResponse.json();

  if (!mpResponse.ok) {
    return NextResponse.json({ error: data }, { status: mpResponse.status });
  }

  return NextResponse.json({
    init_point: data.init_point,
    id: data.id,
  });
}