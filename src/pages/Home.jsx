import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { church, coreValues, ministries, events } from "../data/church";
import { Button, PhotoSlot, SectionHeading } from "../components/ui";
import { formatDate } from "../lib/dates";

export default function Home() {
  const upcoming = events.filter((e) => new Date(e.date + "T23:59:59") >= new Date()).slice(0, 3);
  const highlights = ministries.filter((m) => ["Prayer", "Worship", "Alpha Ministries", "Bread of Life"].includes(m.name));

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[calc(100svh-4rem)] flex items-end overflow-hidden bg-slate-950">
        <PhotoSlot label="Sunday worship, wide shot of the congregation" dark className="absolute inset-0" />
        <div className="absolute inset-0 bg-slate-950/55" />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 pb-20 md:pb-28">
          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }} className="max-w-4xl">
            <h1 className="text-5xl sm:text-7xl lg:text-[5.5rem] font-bold text-white tracking-tighter leading-[1.02] mb-8">
              A church for all nations in Waterbury
            </h1>
            <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-10 max-w-xl">
              Sunday services at 9:00 and 11:00 AM on Thomaston Avenue. The 9:00 service also streams live.
            </p>
            <Button to="/plan-your-visit" arrow>Plan Your Visit</Button>
          </motion.div>
        </div>
      </section>

      {/* Visit block */}
      <section className="py-24 md:py-32">
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter leading-tight mb-10">Service times and directions</h2>
            <dl className="divide-y divide-slate-200 border-y border-slate-200">
              {church.services.map((s) => (
                <div key={s.time} className="py-5 flex items-baseline justify-between gap-6">
                  <dt className="text-slate-600">{s.day}, {s.name.toLowerCase()}</dt>
                  <dd className="text-2xl font-bold tracking-tight">{s.time}</dd>
                </div>
              ))}
              <div className="py-5 flex items-baseline justify-between gap-6">
                <dt className="text-slate-600">Main church</dt>
                <dd className="text-right">
                  <span className="block font-semibold">{church.mainAddress.line1}</span>
                  <span className="block text-sm text-slate-500">{church.mainAddress.line2}</span>
                </dd>
              </div>
            </dl>
            <div className="mt-10">
              <Button href={church.mapsUrl} variant="outline">Get directions</Button>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden border border-slate-200 aspect-[4/3]">
            <iframe title="Map to House of Prayer Church" src={church.mapEmbed} className="w-full h-full" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          </div>
        </div>
      </section>

      {/* First Sunday */}
      <section className="py-24 md:py-32 bg-slate-50 border-y border-slate-100">
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <PhotoSlot label="Greeters welcoming guests at the door" className="lg:col-span-7 rounded-2xl aspect-[4/3]" />
          <div className="lg:col-span-5">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter leading-tight mb-6">Your first Sunday</h2>
            <p className="text-lg text-slate-600 leading-relaxed mb-8">
              Greeters meet you at the main entrance and help you find a seat. The service has worship, a message from the Bible and time for prayer.
            </p>
            <p className="text-slate-600 leading-relaxed mb-10">
              Want to look first? Watch the 9:00 service live on <a href={church.social.youtube} target="_blank" rel="noopener noreferrer" className="font-semibold text-slate-900 underline decoration-slate-300 underline-offset-4 hover:decoration-brand">YouTube</a>.
            </p>
            <Button to="/plan-your-visit" arrow>Plan Your Visit</Button>
          </div>
        </div>
      </section>

      {/* Type moment: Bread of Life */}
      <section className="relative overflow-hidden bg-slate-950 py-24 md:py-32">
        <div className="relative w-full max-w-7xl mx-auto px-6 lg:px-8">
          <p className="text-[clamp(3.5rem,9vw,5rem)] font-bold text-rose-300 tracking-tighter leading-none">10 million</p>
          <div className="mt-10 grid md:grid-cols-2 gap-8 md:gap-16 items-end">
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tighter leading-tight">
              Pounds of food our compassion ministry has given out in Waterbury.
            </h2>
            <div>
              <p className="text-white/70 leading-relaxed mb-8">
                Bread of Life gives free groceries to families who need them. Alpha Ministries offers a Christ-centered home to men and women leaving addiction behind.
              </p>
              <Button to="/give" variant="outlineDark">See where gifts go</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 md:py-32">
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter leading-tight mb-6">Core values at House of Prayer</h2>
            <p className="text-slate-600 leading-relaxed mb-8">Prayer comes first. Our goal is prayer 24 hours a day, every day of the year, in our prayer center.</p>
            <Link to="/about" className="inline-flex items-center min-h-[44px] font-semibold underline decoration-slate-300 underline-offset-4 hover:decoration-brand">Read our story</Link>
          </div>
          <dl className="lg:col-span-8 grid sm:grid-cols-2 gap-x-12 border-t border-slate-200">
            {coreValues.slice(1).map((v) => (
              <div key={v.title} className="py-6 border-b border-slate-200">
                <dt className="text-lg font-bold tracking-tight mb-1">{v.title}</dt>
                <dd className="text-slate-600 leading-relaxed">{v.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Ministries */}
      <section className="py-24 md:py-32 bg-slate-50 border-y border-slate-100">
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter leading-tight">Ministries at House of Prayer</h2>
            <Link to="/ministries" className="inline-flex items-center min-h-[44px] font-semibold underline decoration-slate-300 underline-offset-4 hover:decoration-brand">See all ten ministries</Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map((m) => (
              <Link key={m.name} to="/ministries" className="group block bg-white rounded-2xl border border-slate-200 hover:-translate-y-0.5 hover:shadow-md transition-all duration-300 overflow-hidden">
                <div className="overflow-hidden"><PhotoSlot label={m.name} className="aspect-[4/3] transition-transform duration-500 group-hover:scale-[1.03]" /></div>
                <div className="p-6">
                  <h3 className="font-bold tracking-tight group-hover:text-brand transition-colors">{m.name}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed mt-2">{m.text}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Watch + events */}
      <section className="py-24 md:py-32">
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-5 gap-12">
          <a href={church.social.youtube} target="_blank" rel="noopener noreferrer" className="lg:col-span-3 group block relative rounded-2xl overflow-hidden">
            <PhotoSlot label="Pastor preaching (sermon thumbnail)" dark className="aspect-video transition-transform duration-500 group-hover:scale-[1.02]" />
            <div className="absolute inset-0 bg-slate-950/40" />
            <div className="absolute bottom-6 left-6 right-6">
              <p className="text-sm text-white/80 mb-1">Live every Sunday at 9:00 AM</p>
              <p className="text-2xl md:text-3xl font-bold text-white tracking-tight">Watch the latest sermon</p>
            </div>
          </a>
          <div className="lg:col-span-2 flex flex-col">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter leading-tight mb-8">Upcoming events</h2>
            <div className="divide-y divide-slate-200 border-y border-slate-200 flex-1">
              {upcoming.length ? upcoming.map((e) => {
                const d = formatDate(e.date);
                return (
                  <div key={e.title} className="py-5 flex gap-5">
                    <div className="w-14 shrink-0">
                      <p className="text-xs font-bold tracking-widest text-brand">{d.month}</p>
                      <p className="text-3xl font-bold tracking-tight leading-none mt-1">{d.day}</p>
                    </div>
                    <div>
                      <p className="font-bold tracking-tight">{e.title}</p>
                      <p className="text-sm text-slate-600 mt-1">{e.time}</p>
                    </div>
                  </div>
                );
              }) : <p className="py-5 text-slate-600 text-sm">New events will be posted here.</p>}
            </div>
            <Link to="/events" className="mt-6 inline-flex items-center min-h-[44px] font-semibold underline decoration-slate-300 underline-offset-4 hover:decoration-brand w-fit">See the events calendar</Link>
          </div>
        </div>
      </section>

      {/* Close */}
      <section className="bg-slate-950">
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-8 py-24 md:py-32 grid lg:grid-cols-2 gap-12 items-start">
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tighter leading-tight">Visit House of Prayer this Sunday</h2>
          <div>
            <p className="text-white/70 leading-relaxed mb-8 max-w-md">
              Tell us which Sunday you're coming and a greeter will look out for you at the door.
            </p>
            <Button to="/plan-your-visit" arrow>Plan Your Visit</Button>
          </div>
        </div>
      </section>
    </>
  );
}
