import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <Button asChild variant="ghost" size="icon">
        <Link href="https://github.com/azure-553" target="_blank">
          jin
        </Link>
      </Button>
    </>
  );
}
