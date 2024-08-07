import Link from 'next/link';

import IconGithub from '@/components/icon/Github';
import IconLinkedin from '@/components/icon/LinkedIn';

export function Footer() {
  return (
    <footer className="flex flex-col items-center justify-center gap-4 pb-16 pt-20 text-center">
      <div className="flex justify-center gap-4">
        <Link href="https://github.com/azure-553" target="_blank">
          <IconGithub
            className="fill-foreground transition"
            height={30}
            width={30}
          />
        </Link>
        <Link href="https://www.linkedin.com/in/mijin-sim4530" target="_blank">
          <IconLinkedin
            className="fill-foreground transition"
            height={30}
            width={30}
          />
        </Link>
      </div>
      <div>
        © 2024. <span className="font-semibold">SIM MIJIN</span> all rights
        reserved.
      </div>
    </footer>
  );
}
