import Link from "next/link";
import { Plus } from "lucide-react";
import { adminGetAllFoods } from "@/lib/adminFoods";
import { DeleteButton } from "@/features/admin/DeleteButton";

export default async function AdminFoodsPage() {
  const foods = await adminGetAllFoods();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-extrabold">Foods</h1>
        <Link
          href="/admin/foods/new"
          className="inline-flex items-center gap-1.5 bg-primary text-white text-sm font-semibold px-4 py-2.5 rounded-full"
        >
          <Plus className="w-4 h-4" /> New Food
        </Link>
      </div>

      <div className="bg-white border rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[#F5F6F8] text-left text-xs text-muted-foreground uppercase">
            <tr>
              <th className="px-5 py-3">Name</th>
              <th className="px-5 py-3">Restaurant</th>
              <th className="px-5 py-3">Category</th>
              <th className="px-5 py-3">Price</th>
              <th className="px-5 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {foods.map((f) => (
              <tr key={f.id} className="border-t">
                <td className="px-5 py-3 font-medium">{f.name}</td>
                <td className="px-5 py-3 text-muted-foreground">{f.restaurant.name}</td>
                <td className="px-5 py-3 text-muted-foreground">{f.category}</td>
                <td className="px-5 py-3">${f.price.toFixed(2)}</td>
                <td className="px-5 py-3 text-right">
                  <div className="flex items-center justify-end gap-3">
                    <Link
                      href={`/admin/foods/${f.id}/edit`}
                      className="text-primary font-semibold text-xs hover:underline"
                    >
                      Edit
                    </Link>
                    <DeleteButton url={`/api/admin/foods/${f.id}`} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {foods.length === 0 && (
          <p className="text-center text-muted-foreground text-sm py-10">No food items yet.</p>
        )}
      </div>
    </div>
  );
}
