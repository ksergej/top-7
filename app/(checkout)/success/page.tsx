import {capturePayPalOrder} from "@/app/actions";

export default async function SuccessPage({ searchParams }: { searchParams: { token?: string } }) {
  const orderID = searchParams.token // PayPal присылает orderID в ?token=...

  if (!orderID) {
    return <div>Ошибка: нет orderID</div>
  }

  const result = await capturePayPalOrder(orderID)

  return (
    <div>
      <h1>Оплата успешна 🎉</h1>
    </div>
  )
}
