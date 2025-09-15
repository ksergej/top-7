import {capturePayPalOrder} from "@/app/actions";
import {redirect} from "next/navigation";

export default async function SuccessPage({ searchParams }: { searchParams: { token?: string } }) {
  const params = await searchParams;
  const orderID = params.token; // PayPal присылает orderID в ?token=...

  if (!orderID) {
    return <div>Ошибка: нет orderID</div>
  }

  const result = await capturePayPalOrder(orderID)

  if (result.status === 'COMPLETED') {
    return redirect('/?paid');
  } else {
    console.error(result.error);
    return redirect('/?not_paid');
  }
}
