'use client';

import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Dot, LucideIcon, Monitor, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

interface DropdownItemProps {
  t: string;
  label: string;
  Icon: LucideIcon;
}

function ThemeSwitch() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  function Item({ t, Icon, label }: DropdownItemProps) {
    return (
      <DropdownMenuItem onClick={() => setTheme(t)} className="justify-between">
        <div className="flex items-center gap-2">
          <Icon width={14} /> {label}
        </div>
        {theme === t && <Dot />}
      </DropdownMenuItem>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <Item t="light" label="Light" Icon={Sun} />
        <Item t="dark" label="Dark" Icon={Moon} />
        <Item t="system" label="System" Icon={Monitor} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ThemeSwitch;
