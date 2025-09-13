import {capturePayPalOrder} from "@/app/actions";
import {redirect} from "next/navigation";

export default async function SuccessPage({ searchParams }: { searchParams: { token?: string } }) {
  const orderID = searchParams.token // PayPal присылает orderID в ?token=...

  if (!orderID) {
    return <div>Ошибка: нет orderID</div>
  }

  const result = await capturePayPalOrder(orderID)

  if (result.success) {
    return redirect('/?paid');
  } else {
    return redirect('/?not_paid');
  }
}
