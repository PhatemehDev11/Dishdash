import {
    Globe,
    MessageCircle,
    Play,
    Share2,
  } from "lucide-react";
  
  const footerColumns = [
    {
      title: "Company",
      links: ["About Us", "Careers", "Blog", "Press"],
    },
    {
      title: "Support",
      links: ["Help Center", "Contact Us", "Order Status", "Refunds"],
    },
    {
      title: "Legal",
      links: ["Terms of Service", "Privacy Policy", "Cookie Policy"],
    },
  ];
  
  const socialIcons = [
    {
      label: "Website",
      icon: Globe,
    },
    {
      label: "Community",
      icon: MessageCircle,
    },
    {
      label: "YouTube",
      icon: Play,
    },
    {
      label: "Share",
      icon: Share2,
    },
  ];
  
  export function Footer() {
    return (
      <footer className="bg-foreground text-muted-foreground">
        <div className="mx-auto max-w-[1240px] px-6 py-14 md:px-8">
  
          {/* Main Footer */}
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
  
            {/* Brand */}
            <div className="max-w-sm">
              <div className="mb-4 text-2xl font-bold text-white">
                Dish<span className="text-primary">Dash</span>
              </div>
  
              <p className="text-sm leading-6">
                Great food, from your favorite local restaurants,
                delivered fast to your door.
              </p>
            </div>
  
            {/* Footer Columns */}
            {footerColumns.map((col) => (
              <div key={col.title}>
                <h5 className="mb-4 text-xs font-semibold uppercase tracking-wider text-white">
                  {col.title}
                </h5>
  
                <ul className="space-y-3">
                  {col.links.map((link) => (
                    <li key={link} className="text-[13.5px]">
                      <a
                        href="#"
                        className="transition-colors hover:text-white"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
  
          {/* Bottom */}
          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6 text-[12.5px]">
  
            <span>
              © 2026 DishDash, Inc. All rights reserved.
            </span>
  
            <div className="flex gap-2.5">
              {socialIcons.map(({ label, icon: Icon }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="
                    flex h-9 w-9 items-center justify-center
                    rounded-full
                    bg-white/[0.08]
                    transition-all
                    hover:scale-110
                    hover:bg-primary
                    hover:text-white
                  "
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
  
          </div>
        </div>
      </footer>
    );
  }