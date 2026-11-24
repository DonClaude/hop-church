import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, ImageIcon } from "lucide-react";

// Sections no longer fade in on scroll; only each page's hero enters once on load.
export const fadeUp = () => ({});

export function Eyebrow({ children, tone = "muted", className = "" }) {
  const color = tone === "light" ? "text-rose-300" : tone === "brand" ? "text-brand" : "text-slate-500";
  return <p className={`text-xs font-semibold tracking-[0.2em] uppercase ${color} mb-4 ${className}`}>{children}</p>;
}

export function SectionHeading({ title, text, center = false, dark = false }) {
  return (
    <div className={`${center ? "text-center mx-auto" : ""} max-w-3xl mb-12`}>
      <h2 className={`text-3xl md:text-5xl font-bold tracking-tighter leading-tight ${dark ? "text-white" : "text-slate-900"}`}>{title}</h2>
      {text && <p className={`mt-5 text-lg leading-relaxed ${dark ? "text-white/70" : "text-slate-600"}`}>{text}</p>}
    </div>
  );
}

const btnBase =
  "inline-flex items-center justify-center gap-2 min-h-[48px] px-7 py-3 text-sm font-semibold rounded-full transition-all duration-200 hover:-translate-y-px active:translate-y-0 active:scale-[0.98]";
const btnStyles = {
  primary: "bg-brand hover:bg-brand-dark text-white",
  glass: "bg-white/10 hover:bg-white/20 border border-white/25 text-white",
  outline: "border border-slate-300 hover:border-slate-900 text-slate-900",
  outlineDark: "border border-white/25 hover:border-white/60 text-white",
};

export function Button({ to, href, children, variant = "primary", arrow = false, className = "", ...rest }) {
  const cls = `${btnBase} ${btnStyles[variant]} ${className}`;
  const inner = (
    <>
      {children}
      {arrow && <ArrowRight className="w-4 h-4" aria-hidden="true" />}
    </>
  );
  if (to) return <Link to={to} className={cls} {...rest}>{inner}</Link>;
  if (href) {
    const external = href.startsWith("http");
    return (
      <a href={href} className={cls} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} {...rest}>
        {inner}
      </a>
    );
  }
  return <button className={cls} {...rest}>{inner}</button>;
}

// A clearly marked spot for a real church photo, to be swapped in later.
export function PhotoSlot({ label, className = "", dark = false }) {
  return (
    <div role="img" aria-label={`Photo coming soon: ${label}`} className={`relative overflow-hidden ${dark ? "bg-slate-800" : "bg-slate-200"} ${className}`}>
      <div className={`absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] font-medium ${dark ? "bg-black/30 text-white/70" : "bg-white/80 text-slate-500"}`}>
        <ImageIcon className="w-3.5 h-3.5" aria-hidden="true" />
        Photo: {label}
      </div>
    </div>
  );
}

// Page header used at the top of every inner page
export function PageHero({ title, text, photo }) {
  return (
    <section className="relative overflow-hidden bg-slate-950">
      <PhotoSlot label={photo} dark className="absolute inset-0" />
      <div className="absolute inset-0 bg-slate-950/55" />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-28 pb-20 md:pt-40 md:pb-24">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }} className="max-w-3xl">
          <h1 className="text-4xl sm:text-6xl font-bold text-white tracking-tighter leading-[1.05]">{title}</h1>
          {text && <p className="mt-6 text-lg md:text-xl text-white/80 leading-relaxed max-w-2xl">{text}</p>}
        </motion.div>
      </div>
    </section>
  );
}
