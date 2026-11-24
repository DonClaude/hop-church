import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, ImageIcon } from "lucide-react";

// Shared building blocks, matching hopworship.com.

export const EASE = [0.16, 1, 0.3, 1];

// Slides content up as it scrolls into view (same motion as the worship site)
export const rise = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.85, delay, ease: EASE },
});

export const Container = ({ className = "", children }) => (
  <div className={`max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 ${className}`}>{children}</div>
);

export function MaskLine({ children, delay = 0 }) {
  return (
    <span className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
      <motion.span className="block" initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ duration: 1, delay, ease: EASE }}>
        {children}
      </motion.span>
    </span>
  );
}

const btn = { red: "btn-red", ink: "btn-ink", ghostLight: "btn-ghost-light", ghost: "btn-ghost", link: "link-cta", linkLight: "link-cta-light" };

export function Button({ to, href, children, variant = "red", arrow = false, className = "", ...rest }) {
  const cls = `${btn[variant]} ${className}`;
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
    <div role="img" aria-label={`Photo coming soon: ${label}`} className={`relative overflow-hidden ${dark ? "bg-ink-soft" : "bg-paper-deep"} ${className}`}>
      <div className={`absolute bottom-4 left-4 inline-flex items-center gap-2 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] ${dark ? "bg-black/40 text-white/70" : "bg-white text-stone-500"}`}>
        <ImageIcon className="w-3.5 h-3.5" aria-hidden="true" />
        Photo: {label}
      </div>
    </div>
  );
}

// Top of an inner page: bold headline on white, like the worship site's plain page hero.
export function PageHero({ eyebrow, lines, intro, children }) {
  return (
    <section className="bg-white border-b border-ink/10">
      <Container className="pt-[140px] md:pt-[170px] pb-14 md:pb-20">
        {eyebrow && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.1 }} className="text-[12px] font-bold uppercase tracking-[0.22em] mb-6 text-oxblood">
            {eyebrow}
          </motion.p>
        )}
        <h1 className="headline text-[56px] sm:text-[92px] lg:text-[124px]">
          {lines.map((line, i) => <MaskLine key={i} delay={0.15 + i * 0.1}>{line}</MaskLine>)}
        </h1>
        {(intro || children) && (
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 + lines.length * 0.1, ease: EASE }}
            className="mt-8 md:mt-10 grid lg:grid-cols-12 gap-8 items-end"
          >
            {intro && <p className="lg:col-span-6 text-[17px] md:text-[19px] leading-[1.6] max-w-[38rem] text-stone-600">{intro}</p>}
            {children && <div className="lg:col-span-6 lg:justify-self-end flex flex-wrap gap-3">{children}</div>}
          </motion.div>
        )}
      </Container>
    </section>
  );
}

// Section heading in the worship site's style
export function H2({ children, className = "", light = false }) {
  return <h2 className={`headline text-[48px] sm:text-[72px] lg:text-[88px] ${light ? "text-white" : ""} ${className}`}>{children}</h2>;
}
