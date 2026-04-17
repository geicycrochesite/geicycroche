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

if (!accessToken) {
  console.error('MERCADO_PAGO_ACCESS_TOKEN não definido');
}

if (!siteUrl) {
  console.error('NEXT_PUBLIC_SITE_URL não definido');
}

export async function POST(req: NextRequest) {
  let body: PreferenceRequestBody;

  try {
    body = (await req.json()) as PreferenceRequestBody;
  } catch (parseError) {
    console.error('Erro ao parsear JSON da requisição:', parseError);
    return NextResponse.json({ error: 'JSON inválido no corpo da requisição' }, { status: 400 });
  }

  const { items, orderId, payerEmail } = body;

  if (!items || !Array.isArray(items) || items.length === 0) {
    return NextResponse.json({ error: 'Campo items é obrigatório e deve ser um array não vazio' }, { status: 400 });
  }

  if (!orderId || typeof orderId !== 'string') {
    return NextResponse.json({ error: 'Campo orderId é obrigatório' }, { status: 400 });
  }

  if (!accessToken) {
    return NextResponse.json({ error: 'Access token do Mercado Pago não configurado' }, { status: 500 });
  }

  if (!siteUrl) {
    return NextResponse.json({ error: 'URL do site não configurada' }, { status: 500 });
  }

  const mappedItems = items.map((item, idx) => ({
    id: `item-${idx}`,
    title: item.name,
    quantity: Number(item.quantity),
    currency_id: 'BRL',
    unit_price: Number(item.price),
  }));

  const invalidItem = mappedItems.find(
    (item) => !item.title || item.quantity <= 0 || item.unit_price <= 0 || Number.isNaN(item.unit_price)
  );

  if (invalidItem) {
    return NextResponse.json(
      { error: 'Itens inválidos. Verifique title, quantity e unit_price.' },
      { status: 400 }
    );
  }

  const preferencePayload: Record<string, any> = {
    items: mappedItems,
    back_urls: {
      success: `${siteUrl}/loja/pedido/${orderId}?status=success`,
      failure: `${siteUrl}/loja/pedido/${orderId}?status=failure`,
      pending: `${siteUrl}/loja/pedido/${orderId}?status=pending`,
    },
    notification_url: `${siteUrl}/api/mercado-pago/webhook`,
    external_reference: orderId,
  };

  if (payerEmail && typeof payerEmail === 'string') {
    preferencePayload.payer = { email: payerEmail };
  }

  console.log('[PREFERENCE] MERCADO_PAGO_ACCESS_TOKEN encontrado:', !!accessToken);
  console.log('[PREFERENCE] Payload de preferência Mercado Pago:', JSON.stringify(preferencePayload, null, 2));

  try {
    const mpResponse = await fetch('https://api.mercadopago.com/checkout/preferences', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(preferencePayload),
    });

    const responseJson = await mpResponse.json();

    console.log('Resposta Mercado Pago status:', mpResponse.status);
    console.log('Resposta Mercado Pago body:', JSON.stringify(responseJson, null, 2));

    if (!mpResponse.ok) {
      return NextResponse.json(
        { error: responseJson || 'Erro ao criar preferência no Mercado Pago' },
        { status: mpResponse.status }
      );
    }

    return NextResponse.json({
      init_point: responseJson.init_point,
      id: responseJson.id,
      status: responseJson.status,
    });
  } catch (error: any) {
    console.error('Erro ao criar preferência Mercado Pago:', error);
    console.error('error.message:', error?.message);
    console.error('error.stack:', error?.stack);

    return NextResponse.json(
      { error: error?.message || 'Erro desconhecido ao criar preferência' },
      { status: 500 }
    );
  }
}
