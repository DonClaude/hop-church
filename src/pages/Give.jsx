import { motion } from "framer-motion";
import { Smartphone, Church, Mail } from "lucide-react";
import { church } from "../data/church";
import { Button, Eyebrow, PageHero, PhotoSlot, SectionHeading, fadeUp } from "../components/ui";

export default function Give() {
  return (
    <>
      <PageHero
        eyebrow="Give"
        title="Your generosity changes lives in Waterbury."
        text="Every gift helps feed families, support people in recovery, and share the hope of Jesus across our city and the nations."
        photo="Families receiving groceries at Bread of Life"
      />

      {/* Why we give */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
          <motion.div {...fadeUp()}>
            <Eyebrow>Why we give</Eyebrow>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter leading-tight mb-6">Generosity is worship.</h2>
            <p className="text-lg text-slate-500 leading-relaxed font-light mb-8">
              We give because God first gave to us. Whether it's your first gift or you've given faithfully for years,
              your generosity makes ministry possible, here at home and around the world.
            </p>
            <blockquote className="border-l-2 border-brand pl-6">
              <p className="text-xl text-slate-700 italic font-light leading-relaxed">"For God loveth a cheerful giver."</p>
              <p className="text-sm font-semibold text-brand tracking-widest uppercase mt-3">2 Corinthians 9:7</p>
            </blockquote>
          </motion.div>
          <motion.div {...fadeUp(0.1)}><PhotoSlot label="Volunteers serving in the community" className="rounded-2xl aspect-[4/3] shadow-2xl" /></motion.div>
        </div>
      </section>

      {/* Impact */}
      <section className="py-24 md:py-32 bg-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(172,12,47,0.18)_0%,transparent_60%)]" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeading dark eyebrow="What giving does" title="Your gifts at work" text="Each quarter, we'll share a report on what our giving accomplished together." />
          <div className="grid md:grid-cols-3 gap-px bg-white/10 rounded-2xl overflow-hidden">
            {[
              { n: "10M+", l: "pounds of food shared with Waterbury families since 1998" },
              { n: "[__]", l: "men and women supported through Alpha Ministries this quarter" },
              { n: "[__]", l: "families served by Bread of Life this quarter" },
            ].map((s, i) => (
              <motion.div key={i} {...fadeUp(i * 0.08)} className="bg-slate-950 p-10">
                <p className="text-5xl md:text-6xl font-bold text-white tracking-tighter">{s.n}</p>
                <p className="text-white/60 mt-4 leading-relaxed">{s.l}</p>
              </motion.div>
            ))}
          </div>
          <p className="text-center text-white/40 text-sm mt-8">[Link the latest quarterly impact report here.]</p>
        </div>
      </section>

      {/* Ways to give */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeading eyebrow="Ways to give" title="Choose what works for you" />
          <div className="grid md:grid-cols-3 gap-6">
            <motion.div {...fadeUp()} className="rounded-2xl border-2 border-brand p-8 bg-white shadow-lg shadow-brand/10">
              <Smartphone className="w-7 h-7 text-brand mb-5" />
              <h3 className="text-xl font-bold tracking-tight mb-2">Give online</h3>
              <p className="text-sm text-slate-500 leading-relaxed mb-6">Give once or set up recurring giving in a few taps, from any device.</p>
              {church.givingUrl
                ? <Button href={church.givingUrl} arrow>Give now</Button>
                : <p className="text-sm text-slate-400">[Add the church's online giving link in src/data/church.js]</p>}
            </motion.div>
            <motion.div {...fadeUp(0.08)} className="rounded-2xl border border-slate-100 p-8 shadow-sm">
              <Church className="w-7 h-7 text-brand mb-5" />
              <h3 className="text-xl font-bold tracking-tight mb-2">In person</h3>
              <p className="text-sm text-slate-500 leading-relaxed">Give during any Sunday service at {church.mainAddress.line1}.</p>
            </motion.div>
            <motion.div {...fadeUp(0.16)} className="rounded-2xl border border-slate-100 p-8 shadow-sm">
              <Mail className="w-7 h-7 text-brand mb-5" />
              <h3 className="text-xl font-bold tracking-tight mb-2">By mail</h3>
              <p className="text-sm text-slate-500 leading-relaxed">Mail a check to House of Prayer Church, 1263 Thomaston Avenue, Waterbury, CT 06704.</p>
            </motion.div>
          </div>
          <p className="text-center text-sm text-slate-500 mt-12">
            Questions about giving? Call <a href={church.phoneHref} className="font-semibold text-slate-900 hover:text-brand">{church.phone}</a> or email{" "}
            <a href={`mailto:${church.email}`} className="font-semibold text-slate-900 hover:text-brand">{church.email}</a>.
          </p>
        </div>
      </section>
    </>
  );
}
