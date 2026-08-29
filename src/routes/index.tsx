import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, useRef, type FormEvent } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "motion/react";
import emailjs from "@emailjs/browser";
import { toast } from "sonner";

import {
  Github, Linkedin, Mail, Phone, MapPin, Download, Send, ExternalLink,
  Moon, Sun, Code2, Briefcase, GraduationCap, Award, User, Wrench,
  FileText, ArrowUpRight, Sparkles, Trophy, Rocket, Calendar,
  CheckCircle2, Menu, X, AlertCircle,
} from "lucide-react";
const profileAsset = { url: "/shikha-profile.png" };

// EmailJS configuration (public credentials — safe in client bundle)
const EMAILJS_PUBLIC_KEY = "1TGrJ4Mi9e4ijmPwY";
const EMAILJS_TEMPLATE_ID = "template_ueacc4y";
const EMAILJS_SERVICE_ID = "service_5z7nva7";

emailjs.init(EMAILJS_PUBLIC_KEY);

export const Route = createFileRoute("/")({
  component: Portfolio,
  head: () => ({
    meta: [
      { title: "Shikha Maurya" },
      {
        name: "description",
        content:
          "Robotic Process Automation Developer · UiPath Developer · API Integration Specialist. Enterprise automation, OPERA Cloud migrations, and production-grade automation.",
      },
    ],
  }),
});

// ---------- Data ----------
const LINKS = {
  github: "https://github.com/itx-mee",
  linkedin: "https://www.linkedin.com/in/shikha-maurya-25754322b?utm_source=share_via&utm_content=profile&utm_medium=member_android",
  leetcode: "https://leetcode.com/u/shikha-maurya/",
  email: "mauryashikha903@gmail.com",
  phone: "+91 6390723007",
  location: "India",
  resume: "https://drive.google.com/file/d/1TkxZ9Nr0G9f8P3RsA8QKd8NZgQBmYTcG/view?usp=sharing",
};

const NAV = [
  { id: "profile", label: "Profile", icon: User },
  { id: "works", label: "Works", icon: Briefcase },
  { id: "projects", label: "Projects", icon: Code2 },
  { id: "tools", label: "Tools", icon: Wrench },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "awards", label: "Awards", icon: Award },
  { id: "contact", label: "Contact", icon: Mail },
  { id: "resume", label: "Resume", icon: FileText },
];

const ROLES = [
  "Robotic Process Automation Developer",
  "UiPath Developer",
  "API Integration Specialist",
  "Automation Engineer",
  "Software Developer",
];

const WORKS = [
  {
    company: "Centelli",
    role: "Robotic Process Automation Consultant",
    duration: "March 2025 – Present",
    tag: "Full-time · Enterprise Automation",
    highlights: [
      "Migrated 57 hotels from OPERA V5 to Oracle OPERA Cloud.",
      "Successfully delivered 5+ enterprise migration projects.",
      "Reduced reservation processing time from 24 hours to ~2 hours.",
      "Improved performance by over 90%.",
      "Built production-grade automation services with robust validation, retries, and exception handling.",
    ],
  },
  {
    company: "Centelli",
    role: "Software Engineer Intern",
    duration: "Nov 2024 – Mar 2025",
    tag: "Internship · Training & Certifications",
    highlights: [
      "Completed enterprise automation training.",
      "API integration and workflow design.",
      "Exception handling best practices.",
      "Earned UiPath certifications.",
    ],
  },
];

