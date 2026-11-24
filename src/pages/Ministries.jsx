import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { ministries } from "../data/church";
import { Container, PageHero, PhotoSlot, rise } from "../components/ui";

export default function Ministries() {
  return (
    <>
      <PageHero
        eyebrow="Ministries"
        lines={["Find your", <span key="a" className="accent text-oxblood">place.</span>]}
        intro="Ten ministries for prayer, worship, men, women, families and our neighbors across Waterbury."
      />

      <section className="py-24 md:py-36">
        <Container>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-16">
            {ministries.map((m, i) => {
              const Card = m.link ? "a" : "div";
              return (
                <motion.div key={m.name} {...rise((i % 3) * 0.08)}>
                  <Card {...(m.link ? { href: m.link, target: "_blank", rel: "noopener noreferrer" } : {})} className="group block">
                    <div className="overflow-hidden"><PhotoSlot label={m.name} className="aspect-[4/3] transition-transform duration-700 ease-out group-hover:scale-[1.03]" /></div>
                    <div className="mt-5 pt-5 border-t-2 border-ink flex items-start justify-between gap-4">
                      <h2 className="headline text-[34px] md:text-[40px] transition-colors group-hover:text-oxblood">{m.name}</h2>
                      {m.link && <ArrowUpRight className="w-6 h-6 mt-1 shrink-0 text-stone-400 transition-all group-hover:text-oxblood group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />}
                    </div>
                    <p className="mt-3 text-[16px] leading-[1.6] text-stone-600">{m.text}</p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="bg-paper-deep py-24 md:py-32">
        <Container>
          <div className="grid lg:grid-cols-12 gap-8 items-end">
            <motion.h2 {...rise()} className="lg:col-span-8 headline text-[52px] sm:text-[80px] lg:text-[96px]">
              Not sure where to <span className="accent text-oxblood">start?</span>
            </motion.h2>
            <motion.div {...rise(0.1)} className="lg:col-span-4">
              <p className="text-[17px] leading-[1.6] text-stone-600 mb-8">Come on a Sunday and ask a greeter. They'll introduce you to the ministry leaders.</p>
              <Link to="/plan-your-visit" className="btn-red">Plan your visit <ArrowRight className="w-4 h-4" /></Link>
            </motion.div>
          </div>
        </Container>
      </section>
    </>
  );
}
