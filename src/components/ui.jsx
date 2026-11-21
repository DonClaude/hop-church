import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, ImageIcon } from "lucide-react";

export const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] },
});

// Small spaced-capital label above a heading (same treatment as hopworship.com)
export function Eyebrow({ children, tone = "muted", className = "" }) {
  const color = tone === "light" ? "text-rose-300" : tone === "brand" ? "text-brand" : "text-slate-400";
  return (
    <p className={`text-xs font-semibold tracking-[0.2em] uppercase ${color} mb-4 ${className}`}>{children}</p>
  );
}

export function Divider({ center = true }) {
  return <div className={`w-12 h-0.5 bg-gradient-to-r from-brand to-rose-400 rounded-full mb-6 ${center ? "mx-auto" : ""}`} />;
}

export function SectionHeading({ eyebrow, title, text, center = true, dark = false }) {
  return (
    <motion.div {...fadeUp()} className={`${center ? "text-center mx-auto" : ""} max-w-3xl mb-14`}>
      <Divider center={center} />
      {eyebrow && <Eyebrow tone={dark ? "light" : "muted"}>{eyebrow}</Eyebrow>}
      <h2 className={`text-3xl md:text-5xl font-bold tracking-tighter leading-tight ${dark ? "text-white" : "text-slate-900"}`}>
        {title}
      </h2>
      {text && (
        <p className={`mt-6 text-lg leading-relaxed font-light ${dark ? "text-white/60" : "text-slate-500"}`}>{text}</p>
      )}
    </motion.div>
  );
}

const btnBase =
  "inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold rounded-full transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand";
const btnStyles = {
  primary: "bg-brand hover:bg-brand-dark text-white shadow-lg shadow-brand/30",
  glass: "bg-white/10 hover:bg-white/20 border border-white/20 text-white backdrop-blur-sm",
  outline: "border border-slate-300 hover:border-slate-900 text-slate-900",
  outlineDark: "border border-white/20 hover:border-white/50 text-white/80 hover:text-white",
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
    <div
      role="img"
      aria-label={`Photo coming soon: ${label}`}
      className={`relative overflow-hidden ${dark ? "bg-slate-900" : "bg-slate-100"} ${className}`}
    >
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage: dark
            ? "radial-gradient(ellipse at 30% 20%, rgba(172,12,47,0.35), transparent 60%), radial-gradient(ellipse at 80% 90%, rgba(255,255,255,0.06), transparent 55%)"
            : "radial-gradient(ellipse at 30% 20%, rgba(172,12,47,0.10), transparent 60%), radial-gradient(ellipse at 80% 90%, rgba(15,23,42,0.06), transparent 55%)",
        }}
      />
      <div className={`absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] font-medium ${dark ? "bg-white/10 text-white/70" : "bg-white/80 text-slate-500"}`}>
        <ImageIcon className="w-3.5 h-3.5" aria-hidden="true" />
        Photo: {label}
      </div>
    </div>
  );
}

// Dark page header used at the top of every inner page
export function PageHero({ eyebrow, title, text, photo }) {
  return (
    <section className="relative overflow-hidden bg-slate-950">
      <PhotoSlot label={photo} dark className="absolute inset-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-950/70 to-slate-950" />
      <div className="absolute inset-0 bg-gradient-to-r from-brand/20 via-transparent to-transparent" />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-24 pb-20 md:pt-32 md:pb-28">
        <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }} className="max-w-3xl">
          <p className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-rose-300 mb-6">
            <span className="w-6 h-px bg-rose-300" />
            {eyebrow}
          </p>
          <h1 className="text-4xl sm:text-6xl font-bold text-white tracking-tighter leading-[1.05]">{title}</h1>
          {text && <p className="mt-6 text-lg md:text-xl text-white/70 leading-relaxed font-light max-w-2xl">{text}</p>}
        </motion.div>
      </div>
    </section>
  );
}
