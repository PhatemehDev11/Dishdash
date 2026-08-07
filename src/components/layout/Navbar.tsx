import Container from "@/components/shared/Container";
import Logo from "@/components/shared/Logo";

import NavActions from "./NavActions";
import NavLinks from "./NavLinks";

export default function Navbar() {
  return (
    <header className="fixed left-0 right-0 top-0 z-50">
      <Container>
        <div className="mt-4 flex h-16 items-center justify-between rounded-full border border-white/20 bg-white/70 px-4 shadow-lg backdrop-blur-xl sm:px-6">

          <Logo />

          <div className="hidden md:block">
            <NavLinks />
          </div>

          <NavActions />

        </div>
      </Container>
    </header>
  );
}