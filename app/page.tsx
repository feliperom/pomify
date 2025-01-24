import { Timer } from '@/components/timer';
import { Statistics } from '@/components/statistics';
import { SettingsDialog } from '@/components/settings-dialog';
import { ModeToggle } from '@/components/mode-toggle';
import { Button } from '@/components/ui/button';
import { BarChart, Coffee } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="bg-gradient-to-br from-background via-background to-primary/5 p-8">
      <div className="h-screen flex flex-col justify-between max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <Image
              src="/pomodoro-icon.svg"
              alt="Pomify"
              width={40}
              height={40}
              className="dark:filter dark:brightness-90"
            />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Pomify
            </h1>
          </div>
          <div className="flex gap-2">
            <Link href="/statistics">
              <Button variant="outline" size="icon">
                <BarChart className="h-4 w-4" />
              </Button>
            </Link>
            <SettingsDialog />
            <ModeToggle />
          </div>
        </div>
        <div className="flex items-center justify-center p-8">
          <Timer />
        </div>
        {/* <div className="mt-8">
          <Statistics />
        </div> */}
        <footer className="mb-auto text-center">
          <Link
            href="https://buymeacoffee.com/feliperom"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
          >
            <Coffee className="h-3 w-3" />
            <span className='text-[12px]'>Buy me a coffee</span>
          </Link>
          <p className="mt-2 text-[12px] text-muted-foreground">
            Created with ❤️ by <Link href="https://feliperom.github.io">Feliperom</Link>
          </p>
        </footer>
      </div>
    </main>
  );
}