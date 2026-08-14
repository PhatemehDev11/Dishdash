import Link from "next/link";
import { PackageCheck } from "lucide-react";
import  Navbar  from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function CheckoutPage() {
  return (
    <>
      <Navbar />
      <main className="pt-[150px] pb-20 md:pb-[100px] min-h-[60vh]">
        <div className="max-w-[600px] mx-auto px-8 text-center">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
            <PackageCheck className="w-7 h-7 text-primary-dark" strokeWidth={1.5} />
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight mb-2">Checkout is on the way</h1>
          <p className="text-muted-foreground text-[14.5px] mb-6">
            Real checkout (address, payment, order confirmation) comes in the next step, once the
            database is connected.
          </p>
          <Link
            href="/cart"
            className="text-[13.5px] font-semibold text-primary-dark hover:underline"
          >
            ← Back to cart
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