const PROJECTS = [
  {
    title: "BloomBlog — Blog Management Platform",
    description:
      "A full-stack blog platform with secure authentication, protected routes, and complete CRUD functionality for modern content publishing.",
    tech: ["React.js", "Redux Toolkit", "Appwrite", "React Router", "Tailwind CSS", "TinyMCE"],
    github: "https://github.com/itx-mee/React-Projects/tree/main/12_blogApp",
    demo: "https://blooomblog.netlify.app/",
    gradient: "from-orange-500/30 via-fuchsia-500/20 to-indigo-500/30",
    features: [
      "Developed a full-stack blog platform with secure authentication, protected routes, and CRUD functionality.",
      "Managed application state using Redux Toolkit and implemented client-side routing with React Router.",
      "Integrated Appwrite for authentication, database operations, and image storage.",
      "Built a rich text editing experience with TinyMCE and a responsive Tailwind CSS interface.",
    ],
  },
  {
    title: "Parking Lot LLD",
    description:
      "Developed an OOP CLI system in Java managing three vehicle types with thread-safe concurrent operations and dynamic billing.",
    tech: ["Java", "OOP", "Concurrency", "Multithreading", "CLI"],
    github: "https://github.com/itx-mee/Parking_Lot_LLD",
    demo: "#",
    hideLive: true,
    gradient: "from-emerald-500/30 via-teal-500/20 to-cyan-500/30",
    features: [
      "Supports three vehicle types with dedicated parking-slot allocation",
      "Thread-safe concurrent entry/exit operations using Java concurrency primitives",
      "Dynamic billing engine that calculates fare based on duration and vehicle type",
      "Clean OOP design with extensible classes for future vehicle categories",
      "Interactive CLI for real-time check-in, checkout, and slot-status queries",
    ],
  },
];

const TOOLS = [
  { group: "Languages", items: ["C", "C++", "Java", "JavaScript", "VB.NET", "HTML", "CSS"] },
  { group: "Frontend", items: ["React", "Tailwind CSS", "Redux Toolkit"] },
  { group: "Backend", items: ["Node.js", "REST APIs"] },
  { group: "Automation", items: ["UiPath", "Postman", "Azure DevOps", "Git", "GitHub"] },
  { group: "Core Knowledge", items: ["OOPS", "DSA", "LLD", "HLD", "Computer Networks", "DBMS"] },
];

const EDUCATION = [
  {
    title: "Bachelor of Technology",
    subtitle: "Electronics & Communication Engineering",
    org: "G.B. Pant Government Engineering College",
    location: "New Delhi",
    meta: "CGPA: 8.6 / 10",
    duration: "2021 – 2025",
  },
  {
    title: "Higher Secondary",
    subtitle: "Class XII",
    org: "Deoria senior secondary school (CBSE)",
    location: "Deoria, U.P.",
    meta: "92.6%",
    duration: "",
  },
  {
    title: "Secondary",
    subtitle: "Class X",
    org: "Gurukul Mission (CBSE)",
    location: "Deoria, U.P.",
    meta: "89.4%",
    duration: "",
  },
];

const AWARDS = [
  {
    title: "Star Performer",
    body: "Awarded for successfully delivering 5+ Oracle OPERA Cloud migration projects.",
    icon: Trophy,
  },
  {
    title: "Rising Star",
    body: "Awarded during internship for the highest score among 28 trainees.",
    icon: Rocket,
  },
  {
    title: "UiPath Foundation Certification",
    body: "Certified in UiPath foundational RPA concepts and workflow design.",
    icon: Sparkles,
  },
  {
    title: "UiPath Advanced RPA Developer Certification",
    body: "Certified advanced developer — orchestration, REFramework, and enterprise automation.",
    icon: Sparkles,
  },
];

// ---------- Small building blocks ----------
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 20 });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed left-0 right-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-brand via-brand-2 to-brand-3"
    />
  );
}

function FloatingBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="floating-orb anim-float-slow -top-32 -left-24 h-[420px] w-[420px] bg-brand/40" />
      <div className="floating-orb anim-float-slower top-1/3 -right-32 h-[520px] w-[520px] bg-brand-2/40" />
      <div className="floating-orb anim-float-slow bottom-0 left-1/3 h-[380px] w-[380px] bg-brand-3/40" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_0%,var(--color-background)_75%)]" />
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-foreground) 1px, transparent 1px), linear-gradient(90deg, var(--color-foreground) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
    </div>
  );
}

