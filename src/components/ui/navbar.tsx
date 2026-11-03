import Link from "next/link";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { getJSONData } from "@/lib/serverUtils";
import { Menu, Sparkles } from "lucide-react";
import ThemeToggler from "./themeToggler";

export default async function Navbar() {
  const data = await getJSONData();

  const initials = data.personalInfo.name
    .replace(/,.*$/, "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/40 bg-background/70 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-20 max-w-5xl items-center justify-between px-4">
        <Link
          href="/#home"
          className="group flex items-center gap-3"
          prefetch={false}
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary via-fuchsia-500 to-cyan-400 text-sm font-bold text-white shadow-lg shadow-primary/25 transition-transform duration-300 group-hover:scale-105">
            {initials}
          </span>
          <span className="hidden flex-col leading-tight sm:flex">
            <span className="text-sm font-semibold tracking-tight">
              {data.personalInfo.name.replace(/,.*$/, "")}
            </span>
            <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
              {data.personalInfo.title}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {data.visual.navbar.links.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className="link-underline text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggler />
          <Button
            asChild
            size="sm"
            className="hidden rounded-full px-5 shadow-md shadow-primary/20 sm:inline-flex"
          >
            <Link href={`mailto:${data.contactInfo.email}`}>
              <Sparkles className="mr-2 h-3.5 w-3.5" />
              Hire Me
            </Link>
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full lg:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[85%] sm:max-w-xs">
              <div className="mt-6 flex flex-col gap-1">
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  Navigation
                </p>
                {data.visual.navbar.links.map((item) => (
                  <Link
                    key={item.path}
                    href={item.path}
                    className="rounded-lg px-3 py-3 text-base font-medium text-foreground/80 transition-colors hover:bg-accent hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                ))}

                <Button asChild className="mt-4 rounded-full">
                  <Link href={`mailto:${data.contactInfo.email}`}>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Hire Me
                  </Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
