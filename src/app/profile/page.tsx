import Link from "next/link";
import { redirect } from "next/navigation";
import { Package, ChevronRight, Pencil } from "lucide-react";
import  Navbar  from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { getUserOrders } from "@/lib/orders";

const STATUS_LABELS: Record<string, { label: string; className: string }> = {
  PENDING: { label: "Pending", className: "bg-yellow-100 text-yellow-800" },
  CONFIRMED: { label: "Confirmed", className: "bg-blue-100 text-blue-800" },
  PREPARING: { label: "Preparing", className: "bg-blue-100 text-blue-800" },
  ON_THE_WAY: { label: "On the way", className: "bg-purple-100 text-purple-800" },
  DELIVERED: { label: "Delivered", className: "bg-green-100 text-green-800" },
  CANCELLED: { label: "Cancelled", className: "bg-red-100 text-red-800" },
};

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const userId = (session.user as { id: string }).id;
  const orders = await getUserOrders(userId);

  return (
    <>
      <Navbar />
      <main className="pt-[150px] pb-20 min-h-[70vh]">
        <div className="max-w-[700px] mx-auto px-8">
          <div className="flex items-center justify-between gap-4 mb-10 flex-wrap">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold flex-none">
                {session.user.name?.charAt(0).toUpperCase()}
              </div>
              <div>
                <h1 className="text-xl font-extrabold">{session.user.name}</h1>
                <p className="text-muted-foreground text-sm">{session.user.email}</p>
              </div>
            </div>

            <Button
              variant="outline"
              render={<Link href="/profile/edit" />}
              nativeButton={false}
              className="rounded-full gap-1.5"
            >
              <Pencil className="w-3.5 h-3.5" strokeWidth={2} />
              Edit Profile
            </Button>
          </div>

          <h2 className="text-lg font-bold mb-4">Order History</h2>

          {orders.length === 0 ? (
            <div className="text-center py-16 border rounded-3xl">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Package className="w-6 h-6 text-primary" strokeWidth={1.5} />
              </div>
              <p className="text-muted-foreground text-sm mb-5">
                You haven&apos;t placed any orders yet.
              </p>
              <Link href="/restaurants" className="text-primary font-semibold text-sm hover:underline">
                Browse Restaurants
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {orders.map((order) => {
                const status = STATUS_LABELS[order.status] ?? STATUS_LABELS.PENDING;
                return (
                  <Link
                    key={order.id}
                    href={`/orders/${order.id}`}
                    className="flex items-center justify-between border rounded-2xl p-4 hover:shadow-md transition-shadow"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-sm">
                          Order #{order.id.slice(-8).toUpperCase()}
                        </span>
                        <span
                          className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${status.className}`}
                        >
                          {status.label}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {order.items.length} item{order.items.length !== 1 ? "s" : ""} ·{" "}
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 flex-none">
                      <span className="font-bold text-sm text-destructive">
                        ${order.total.toFixed(2)}
                      </span>
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}