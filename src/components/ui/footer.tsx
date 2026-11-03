import Link from "next/link";
import { getJSONData } from "@/lib/serverUtils";
import { EnvelopeClosedIcon, GitHubLogoIcon } from "@radix-ui/react-icons";
import { FaWhatsapp } from "react-icons/fa";
import { ArrowUp, Heart } from "lucide-react";

export default async function Footer() {
  const data = await getJSONData();

  const whatsappUrl = `https://wa.me/${data.contactInfo.phone
    .replace(/\D/g, "")
    .replace(/^0/, "62")}`;

  return (
    <footer className="relative mt-16 overflow-hidden border-t border-border/60 bg-card/30">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 left-1/2 h-56 w-[36rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl"
      />

      <div className="container relative mx-auto max-w-5xl px-4 py-12">
        <div className="grid gap-10 md:grid-cols-[1.6fr_1fr_1fr]">
          <div className="space-y-4">
            <Link href="/#home" className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary via-fuchsia-500 to-cyan-400 text-sm font-bold text-white shadow-lg shadow-primary/25">
                {data.personalInfo.name
                  .replace(/,.*$/, "")
                  .split(" ")
                  .filter(Boolean)
                  .slice(0, 2)
                  .map((word) => word[0])
                  .join("")
                  .toUpperCase()}
              </span>
              <span className="text-sm font-semibold tracking-tight">
                {data.personalInfo.name}
              </span>
            </Link>

            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              {data.personalInfo.title} building modern, responsive, and
              functional web applications.
            </p>

            <div className="flex items-center gap-2">
              <Link
                href={data.contactInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
                prefetch={false}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/60 bg-background/60 text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
              >
                <GitHubLogoIcon className="h-4 w-4" />
              </Link>
              <Link
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/60 bg-background/60 text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
              >
                <FaWhatsapp className="h-4 w-4" />
              </Link>
              <Link
                href={`mailto:${data.contactInfo.email}`}
                aria-label="Send an email"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/60 bg-background/60 text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
              >
                <EnvelopeClosedIcon className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Navigation
            </h3>
            <ul className="space-y-2.5">
              {data.visual.navbar.links.map((item) => (
                <li key={item.path}>
                  <Link
                    href={item.path}
                    className="text-sm text-foreground/70 transition-colors hover:text-primary"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Get in touch
            </h3>
            <ul className="space-y-2.5 text-sm text-foreground/70">
              <li>
                <a
                  href={`mailto:${data.contactInfo.email}`}
                  className="transition-colors hover:text-primary"
                >
                  {data.contactInfo.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${data.contactInfo.phone}`}
                  className="transition-colors hover:text-primary"
                >
                  {data.contactInfo.phone}
                </a>
              </li>
              <li className="text-muted-foreground">Lhokseumawe, Aceh</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border/60 pt-6 text-xs text-muted-foreground sm:flex-row">
          <p>
            © {new Date().getFullYear()}{" "}
            <span className="font-medium text-foreground">
              {data.personalInfo.name}
            </span>
            . All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1">
              Built with <Heart className="h-3 w-3 text-primary" /> using
              Next.js &amp; Tailwind CSS
            </span>
            <Link
              href="#home"
              aria-label="Back to top"
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border/60 bg-background/60 transition-colors hover:border-primary/40 hover:text-primary"
            >
              <ArrowUp className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
