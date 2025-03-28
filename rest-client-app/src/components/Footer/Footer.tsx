import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import logoRS from "../../../public/rss-logo.svg";
import logoGitHub from "../../../public/github-logo.png";

export function Footer() {
  return (
    <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-between border-t border-dashed border-[#cfcfcf] border-t-px">
      <div className="flex flex-col items-start">
        <Button variant="link">
          <Link
            className="flex items-center gap-[5px]"
            href="https://github.com/noisekov"
            target="_blank"
          >
            <Image src={logoGitHub} alt="gitHub" width={20} height={20}></Image>
            noisekov
          </Link>
        </Button>

        <Button variant="link">
          <Link
            className="flex items-center gap-[5px]"
            href="https://github.com/skayer81"
            target="_blank"
          >
            <Image src={logoGitHub} alt="gitHub" width={20} height={20}></Image>
            skayer81
          </Link>
        </Button>

        <Button variant="link">
          <Link
            className="flex items-center gap-[5px]"
            href="https://github.com/LaraNU"
            target="_blank"
          >
            <Image src={logoGitHub} alt="gitHub" width={20} height={20}></Image>
            LaraNU
          </Link>
        </Button>
      </div>

      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>REST Client App © 2025</span>
      </div>

      <div className="flex items-center gap-4">
        <Link
          href="https://rs.school/courses/reactjs"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-sm font-medium hover:text-primary transition-colors"
        >
          <Image src={logoRS} alt="RS" width={40} height={40}></Image>
        </Link>
      </div>
    </footer>
  );
}
