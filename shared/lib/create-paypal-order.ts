export async function createPayPalOrder(amount: string = "10.00") {
  const { PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET, PAYPAL_MODE, PAYPAL_CALLBACK_URL, PAYPAL_CANCEL_URL } = process.env;

  const base =
    PAYPAL_MODE === "live"
      ? "https://api-m.paypal.com"
      : "https://api-m.sandbox.paypal.com";

  // 1. Получаем access token
  const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`).toString("base64");
  const tokenResp = await fetch(`${base}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      "Authorization": `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
    cache: "no-store",
  });

  if (!tokenResp.ok) {
    throw new Error("Не удалось получить PayPal access token");
  }

  const { access_token } = await tokenResp.json();

  // 2. Создаём order
  const orderResp = await fetch(`${base}/v2/checkout/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${access_token}`,
    },
    body: JSON.stringify({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: { currency_code: "EUR", value: amount },
        },
      ],
      application_context: {
        return_url: PAYPAL_CALLBACK_URL,
        cancel_url: PAYPAL_CANCEL_URL,
      },
    }),
    cache: "no-store",
  });

  if (!orderResp.ok) {
    const err = await orderResp.text();
    throw new Error("Ошибка создания PayPal order: " + err);
  }

  const orderData = await orderResp.json();
  return orderData;
}
