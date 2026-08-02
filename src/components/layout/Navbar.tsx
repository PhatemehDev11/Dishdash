import Container from "@/components/shared/Container";
import Logo from "@/components/shared/Logo";

import NavActions from "./NavActions";
import NavLinks from "./Navlinks";


export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">
      <Container className="flex h-20 items-center justify-between">
        <Logo/>
        <NavLinks/>
        <NavActions/>
      </Container>
    </header>
  );
}