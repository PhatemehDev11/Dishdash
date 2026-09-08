import { redirect } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, UtensilsCrossed, Store, Receipt } from "lucide-react";
import { requireAdminSession } from "@/lib/adminAuth";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/restaurants", label: "Restaurants", icon: Store },
  { href: "/admin/foods", label: "Foods", icon: UtensilsCrossed },
  { href: "/admin/orders", label: "Orders", icon: Receipt },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await requireAdminSession();

  if (!session) {
    redirect("/");
  }

  return (
    <div className="min-h-screen flex">
      <aside className="w-[220px] flex-none bg-secondary text-white p-6 hidden md:block">
        <Link href="/" className="text-lg font-extrabold mb-8 block">
          DishDash <span className="text-primary">Admin</span>
        </Link>
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium text-white/70 hover:bg-white/10 hover:text-white transition-colors"
              >
                <Icon className="w-4 h-4" strokeWidth={2} />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <Link
          href="/"
          className="mt-8 block text-xs text-white/50 hover:text-white transition-colors"
        >
          ← Back to site
        </Link>
      </aside>
      <main className="flex-1 bg-[#F8F9FB] p-6 md:p-10">{children}</main>
    </div>
  );
}
