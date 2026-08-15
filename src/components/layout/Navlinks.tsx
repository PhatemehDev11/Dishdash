import Link from "next/link";
import { NAV_LINKS } from "@/lib/constants/navigation";

export default function NavLinks() {
  return (
    <nav  className="hidden lg:block">
      <ul className="flex items-center gap-8">
        {NAV_LINKS.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}