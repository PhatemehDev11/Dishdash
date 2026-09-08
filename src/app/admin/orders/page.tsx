import { adminGetAllOrders } from "@/lib/adminOrders";
import { OrderStatusSelect } from "@/features/admin/OrderStatusSelect";

export default async function AdminOrdersPage() {
  const orders = await adminGetAllOrders();

  return (
    <div>
      <h1 className="text-2xl font-extrabold mb-8">Orders</h1>

      <div className="bg-white border rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[#F5F6F8] text-left text-xs text-muted-foreground uppercase">
            <tr>
              <th className="px-5 py-3">Order</th>
              <th className="px-5 py-3">Customer</th>
              <th className="px-5 py-3">Items</th>
              <th className="px-5 py-3">Total</th>
              <th className="px-5 py-3">Date</th>
              <th className="px-5 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-t">
                <td className="px-5 py-3 font-medium">
                  #{order.id.slice(-8).toUpperCase()}
                </td>
                <td className="px-5 py-3 text-muted-foreground">
                  <div>{order.user.name}</div>
                  <div className="text-xs">{order.user.email}</div>
                </td>
                <td className="px-5 py-3 text-muted-foreground">{order.items.length}</td>
                <td className="px-5 py-3 font-semibold">${order.total.toFixed(2)}</td>
                <td className="px-5 py-3 text-muted-foreground text-xs">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
                <td className="px-5 py-3">
                  <OrderStatusSelect orderId={order.id} status={order.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {orders.length === 0 && (
          <p className="text-center text-muted-foreground text-sm py-10">No orders yet.</p>
        )}
      </div>
    </div>
  );
}
