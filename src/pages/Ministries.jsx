import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { ministries } from "../data/church";
import { Button, PageHero, PhotoSlot, fadeUp } from "../components/ui";

export default function Ministries() {
  return (
    <>
      <PageHero
        eyebrow="Ministries"
        title="Find where you fit."
        text="Whatever your age or season of life, there's a group to grow with and a way to serve. Explore our ministries below."
        photo="Small group praying together"
      />

      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ministries.map((m, i) => {
            const Card = m.link ? "a" : "div";
            return (
              <motion.div key={m.name} {...fadeUp((i % 3) * 0.08)}>
                <Card
                  {...(m.link ? { href: m.link, target: "_blank", rel: "noopener noreferrer" } : {})}
                  className={`group block h-full bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden transition-all duration-300 ${m.link ? "hover:shadow-md hover:-translate-y-1" : ""}`}
                >
                  <PhotoSlot label={m.name} className="aspect-[16/10]" />
                  <div className="p-7">
                    <p className="text-[11px] font-bold tracking-[0.2em] text-brand mb-3">{String(i + 1).padStart(2, "0")}</p>
                    <h2 className="text-xl font-bold tracking-tight mb-2 group-hover:text-brand transition-colors">{m.name}</h2>
                    <p className="text-sm text-slate-500 leading-relaxed">{m.text}</p>
                    {m.link && (
                      <p className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-slate-900 group-hover:text-brand">
                        Learn more <ArrowUpRight className="w-4 h-4" />
                      </p>
                    )}
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section className="pb-28">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <motion.div {...fadeUp()} className="rounded-2xl bg-slate-950 p-10 md:p-14 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(172,12,47,0.25)_0%,transparent_65%)]" />
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tighter mb-4">Not sure where to start?</h2>
              <p className="text-white/60 font-light max-w-md mx-auto mb-8">Visit on a Sunday and we'll help you find the right next step.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button to="/plan-your-visit" arrow>Plan Your Visit</Button>
                <Button to="/contact" variant="outlineDark">Contact us</Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
