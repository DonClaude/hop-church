import { motion } from "framer-motion";
import { events, weekly } from "../data/church";
import { Button, Eyebrow, PageHero, PhotoSlot, SectionHeading, fadeUp } from "../components/ui";
import { formatDate } from "../lib/dates";

export default function Events() {
  const upcoming = events
    .filter((e) => new Date(e.date + "T23:59:59") >= new Date())
    .sort((a, b) => a.date.localeCompare(b.date));

  return (
    <>
      <PageHero
        eyebrow="Events"
        title="What's happening at House of Prayer."
        text="Services, special gatherings and ways to get involved. Everyone is welcome."
        photo="A church event in the Family Life Center"
      />

      <section className="py-24 md:py-32">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <SectionHeading eyebrow="Upcoming" title="Mark your calendar" />
          {upcoming.length === 0 && <p className="text-center text-slate-500">New events are coming soon. Check back shortly.</p>}
          <div className="space-y-6">
            {upcoming.map((e, i) => {
              const d = formatDate(e.date);
              return (
                <motion.article key={e.title + e.date} {...fadeUp(i * 0.06)} className="grid md:grid-cols-[200px_1fr] rounded-2xl border border-slate-100 shadow-sm overflow-hidden bg-white">
                  <div className="bg-slate-950 text-white p-8 flex md:flex-col items-center md:items-start justify-between md:justify-center gap-2 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(172,12,47,0.35)_0%,transparent_70%)]" />
                    <p className="relative text-[11px] font-bold tracking-[0.25em] text-rose-300">{d.month}</p>
                    <p className="relative text-6xl font-bold tracking-tighter leading-none">{d.day}</p>
                    <p className="relative text-sm text-white/60">{d.weekday}</p>
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-bold tracking-tight mb-2">{e.title}</h3>
                    <p className="text-sm font-semibold text-brand mb-4">{e.time}</p>
                    <p className="text-slate-500 leading-relaxed">{e.text}</p>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-slate-50/70 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
          <motion.div {...fadeUp()}>
            <Eyebrow>Every week</Eyebrow>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-10">Our weekly rhythm</h2>
            <div className="divide-y divide-slate-200 border-y border-slate-200">
              {weekly.map((w) => (
                <div key={w.day + w.time} className="py-5 flex justify-between gap-6">
                  <div>
                    <p className="font-bold tracking-tight">{w.title}</p>
                    <p className="text-sm text-slate-500">{w.day}</p>
                  </div>
                  <p className="font-bold text-brand">{w.time}</p>
                </div>
              ))}
            </div>
            <p className="text-sm text-slate-400 mt-6">[Add weekly prayer meetings, Bible studies and youth nights here.]</p>
            <div className="mt-10"><Button to="/plan-your-visit" arrow>Plan Your Visit</Button></div>
          </motion.div>
          <motion.div {...fadeUp(0.1)}><PhotoSlot label="Midweek gathering" className="rounded-2xl aspect-[4/3] shadow-2xl" /></motion.div>
        </div>
      </section>
    </>
  );
}
