import Link from "next/link";
import { Plus } from "lucide-react";
import { adminGetAllRestaurants } from "@/lib/adminRestaurants";
import { DeleteButton } from "@/features/admin/DeleteButton";

export default async function AdminRestaurantsPage() {
  const restaurants = await adminGetAllRestaurants();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-extrabold">Restaurants</h1>
        <Link
          href="/admin/restaurants/new"
          className="inline-flex items-center gap-1.5 bg-primary text-white text-sm font-semibold px-4 py-2.5 rounded-full"
        >
          <Plus className="w-4 h-4" /> New Restaurant
        </Link>
      </div>

      <div className="bg-white border rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[#F5F6F8] text-left text-xs text-muted-foreground uppercase">
            <tr>
              <th className="px-5 py-3">Name</th>
              <th className="px-5 py-3">Slug</th>
              <th className="px-5 py-3">Rating</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {restaurants.map((r) => (
              <tr key={r.id} className="border-t">
                <td className="px-5 py-3 font-medium">{r.name}</td>
                <td className="px-5 py-3 text-muted-foreground">{r.slug}</td>
                <td className="px-5 py-3">{r.rating}</td>
                <td className="px-5 py-3">
                  <span
                    className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                      r.isOpen ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}
                  >
                    {r.isOpen ? "Open" : "Closed"}
                  </span>
                </td>
                <td className="px-5 py-3 text-right">
                  <div className="flex items-center justify-end gap-3">
                    <Link
                      href={`/admin/restaurants/${r.id}/edit`}
                      className="text-primary font-semibold text-xs hover:underline"
                    >
                      Edit
                    </Link>
                    <DeleteButton url={`/api/admin/restaurants/${r.id}`} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {restaurants.length === 0 && (
          <p className="text-center text-muted-foreground text-sm py-10">No restaurants yet.</p>
        )}
      </div>
    </div>
  );
}
