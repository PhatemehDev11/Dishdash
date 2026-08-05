import Container from "@/components/shared/Container";
import Logo from "@/components/shared/Logo";

import NavActions from "./NavActions";
import NavLinks from "./NavLinks";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <Container>
        <div className="mt-5 flex h-16 items-center justify-between rounded-full border border-white/20 bg-white/70 px-6 shadow-lg backdrop-blur-xl">
          <Logo />
          <NavLinks />
          <NavActions />
        </div>
      </Container>
    </header>
  );
}