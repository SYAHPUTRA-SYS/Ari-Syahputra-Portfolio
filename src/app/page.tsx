import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getJSONData } from "@/lib/serverUtils";
import Link from "next/link";
import {
  EnvelopeClosedIcon,
  GitHubLogoIcon,
} from "@radix-ui/react-icons";
import { FaWhatsapp } from "react-icons/fa";
import Image from "next/image";
import ProjectImageSlider from "@/components/ui/project-image-slider";
import {
  ArrowRight,
  ArrowUpRight,
  Briefcase,
  CalendarDays,
  CheckCircle2,
  Code2,
  Database,
  GraduationCap,
  Layers,
  Mail,
  MapPin,
  Sparkles,
  Wrench,
  type LucideIcon,
} from "lucide-react";

export default async function Home() {
  const data = await getJSONData();
  const sections = data.visual.home.sections;

  const whatsappUrl = `https://wa.me/${data.contactInfo.phone
    .replace(/\D/g, "")
    .replace(/^0/, "62")}`;

  const allSkills = Object.values(data.skills).flat();

  const gpaMatch = data.education[0]?.location.match(
    /IPK:\s*([\d.]+)\s*\/\s*([\d.]+)/i
  );

  const stats = [
    { value: `${data.projects.length}+`, label: "Projects built" },
    { value: `${allSkills.length}+`, label: "Tools & skills" },
    { value: `${data.workExperience.length}`, label: "Internship" },
    {
      value: gpaMatch ? gpaMatch[1] : "3.5",
      label: gpaMatch ? `GPA / ${gpaMatch[2]}` : "GPA",
    },
  ];

  const skillGroups: {
    title: string;
    icon: LucideIcon;
    accent: string;
    items: string[];
  }[] = [
    {
      title: "Languages",
      icon: Code2,
      accent: "from-violet-500 to-fuchsia-500",
      items: data.skills.languages,
    },
    {
      title: "Frameworks",
      icon: Layers,
      accent: "from-sky-500 to-cyan-400",
      items: data.skills.frameworks,
    },
    {
      title: "Databases",
      icon: Database,
      accent: "from-emerald-500 to-teal-400",
      items: data.skills.databases,
    },
    {
      title: "Tools & Cloud",
      icon: Wrench,
      accent: "from-amber-500 to-orange-400",
      items: data.skills.tools,
    },
  ];

  const heroTech = [
    data.skills.frameworks[0] ?? "Laravel",
    data.skills.languages.find((skill) => skill.toLowerCase() === "php") ??
      "PHP",
    data.skills.databases[0] ?? "MySQL",
  ];

  const heroTechPositions = [
    "-left-4 top-8 sm:-left-8",
    "-right-4 top-1/3 sm:-right-8",
    "-bottom-4 left-6 sm:left-2",
  ];

  return (
    <main className="overflow-hidden">
      {/* Banner / Hero Section */}
      {sections.banner && (
        <section id="home" className="relative">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
          >
            <div className="absolute inset-0 bg-grid-light bg-grid [mask-image:radial-gradient(ellipse_65%_55%_at_50%_0%,black,transparent)]" />
            <div className="absolute -top-40 left-1/2 h-[26rem] w-[26rem] -translate-x-1/2 animate-blob rounded-full bg-primary/20 blur-3xl" />
            <div className="absolute right-0 top-48 h-64 w-64 animate-float-slow rounded-full bg-cyan-400/15 blur-3xl" />
          </div>

          <div className="container mx-auto max-w-5xl px-4 pb-16 pt-10 md:pb-20 md:pt-16">
            <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
              <div className="order-2 space-y-7 lg:order-1">
                <div className="animate-fade-up">
                  <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-xs font-medium text-primary">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                    </span>
                    Available for new opportunities
                  </span>
                </div>

                <div className="animate-fade-up animation-delay-150 space-y-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                    Hello, I&apos;m
                  </p>
                  <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
                    <span className="text-gradient">
                      {data.personalInfo.name.replace(/,.*$/, "")}
                    </span>
                    <span className="mt-2 block text-2xl font-semibold text-foreground/80 sm:text-3xl">
                      {data.personalInfo.title}
                    </span>
                  </h1>
                  <p className="max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
                    {data.personalInfo.bio}
                  </p>
                </div>

                <div className="animate-fade-up animation-delay-300 flex flex-wrap items-center gap-3">
                  <Button
                    asChild
                    size="lg"
                    className="group rounded-full px-7 shadow-lg shadow-primary/25"
                  >
                    <Link href="#projects" prefetch={false}>
                      View Projects
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>

                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="rounded-full px-7"
                  >
                    <Link href={`mailto:${data.contactInfo.email}`}>
                      <Mail className="mr-2 h-4 w-4" />
                      Let&apos;s Talk
                    </Link>
                  </Button>
                </div>

                <div className="animate-fade-up animation-delay-450 flex items-center gap-3 pt-1">
                  <span className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                    Find me
                  </span>
                  <span className="h-px w-8 bg-border" />
                  <SocialIconLink
                    href={data.contactInfo.github}
                    label="GitHub profile"
                  >
                    <GitHubLogoIcon className="h-4 w-4" />
                  </SocialIconLink>
                  <SocialIconLink
                    href={whatsappUrl}
                    label="WhatsApp"
                  >
                    <FaWhatsapp className="h-4 w-4 text-emerald-500" />
                  </SocialIconLink>
                  <SocialIconLink
                    href={`mailto:${data.contactInfo.email}`}
                    label="Send an email"
                  >
                    <EnvelopeClosedIcon className="h-4 w-4" />
                  </SocialIconLink>
                </div>
              </div>

              <div className="order-1 flex justify-center lg:order-2">
                <div className="relative mx-auto w-fit">
                  <div
                    aria-hidden="true"
                    className="absolute -inset-8 rounded-full bg-gradient-to-br from-primary/30 via-fuchsia-500/20 to-cyan-400/20 blur-2xl"
                  />

                  <div className="relative h-64 w-64 rotate-3 rounded-[2.25rem] bg-gradient-to-br from-primary via-fuchsia-500 to-cyan-400 p-[3px] shadow-2xl shadow-primary/25 transition-transform duration-500 hover:rotate-0 sm:h-80 sm:w-80">
                    <div className="relative h-full w-full overflow-hidden rounded-[calc(2.25rem-3px)] bg-background">
                      <Image
                        src="/assets/Ari.jpeg"
                        alt={data.personalInfo.name}
                        fill
                        priority
                        sizes="(min-width: 1024px) 320px, 256px"
                        className="object-cover object-center"
                      />
                    </div>
                  </div>

                  {heroTech.map((tech, index) => (
                    <span
                      key={tech}
                      className={`absolute ${heroTechPositions[index]} animate-float rounded-full border border-border/60 bg-background/90 px-3 py-1.5 text-xs font-semibold shadow-lg backdrop-blur`}
                      style={{ animationDelay: `${index * 1.1}s` }}
                    >
                      {tech}
                    </span>
                  ))}

                  <span className="absolute -right-2 -top-2 flex h-10 w-10 items-center justify-center rounded-full border border-border/60 bg-background/90 shadow-lg backdrop-blur">
                    <Sparkles className="h-4 w-4 text-primary" />
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-border/60 bg-card/60 p-4 text-center backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10"
                >
                  <div className="text-gradient text-2xl font-bold">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Skills Section */}
      <section id="skills" className="section-shell">
        <SectionHeading
          eyebrow="Capabilities"
          title="Skills & Technologies"
          description="The languages, frameworks, and tools I use to turn ideas into reliable, production-ready web applications."
        />

        <div className="grid gap-4 sm:grid-cols-2">
          {skillGroups.map(({ title, icon: Icon, accent, items }) => (
            <div
              key={title}
              className="group rounded-2xl border border-border/60 bg-card/60 p-6 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10"
            >
              <div className="mb-5 flex items-center gap-3">
                <span
                  className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${accent} text-white shadow-md`}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-semibold tracking-tight">{title}</h3>
                  <p className="text-xs text-muted-foreground">
                    {items.length} technologies
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {items.map((item) => (
                  <Badge
                    key={item}
                    variant="secondary"
                    className="rounded-full px-3 py-1 font-medium transition-colors group-hover:bg-secondary/80"
                  >
                    {item}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Experience Section */}
      {sections.experience && (
        <section id="experience" className="section-shell">
          <SectionHeading
            eyebrow="Career"
            title="Work Experience"
            description="Where I have applied my skills to build real products and grow as a developer."
          />

          <div className="relative space-y-6 before:absolute before:left-[15px] before:top-3 before:h-[calc(100%-1.5rem)] before:w-px before:bg-gradient-to-b before:from-primary/60 before:via-border before:to-transparent sm:before:left-[19px]">
            {data.workExperience.map((exp) => {
              const hasWebsite =
                exp.companyWebsite &&
                exp.companyWebsite !== "#!" &&
                exp.companyWebsite !== "#";

              return (
                <div key={exp.id} className="relative pl-12 sm:pl-14">
                  <span className="absolute left-0 top-2 flex h-8 w-8 items-center justify-center rounded-full border border-primary/30 bg-background shadow-sm sm:h-10 sm:w-10">
                    <Briefcase className="h-4 w-4 text-primary" />
                  </span>

                  <Card className="border-border/60 bg-card/60 backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10">
                    <CardHeader>
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <CardTitle className="text-xl leading-snug">
                            {exp.role}
                          </CardTitle>
                          <p className="mt-1 text-sm font-medium">
                            {hasWebsite ? (
                              <Link
                                href={exp.companyWebsite}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary transition-colors hover:text-primary/80"
                              >
                                {exp.company}
                              </Link>
                            ) : (
                              <span className="text-primary">
                                {exp.company}
                              </span>
                            )}
                          </p>
                        </div>

                        <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
                          <CalendarDays className="h-3.5 w-3.5" />
                          {exp.startDate}
                        </span>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <div>
                        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                          Key Responsibilities
                        </p>
                        <ul className="space-y-2">
                          {exp.keyResponsibilities.map((responsibility) => (
                            <li
                              key={responsibility}
                              className="flex gap-2.5 text-sm leading-relaxed text-muted-foreground"
                            >
                              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary/70" />
                              <span>{responsibility}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {exp.technologies?.length > 0 && (
                        <div className="flex flex-wrap gap-2 pt-1">
                          {exp.technologies.map((tech) => (
                            <Badge
                              key={tech}
                              variant="outline"
                              className="rounded-full px-2.5 py-0.5 text-[11px] font-medium"
                            >
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Projects Section */}
      {sections.project && (
        <section id="projects" className="section-shell">
          <SectionHeading
            eyebrow="Selected work"
            title="My Projects"
            description="A selection of applications I have designed and built — from data classification tools to booking systems."
          />

          <div className="grid grid-cols-1 gap-6">
            {data.projects.map((project, index) => {
              const images =
                project.images && project.images.length > 0
                  ? project.images
                  : project.cover
                    ? [project.cover]
                    : [];

              return (
                <Card
                  key={project.title}
                  className="group overflow-hidden border-border/60 bg-card/60 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10"
                >
                  <div className="grid lg:grid-cols-[0.95fr_1.35fr]">
                    <div className="relative border-b border-border/50 bg-muted/20 p-3 lg:border-b-0 lg:border-r">
                      <span className="absolute left-5 top-5 z-10 rounded-full bg-background/85 px-2.5 py-1 text-[11px] font-bold text-primary shadow-sm backdrop-blur">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <ProjectImageSlider
                        images={images}
                        alt={project.title}
                      />
                    </div>

                    <div className="flex flex-col">
                      <CardHeader className="gap-3">
                        <CardTitle className="text-xl leading-snug transition-colors group-hover:text-primary md:text-2xl">
                          {project.title}
                        </CardTitle>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech) => (
                            <Badge
                              key={tech}
                              variant="secondary"
                              className="rounded-full px-2.5 py-0.5 text-[11px] font-medium"
                            >
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </CardHeader>

                      <CardContent className="flex-1">
                        <CardDescription className="text-sm leading-relaxed md:text-[15px]">
                          {project.description}
                        </CardDescription>
                      </CardContent>

                      <CardFooter>
                        {project.code_repo_url && (
                          <Button
                            asChild
                            size="sm"
                            variant="outline"
                            className="group/button rounded-full"
                          >
                            <Link
                              href={project.code_repo_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              prefetch={false}
                            >
                              <GitHubLogoIcon className="mr-2 h-3.5 w-3.5" />
                              View Repository
                              <ArrowUpRight className="ml-1.5 h-3.5 w-3.5 transition-transform group-hover/button:-translate-y-0.5 group-hover/button:translate-x-0.5" />
                            </Link>
                          </Button>
                        )}
                      </CardFooter>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </section>
      )}

      {/* Education Section */}
      {sections.education && (
        <section id="education" className="section-shell">
          <SectionHeading
            eyebrow="Background"
            title="Education"
            description="The academic foundation behind my approach to software and technology."
          />

          <div className="grid gap-5 md:grid-cols-2">
            {data.education.map((education) => {
              const [place, grade] = education.location
                .split("|")
                .map((part) => part.trim());

              return (
                <Card
                  key={education.id}
                  className="group relative overflow-hidden border-border/60 bg-card/60 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10"
                >
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-fuchsia-500 to-cyan-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  <CardHeader className="gap-4">
                    <div className="flex items-start gap-4">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/15 to-cyan-400/15 text-primary ring-1 ring-primary/15">
                        <GraduationCap className="h-5 w-5" />
                      </span>
                      <div className="space-y-1">
                        <CardTitle className="text-lg leading-snug">
                          {education.institution}
                        </CardTitle>
                        <p className="text-sm font-medium text-primary">
                          {education.degree}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 font-medium text-secondary-foreground">
                        <CalendarDays className="h-3.5 w-3.5" />
                        {education.startDate} — {education.endDate}
                      </span>
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 font-medium text-secondary-foreground">
                        <MapPin className="h-3.5 w-3.5" />
                        {place}
                      </span>
                      {grade && (
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 font-semibold text-primary">
                          {grade}
                        </span>
                      )}
                    </div>
                  </CardHeader>

                  <CardContent>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {education.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>
      )}

      {/* Call to action */}
      <section className="container mx-auto max-w-5xl px-4 pb-20">
        <div className="relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/10 via-fuchsia-500/10 to-cyan-400/10 px-6 py-12 text-center md:px-12 md:py-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 rounded-full bg-primary/20 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-20 -right-10 h-56 w-56 rounded-full bg-cyan-400/20 blur-3xl"
          />

          <div className="relative">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-background/60 px-3 py-1 text-xs font-medium text-primary backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" />
              Open for collaboration
            </span>

            <h2 className="mt-5 text-3xl font-bold tracking-tight md:text-4xl">
              Let&apos;s build something{" "}
              <span className="text-gradient">great together</span>
            </h2>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
              Have a project in mind or looking for a developer to join your
              team? I&apos;d love to hear from you.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button
                asChild
                size="lg"
                className="rounded-full px-7 shadow-lg shadow-primary/25"
              >
                <Link href={`mailto:${data.contactInfo.email}`}>
                  <Mail className="mr-2 h-4 w-4" />
                  Send an Email
                </Link>
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full bg-background/60 px-7 backdrop-blur"
              >
                <Link
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaWhatsapp className="mr-2 h-4 w-4 text-emerald-500" />
                  Chat on WhatsApp
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-12 max-w-2xl space-y-3">
      <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-primary">
        <span className="h-px w-8 bg-primary/60" />
        {eyebrow}
      </div>
      <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{title}</h2>
      {description && (
        <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
          {description}
        </p>
      )}
    </div>
  );
}

function SocialIconLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      prefetch={false}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/60 bg-background/60 text-muted-foreground shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary hover:shadow-md"
    >
      {children}
    </Link>
  );
}
