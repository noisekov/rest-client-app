import Link from "next/link";
import Image from "next/image";
import icon from "../../../public/logo.png";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="row-start-3 flex gap-[24px] flex-wrap items-center justify-between sticky top-0 h-[56px] border-b border-dashed border-[#cfcfcf] border-b-px">
      <Link href="/">
        <Image priority src={icon} alt="Logo" width={40} height={40} />
      </Link>
      <div className="flex gap-[24px]">
        <ToggleGroup type="single" size="lg" defaultValue="en">
          <ToggleGroupItem variant="outline" value="en">
            EN
          </ToggleGroupItem>
          <ToggleGroupItem variant="outline" value="ru">
            RU
          </ToggleGroupItem>
        </ToggleGroup>
        <Button variant="outline" size="lg" asChild>
          <Link href="/signin">Sign In</Link>
        </Button>
        <Button size="lg" asChild>
          <Link href="/signup">Sign up</Link>
        </Button>
      </div>
    </header>
  );
}
