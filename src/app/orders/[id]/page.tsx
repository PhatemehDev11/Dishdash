import { notFound } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import  Navbar  from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { auth } from "@/lib/auth";
import { getOrderById } from "@/lib/orders";

export default async function OrderConfirmationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await auth();

  if (!session?.user) {
    notFound();
  }

  const userId = (session.user as { id: string }).id;
  const order = await getOrderById(userId, id);

  if (!order) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main className="pt-[150px] pb-20 min-h-[70vh]">
        <div className="max-w-[600px] mx-auto px-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-primary" strokeWidth={1.5} />
            </div>
            <h1 className="text-2xl font-extrabold mb-1">Order placed!</h1>
            <p className="text-muted-foreground text-sm">
              Order #{order.id.slice(-8).toUpperCase()}
            </p>
          </div>

          <div className="bg-white border rounded-3xl p-6 mb-6">
            <h3 className="font-bold mb-4">Items</h3>
            <div className="space-y-3">
              {order.items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>
                    {item.quantity}× {item.name}
                  </span>
                  <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="h-px bg-border my-4" />

            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span>${order.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Delivery Fee</span>
                <span>${order.deliveryFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-base pt-2">
                <span>Total</span>
                <span className="text-destructive">${order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="bg-white border rounded-3xl p-6">
            <h3 className="font-bold mb-2">Delivering to</h3>
            <p className="text-sm text-muted-foreground">
              {order.address.label} — {order.address.street}, {order.address.city}
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
