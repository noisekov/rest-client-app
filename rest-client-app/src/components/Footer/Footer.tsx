import Image from 'next/image';
import { Button } from '@/components/ui/button';
import logoRS from '../../../public/rss-logo.svg';
import logoGitHub from '../../../public/github-logo.png';

export function Footer() {
  return (
    <footer>
      <div className="max-w-7xl mx-auto w-full px-4 row-start-3 grid gap-[24px] grid-cols-3 grid-flow-row border-t border-dashed border-[#cfcfcf] border-t-px pt-[20px] pb-[20px]">
        <div className="flex flex-row items-start flex-wrap">
          <Button variant="link">
            <a
              className="flex items-center gap-[5px]"
              href="https://github.com/noisekov"
              target="_blank"
            >
              <Image
                src={logoGitHub}
                alt="gitHub"
                width={20}
                height={20}
              ></Image>
              noisekov
            </a>
          </Button>

          <Button variant="link">
            <a
              className="flex items-center gap-[5px]"
              href="https://github.com/skayer81"
              target="_blank"
            >
              <Image
                src={logoGitHub}
                alt="gitHub"
                width={20}
                height={20}
              ></Image>
              skayer81
            </a>
          </Button>

          <Button variant="link">
            <a
              className="flex items-center gap-[5px]"
              href="https://github.com/LaraNU"
              target="_blank"
            >
              <Image
                src={logoGitHub}
                alt="gitHub"
                width={20}
                height={20}
              ></Image>
              LaraNU
            </a>
          </Button>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground justify-self-center">
          <span>REST Client App © 2025</span>
        </div>

        <div className="flex items-center gap-4 justify-self-end">
          <a
            href="https://rs.school/courses/reactjs"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-sm font-medium hover:text-primary transition-colors"
          >
            <Image src={logoRS} alt="RS" width={40} height={40}></Image>
          </a>
        </div>
      </div>
    </footer>
  );
}
