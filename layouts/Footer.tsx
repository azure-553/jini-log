import React from 'react';

import Link from 'next/link';

export function Footer() {
  return (
    <footer className="">
      <div>
        <Link href='https://github.com/azure-553' target='_blank'>
            {/* <IconGithub /> */}
        </Link>
      </div>
    </footer>
  );
}
