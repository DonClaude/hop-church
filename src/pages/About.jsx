import { motion } from "framer-motion";
import { church, coreValues, beliefs, leaders, history } from "../data/church";
import { Button, Eyebrow, PageHero, PhotoSlot, SectionHeading, fadeUp } from "../components/ui";

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="A church of all nations."
        text="Since 1979, House of Prayer has been a place in Waterbury where people from every background meet Jesus, grow in faith and serve their city."
        photo="The church building on Thomaston Avenue"
      />

      {/* Who we are */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
          <motion.div {...fadeUp()}>
            <Eyebrow>Who we are</Eyebrow>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter leading-tight mb-6">Going to all the nations, starting at home.</h2>
            <div className="space-y-5 text-lg text-slate-500 leading-relaxed font-light">
              <p>
                House of Prayer Church is an {church.denomination} congregation on Thomaston Avenue in Waterbury. We believe church should be a house of prayer for everyone,
                so our doors and our hearts are open to people of every nation, age and story.
              </p>
              <p>
                We gather each Sunday to worship, hear God's Word and pray for one another. During the week, we put our faith to work by feeding families,
                walking with people in recovery and serving our neighbors.
              </p>
            </div>
          </motion.div>
          <motion.div {...fadeUp(0.1)}>
            <PhotoSlot label="Congregation in worship" className="rounded-2xl aspect-[4/3] shadow-2xl" />
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 md:py-32 bg-slate-50/70 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeading eyebrow="Our values" title="Seven core values" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((v, i) => (
              <motion.div key={v.title} {...fadeUp(i * 0.05)} className="bg-white rounded-2xl border border-slate-100 p-7 shadow-sm">
                <p className="text-[11px] font-bold tracking-[0.2em] text-brand mb-4">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="font-bold text-lg tracking-tight mb-2">{v.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{v.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Beliefs */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-3 gap-16">
          <motion.div {...fadeUp()}>
            <Eyebrow>What we believe</Eyebrow>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter leading-tight mb-6">Rooted in the Bible.</h2>
            <p className="text-slate-500 leading-relaxed">
              As part of the {church.denomination}, we hold to its 16 Fundamental Truths. Here are the heart of them.
            </p>
            <a href="https://ag.org/Beliefs/Statement-of-Fundamental-Truths" target="_blank" rel="noopener noreferrer" className="inline-block mt-6 text-sm font-semibold hover:text-brand">
              Read all 16 Fundamental Truths →
            </a>
          </motion.div>
          <div className="lg:col-span-2 grid sm:grid-cols-2 gap-x-10 divide-y sm:divide-y-0 divide-slate-100">
            {beliefs.map((b, i) => (
              <motion.div key={b.title} {...fadeUp(i * 0.05)} className="py-6 border-t border-slate-100">
                <h3 className="font-bold tracking-tight mb-2">{b.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{b.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-24 md:py-32 bg-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(172,12,47,0.18)_0%,transparent_60%)]" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeading dark eyebrow="Leadership" title="Our pastors" text="Rev. James and Verna Lilley have led House of Prayer since 1998, building a church known for prayer and compassion across Waterbury." />
          <div className="grid sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {leaders.map((l, i) => (
              <motion.div key={l.name} {...fadeUp(i * 0.1)} className="rounded-2xl overflow-hidden bg-white/[0.03] border border-white/10">
                <PhotoSlot label={l.name} dark className="aspect-[4/5]" />
                <div className="p-7">
                  <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-rose-300 mb-2">{l.role}</p>
                  <h3 className="text-2xl font-bold text-white tracking-tight">{l.name}</h3>
                  <p className="text-sm text-white/50 mt-1">{l.note}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <motion.div {...fadeUp()} className="mt-16 text-center">
            <p className="text-white/50 text-sm max-w-xl mx-auto">[Add ministry team and office staff here: name, role and photo for each.]</p>
          </motion.div>
        </div>
      </section>

      {/* History */}
      <section className="py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <SectionHeading eyebrow="Our story" title="More than 45 years in Waterbury" />
          <ol className="relative border-l border-slate-200 ml-3">
            {history.map((h, i) => (
              <motion.li key={h.year} {...fadeUp(i * 0.06)} className="pl-10 pb-12 last:pb-0 relative">
                <span className="absolute -left-[7px] top-1.5 w-3.5 h-3.5 rounded-full bg-brand ring-4 ring-white" />
                <p className="text-[11px] font-bold tracking-[0.2em] text-brand mb-2">{h.year}</p>
                <p className="text-lg text-slate-700 leading-relaxed">{h.text}</p>
              </motion.li>
            ))}
          </ol>
          <div className="text-center mt-16"><Button to="/plan-your-visit" arrow>Come visit this Sunday</Button></div>
        </div>
      </section>
    </>
  );
}