function ThemeToggle() {
  const [dark, setDark] = useState(true);
  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const isDark = stored ? stored === "dark" : true;
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);
  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };
  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="relative inline-flex h-9 w-16 shrink-0 items-center rounded-full glass px-1 transition-all"
    >
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className={`flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-brand to-brand-2 text-primary-foreground shadow ${dark ? "ml-auto" : ""}`}
      >
        {dark ? <Moon className="h-3.5 w-3.5" /> : <Sun className="h-3.5 w-3.5" />}
      </motion.div>
    </button>
  );
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("profile");
  useEffect(() => {
    const onScroll = () => {
      let cur = "profile";
      for (const n of NAV) {
        const el = document.getElementById(n.id);
        if (el && el.getBoundingClientRect().top <= 120) cur = n.id;
      }
      setActive(cur);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header className="fixed inset-x-0 top-3 z-50 flex justify-center px-3">
      <nav className="glass flex w-full max-w-5xl items-center gap-2 rounded-2xl px-3 py-2">
        <a href="#profile" className="flex items-center gap-2 pl-1 pr-2">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-brand to-brand-2 font-display text-sm font-bold text-primary-foreground">
            SM
          </span>
          <span className="hidden font-display text-sm font-semibold sm:block">
            Shikha<span className="text-muted-foreground">.dev</span>
          </span>
        </a>
        <div className="mx-auto hidden items-center gap-1 lg:flex">
          {NAV.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              className={`relative rounded-full px-3 py-1.5 text-sm transition-colors ${
                active === n.id ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {active === n.id && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 -z-10 rounded-full bg-foreground/10"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              {n.label}
            </a>
          ))}
        </div>
        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            className="grid h-9 w-9 place-items-center rounded-full glass lg:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="absolute left-3 right-3 top-16 z-40 lg:hidden"
          >
            <div className="glass grid grid-cols-2 gap-1 rounded-2xl p-2">
              {NAV.map((n) => (
                <a
                  key={n.id}
                  href={`#${n.id}`}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm hover:bg-foreground/5"
                >
                  <n.icon className="h-4 w-4 text-brand" />
                  {n.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}

function SectionHeader({
  tag, title, subtitle,
}: { tag: string; title: string; subtitle?: string }) {
  return (
    <div className="mx-auto mb-12 max-w-2xl text-center">
      <Reveal>
        <span className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-brand" />
          {tag}
        </span>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-5xl">
          <span className="brand-gradient-text">{title}</span>
        </h2>
      </Reveal>
      {subtitle && (
        <Reveal delay={0.1}>
          <p className="mt-3 text-sm text-muted-foreground sm:text-base">{subtitle}</p>
        </Reveal>
      )}
    </div>
  );
}

// ---------- Sections ----------
function Hero() {
  const [roleIdx, setRoleIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setRoleIdx((i) => (i + 1) % ROLES.length), 2200);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="profile" className="relative flex min-h-dvh items-center pt-28 pb-16">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-10 px-4 lg:grid-cols-[1.15fr_1fr]">
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 font-mono text-xs text-muted-foreground">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
              </span>
              Available for new opportunities
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-5 font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              Hi, I'm <br />
              <span className="brand-gradient-text">Shikha Maurya</span>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-4 flex h-8 items-center gap-2 font-mono text-sm sm:text-base">
              <span className="text-brand">$</span>
              <span className="text-muted-foreground">role </span>
              <span className="text-foreground/70">=</span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={roleIdx}
                  initial={{ y: 12, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -12, opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className="text-foreground"
                >
                  "{ROLES[roleIdx]}"
                </motion.span>
              </AnimatePresence>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
              A passionate <span className="text-foreground">Robotic Process Automation Developer</span> specializing in
              enterprise automation, API integrations, and scalable workflow solutions. Experienced in
              migrating large-scale hospitality systems to <span className="text-foreground">Oracle OPERA Cloud</span>,
              optimizing automation performance, and building reliable production-grade services. Deeply
              interested in full-stack development and modern web technologies.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#contact"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-brand to-brand-2 px-6 py-3 text-sm font-medium text-primary-foreground shadow-lg shadow-brand/30 transition-transform hover:-translate-y-0.5"
              >
                <Mail className="h-4 w-4" /> Contact Me
                <span className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-500 group-hover:translate-x-full" />
              </a>
              <a
                href={LINKS.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full glass px-6 py-3 text-sm font-medium transition-transform hover:-translate-y-0.5"
              >
                <Download className="h-4 w-4" /> Download Resume
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.25}>
            <div className="mt-8 flex flex-wrap items-center gap-2">
              {[
                { icon: Github, href: LINKS.github, label: "GitHub", external: true },
                { icon: Linkedin, href: LINKS.linkedin, label: "LinkedIn", external: true },
                { icon: Code2, href: LINKS.leetcode, label: "LeetCode", external: true },
                { icon: Mail, href: `mailto:${LINKS.email}`, label: "Email" },
                { icon: Phone, href: `tel:${LINKS.phone}`, label: "Phone" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  target={s.external ? "_blank" : undefined}
                  rel={s.external ? "noopener noreferrer" : undefined}
                  className="group grid h-10 w-10 place-items-center rounded-xl glass transition-transform hover:-translate-y-0.5 hover:text-brand"
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
              <span className="inline-flex items-center gap-1.5 rounded-full glass px-3 py-1.5 text-xs text-muted-foreground">
                <MapPin className="h-3.5 w-3.5 text-brand" /> {LINKS.location}
              </span>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="relative mx-auto w-full max-w-md">
            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative"
            >
              <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-brand/50 via-brand-2/40 to-brand-3/40 blur-2xl" />
              <div className="relative overflow-hidden rounded-[2rem] glass p-2">
                <img
                  src={profileAsset.url}
                  alt="Shikha Maurya"
                  width={1024}
                  height={1024}
                  className="h-auto w-full rounded-[1.6rem] object-cover"
                />
                <div className="pointer-events-none absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-white/10" />
              </div>
              <motion.div
                animate={{ rotate: [0, 6, 0, -6, 0] }}
                transition={{ duration: 8, repeat: Infinity }}
                className="absolute -bottom-4 -left-4 rounded-2xl glass px-4 py-3 text-xs"
              >
                <div className="font-mono text-brand">57 hotels</div>
                <div className="text-muted-foreground">Migrated to OPERA Cloud</div>
              </motion.div>
              <motion.div
                animate={{ rotate: [0, -5, 0, 5, 0] }}
                transition={{ duration: 9, repeat: Infinity }}
                className="absolute -top-2 -right-2 rounded-2xl glass px-4 py-3 text-xs"
              >
                <div className="font-mono text-brand-2">+90%</div>
                <div className="text-muted-foreground">Performance boost</div>
              </motion.div>
            </motion.div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Works() {
  return (
    <section id="works" className="relative py-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeader
          tag="Works.log"
          title="Experience"
          subtitle="Enterprise automation, migrations, and production-grade systems."
        />
        <div className="relative mx-auto max-w-3xl">
          <div className="absolute left-4 top-2 bottom-2 w-px bg-gradient-to-b from-brand via-brand-2 to-transparent md:left-1/2" />
          <div className="space-y-10">
            {WORKS.map((w, i) => (
              <Reveal key={w.role + i} delay={i * 0.05}>
                <div className="relative md:grid md:grid-cols-2 md:gap-8">
                  <div className="absolute left-4 top-6 -ml-1.5 h-3 w-3 rounded-full bg-brand ring-4 ring-background md:left-1/2 md:-ml-1.5" />
                  <div
                    className={`ml-10 md:ml-0 ${
                      i % 2 === 0
                        ? "md:col-start-1 md:pr-8 md:text-right"
                        : "md:col-start-2 md:pl-8"
                    }`}
                  >
                    <div className="glass rounded-2xl p-5 transition-transform hover:-translate-y-1">
                      <div className={`flex flex-wrap items-center gap-2 ${i % 2 === 0 ? "md:justify-end" : ""}`}>
                        <span className="inline-flex items-center gap-1 rounded-full bg-brand/15 px-3 py-1 text-xs font-medium text-brand">
                          <Calendar className="h-3 w-3" /> {w.duration}
                        </span>
                        <span className="inline-flex items-center gap-1 rounded-full glass px-3 py-1 text-xs text-muted-foreground">
                          {w.tag}
                        </span>
                      </div>
                      <h3 className="mt-3 font-display text-xl font-semibold">{w.role}</h3>
                      <p className="mt-0.5 text-sm">
                        <span className="text-brand">{w.company}</span>
                      </p>
                      <ul className={`mt-4 space-y-2 text-sm text-muted-foreground ${i % 2 === 0 ? "md:text-right" : ""}`}>
                        {w.highlights.map((h) => (
                          <li key={h} className={`flex gap-2 ${i % 2 === 0 ? "md:flex-row-reverse" : ""}`}>
                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" className="relative py-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeader
          tag="Projects.exe"
          title="Selected Projects"
          subtitle='"Where curiosity meets late-night commits."'
        />
        <div className="grid gap-6 md:grid-cols-2">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.05}>
              <TiltCard>
                <div className="group relative h-full overflow-hidden rounded-3xl glass p-6">
                  <div className={`pointer-events-none absolute -inset-1 rounded-3xl bg-gradient-to-br ${p.gradient} opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100`} />
                  <div className="relative flex items-start justify-between gap-3">
                    <h3 className="font-display text-xl font-semibold">{p.title}</h3>
                    <div className="flex gap-2">
                      <a href={p.github} aria-label="GitHub" target="_blank" rel="noopener noreferrer" className="grid h-9 w-9 place-items-center rounded-full glass transition-colors hover:text-brand">
                        <Github className="h-4 w-4" />
                      </a>
                      {!p.hideLive && (
                        <a href={p.demo} aria-label="Live demo" target="_blank" rel="noopener noreferrer" className="grid h-9 w-9 place-items-center rounded-full glass transition-colors hover:text-brand">
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                  </div>
                  <div className="relative mt-4 flex flex-wrap gap-1.5">
                    {p.tech.map((t) => (
                      <span key={t} className="rounded-full bg-foreground/5 px-2.5 py-1 text-xs text-muted-foreground">
                        {t}
                      </span>
                    ))}
                  </div>
                  <p className="relative mt-4 text-sm leading-relaxed text-muted-foreground">{p.description}</p>
                  {p.features && (
                    <ul className="relative mt-4 space-y-2 text-sm text-muted-foreground">
                      {p.features.map((f) => (
                        <li key={f} className="flex gap-2">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  <div className="relative mt-6 flex flex-wrap gap-2">
                    <a href={p.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-full glass px-3 py-1.5 text-xs hover:text-brand">
                      <Github className="h-3.5 w-3.5" /> GitHub
                    </a>
                    {p.demo !== "#" && (
                      <a href={p.demo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-brand to-brand-2 px-3 py-1.5 text-xs font-medium text-primary-foreground">
                        Live Demo <ArrowUpRight className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </TiltCard>
            </Reveal>
          ))}
          <Reveal delay={0.1}>
            <div className="flex h-full min-h-[240px] items-center justify-center rounded-3xl glass p-6 text-center">
              <div>
                <Sparkles className="mx-auto h-6 w-6 text-brand" />
                <p className="mt-3 text-sm text-muted-foreground">
                  More projects in the pipeline.
                  <br />
                  <span className="text-foreground/70">Come back soon — or peek at GitHub.</span>
                </p>
                <a
                  href={LINKS.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-xs font-medium hover:text-brand"
                >
                  <Github className="h-4 w-4" /> Visit GitHub
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function TiltCard({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg)`;
  };
  const reset = () => {
    if (ref.current) ref.current.style.transform = "perspective(900px) rotateY(0) rotateX(0)";
  };
  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={reset} className="h-full transition-transform duration-200 will-change-transform">
      {children}
    </div>
  );
}

function Tools() {
  return (
    <section id="tools" className="relative py-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeader
          tag="Tools.dll"
          title="Technical Skills"
          subtitle='"If this folder stops changing, either I mastered everything or AI took my job."'
        />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {TOOLS.map((g, i) => (
            <Reveal key={g.group} delay={i * 0.05}>
              <div className="glass h-full rounded-2xl p-5 transition-transform hover:-translate-y-1">
                <div className="flex items-center gap-2">
                  <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-brand/30 to-brand-2/30 text-brand">
                    <Code2 className="h-4 w-4" />
                  </span>
                  <h3 className="font-display text-lg font-semibold">{g.group}</h3>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {g.items.map((it) => (
                    <span
                      key={it}
                      className="rounded-full border border-foreground/10 bg-foreground/[0.03] px-3 py-1 text-xs text-foreground/85 transition-colors hover:border-brand/60 hover:text-brand"
                    >
                      {it}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Education() {
  return (
    <section id="education" className="relative py-24">
      <div className="mx-auto max-w-4xl px-4">
        <SectionHeader
          tag="Education.doc"
          title="Education"
          subtitle='"A timeline of turning ‘I’ll study tomorrow’ into actual qualifications."'
        />
        <div className="space-y-4">
          {EDUCATION.map((e, i) => (
            <Reveal key={e.title} delay={i * 0.05}>
              <div className="glass rounded-2xl p-5 transition-transform hover:-translate-y-1">
                <div className="flex flex-wrap items-center gap-3">
                  {e.duration && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-brand/20 px-3 py-1 text-xs font-medium text-brand">
                      <Calendar className="h-3 w-3" /> {e.duration}
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1 rounded-full glass px-3 py-1 text-xs text-muted-foreground">
                    <Trophy className="h-3 w-3 text-brand" /> {e.meta}
                  </span>
                </div>
                <h3 className="mt-3 font-display text-xl font-semibold text-brand-3">{e.title}</h3>
                <p className="text-sm text-foreground/80">{e.subtitle}</p>
                {e.org && <p className="mt-1 text-sm text-muted-foreground">{e.org}</p>}
                {e.location && (
                  <p className="mt-1 text-sm text-muted-foreground">
                    <MapPin className="mr-1 inline h-3 w-3 text-brand" /> {e.location}
                  </p>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Awards() {
  return (
    <section id="awards" className="relative py-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeader
          tag="Awards.crt"
          title="Achievements"
          subtitle='"My achievement shelf — but digital. Less dust, more dopamine."'
        />
        <div className="grid gap-5 md:grid-cols-2">
          {AWARDS.map((a, i) => (
            <Reveal key={a.title} delay={i * 0.05}>
              <div className="group glass flex h-full items-start gap-4 rounded-2xl p-5 transition-transform hover:-translate-y-1">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-brand to-brand-2 text-primary-foreground shadow-lg shadow-brand/25">
                  <a.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold">{a.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{a.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const formRef = useRef<HTMLFormElement>(null);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;
    const form = formRef.current;
    const fd = new FormData(form);
    const templateParams = {
      from_name: String(fd.get("name") ?? ""),
      from_email: String(fd.get("email") ?? ""),
      subject: String(fd.get("subject") ?? ""),
      message: String(fd.get("message") ?? ""),
    };
    setStatus("sending");
    const loadingId = toast.loading("Sending your message…");
    try {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams);
      setStatus("sent");
      form.reset();
      toast.success("Message sent!", { id: loadingId, description: "Thanks for reaching out — I'll reply soon." });
    } catch (err) {
      console.error("EmailJS error:", err);
      setStatus("error");
      toast.error("Failed to send", { id: loadingId, description: "Please try again or email me directly." });
    }
    setTimeout(() => setStatus("idle"), 4000);
  };


  return (
    <section id="contact" className="relative py-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeader
          tag="Contact.vcf"
          title="Let's get in touch"
          subtitle='"Drop a message here — I promise I reply better than most APIs."'
        />
        <div className="grid gap-6 md:grid-cols-2">
          <Reveal>
            <div className="glass h-full rounded-3xl p-6">
              <h3 className="font-display text-lg font-semibold">Contact details</h3>
              <div className="mt-5 space-y-3">
                {[
                  { icon: Phone, label: "Phone", value: LINKS.phone, href: `tel:${LINKS.phone}` },
                  { icon: Mail, label: "Email", value: LINKS.email, href: `mailto:${LINKS.email}` },
                  { icon: Linkedin, label: "LinkedIn", value: "linkedin.com/in/shikha-maurya-25754322b", href: LINKS.linkedin, target: "_blank", rel: "noopener noreferrer" },
                  { icon: Github, label: "GitHub", value: "github.com/itx-mee", href: LINKS.github, target: "_blank", rel: "noopener noreferrer" },
                  { icon: Code2, label: "LeetCode", value: "leetcode.com/u/shikha-maurya", href: LINKS.leetcode, target: "_blank", rel: "noopener noreferrer" },
                  { icon: MapPin, label: "Location", value: LINKS.location, href: "#" },
                ].map((c) => (
                  <a
                    key={c.label}
                    href={c.href}
                    target={c.target}
                    rel={c.rel}
                    className="group flex items-center gap-3 rounded-xl border border-foreground/5 bg-foreground/[0.02] p-3 transition-colors hover:border-brand/40"
                  >
                    <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-brand to-brand-2 text-primary-foreground">
                      <c.icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs text-muted-foreground">{c.label}</div>
                      <div className="truncate text-sm">{c.value}</div>
                    </div>
                    <ArrowUpRight className="ml-auto h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
                  </a>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <form ref={formRef} onSubmit={onSubmit} className="glass h-full rounded-3xl p-6">
              <h3 className="font-display text-lg font-semibold">Send a message</h3>
              <div className="mt-5 grid gap-3">
                <div className="grid gap-3 sm:grid-cols-2">
                  <Field label="Name" name="name" required />
                  <Field label="Email" name="email" type="email" required />
                </div>
                <Field label="Subject" name="subject" required />
                <label className="block">
                  <span className="text-xs text-muted-foreground">Message</span>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    className="mt-1 w-full rounded-xl border border-foreground/10 bg-foreground/[0.03] px-3 py-2 text-sm outline-none transition-colors focus:border-brand/60 focus:ring-2 focus:ring-brand/20"
                  />
                </label>
                <button
                  type="submit"
                  disabled={status !== "idle"}
                  className="group relative mt-1 inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-brand to-brand-2 px-6 py-3 text-sm font-medium text-primary-foreground shadow-lg shadow-brand/30 transition-transform hover:-translate-y-0.5 disabled:opacity-70"
                >
                  <AnimatePresence mode="wait">
                    {status === "idle" && (
                      <motion.span key="i" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="inline-flex items-center gap-2">
                        <Send className="h-4 w-4" /> Send message
                      </motion.span>
                    )}
                    {status === "sending" && (
                      <motion.span key="s" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        Sending…
                      </motion.span>
                    )}
                    {status === "sent" && (
                      <motion.span key="d" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="inline-flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4" /> Sent!
                      </motion.span>
                    )}
                    {status === "error" && (
                      <motion.span key="e" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="inline-flex items-center gap-2">
                        <AlertCircle className="h-4 w-4" /> Failed — try again
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({ label, name, type = "text", required }: { label: string; name: string; type?: string; required?: boolean }) {
  return (
    <label className="block">
      <span className="text-xs text-muted-foreground">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        className="mt-1 w-full rounded-xl border border-foreground/10 bg-foreground/[0.03] px-3 py-2 text-sm outline-none transition-colors focus:border-brand/60 focus:ring-2 focus:ring-brand/20"
      />
    </label>
  );
}

function Resume() {
  return (
    <section id="resume" className="relative py-24">
      <div className="mx-auto max-w-4xl px-4">
        <SectionHeader
          tag="Resume.pdf"
          title="Resume Explorer"
          subtitle='"Download my resume — because ‘trust me, I can code’ apparently isn’t enough."'
        />
        <Reveal>
          <div className="glass overflow-hidden rounded-3xl p-8">
            <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-brand/15 px-3 py-1 font-mono text-xs text-brand">
                  <FileText className="h-3.5 w-3.5" /> shikha-maurya-resume.pdf
                </div>
                <h3 className="mt-4 font-display text-2xl font-semibold">Full professional resume</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Experience, certifications, education, tools and projects — all in one crisp PDF, ready
                  when you are.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href={LINKS.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand to-brand-2 px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-lg shadow-brand/30"
                  >
                    <Download className="h-4 w-4" /> Download Resume
                  </a>
                  <a
                    href={LINKS.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full glass px-5 py-2.5 text-sm font-medium"
                  >
                    <ExternalLink className="h-4 w-4" /> Open PDF
                  </a>
                </div>
              </div>
              <div className="relative hidden aspect-[3/4] w-40 shrink-0 md:block">
                <div className="absolute inset-0 rotate-3 rounded-2xl bg-gradient-to-br from-brand to-brand-2 opacity-40 blur-xl" />
                <div className="relative flex h-full flex-col rounded-2xl border border-foreground/10 bg-card/80 p-3 shadow-xl">
                  <div className="h-2 w-10 rounded-full bg-brand/60" />
                  <div className="mt-2 space-y-1.5">
                    {Array.from({ length: 10 }).map((_, i) => (
                      <div key={i} className="h-1.5 rounded-full bg-foreground/10" style={{ width: `${60 + ((i * 7) % 35)}%` }} />
                    ))}
                  </div>
                  <div className="mt-auto text-[10px] font-mono text-muted-foreground">pdf · 1 page</div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative mt-10 border-t border-foreground/10 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 text-center md:flex-row md:text-left">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Shikha Maurya. All rights reserved.
        </p>
        <p className="text-xs text-muted-foreground">
          Built with <span className="text-brand">♥</span> using React · TanStack · Tailwind CSS · Motion
        </p>
        <div className="flex gap-2">
          <a href={LINKS.github} aria-label="GitHub" target="_blank" rel="noopener noreferrer" className="grid h-9 w-9 place-items-center rounded-full glass hover:text-brand">
            <Github className="h-4 w-4" />
          </a>
          <a href={LINKS.linkedin} aria-label="LinkedIn" target="_blank" rel="noopener noreferrer" className="grid h-9 w-9 place-items-center rounded-full glass hover:text-brand">
            <Linkedin className="h-4 w-4" />
          </a>
          <a href={`mailto:${LINKS.email}`} aria-label="Email" className="grid h-9 w-9 place-items-center rounded-full glass hover:text-brand">
            <Mail className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}

function Portfolio() {
  return (
    <div className="relative min-h-dvh overflow-x-clip">
      <FloatingBackground />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <Works />
        <Projects />
        <Tools />
        <Education />
        <Awards />
        <Contact />
        <Resume />
      </main>
      <Footer />
    </div>
  );
}
