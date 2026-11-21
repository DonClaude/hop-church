import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronDown, MapPin, Clock, Play, ArrowUpRight, Coffee, Users, Heart } from "lucide-react";
import { church, coreValues, ministries, events } from "../data/church";
import { Button, Divider, Eyebrow, PhotoSlot, SectionHeading, fadeUp } from "../components/ui";
import { formatDate } from "../lib/dates";

export default function Home() {
  const upcoming = events.filter((e) => new Date(e.date + "T23:59:59") >= new Date()).slice(0, 3);
  const highlights = ministries.filter((m) => ["Prayer", "Worship", "Family", "Bread of Life"].includes(m.name));

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[88vh] flex items-center justify-center overflow-hidden bg-slate-950">
        <PhotoSlot label="Sunday worship, wide shot of the congregation" dark className="absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-900/60 to-slate-950/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand/25 via-transparent to-transparent" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}>
            <p className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-rose-300 mb-8">
              <span className="w-6 h-px bg-rose-300" />
              House of Prayer Church · Waterbury
              <span className="w-6 h-px bg-rose-300" />
            </p>
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold text-white tracking-tighter leading-[1.02] mb-8">
              You're welcome
              <span className="block bg-gradient-to-r from-rose-300 to-rose-500 bg-clip-text text-transparent pb-2">here.</span>
            </h1>
            <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed font-light mb-10">
              We're a church of all nations in Waterbury, Connecticut. Whoever you are and wherever you're from,
              there's a seat saved for you this Sunday.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button to="/plan-your-visit" arrow>Plan Your Visit</Button>
              <Button to="/watch" variant="glass"><Play className="w-4 h-4" aria-hidden="true" /> Watch Online</Button>
            </div>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 0.6 }} className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 flex flex-col items-center gap-2" aria-hidden="true">
          <span className="text-[10px] font-semibold tracking-[0.2em] uppercase">Scroll</span>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.6 }}><ChevronDown className="w-4 h-4" /></motion.div>
        </motion.div>
      </section>

      {/* Service times strip */}
      <section className="border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-200">
          <div className="py-8 md:pr-10">
            <p className="text-[11px] font-bold tracking-[0.2em] text-brand mb-3 flex items-center gap-2"><Clock className="w-3.5 h-3.5" /> SUNDAY SERVICES</p>
            <p className="text-2xl font-bold tracking-tight">{church.services.map((s) => s.time).join("  ·  ")}</p>
          </div>
          <div className="py-8 md:px-10">
            <p className="text-[11px] font-bold tracking-[0.2em] text-brand mb-3 flex items-center gap-2"><MapPin className="w-3.5 h-3.5" /> LOCATION</p>
            <p className="text-lg font-semibold tracking-tight">{church.mainAddress.line1}</p>
            <p className="text-sm text-slate-500">{church.mainAddress.line2}</p>
          </div>
          <div className="py-8 md:pl-10 flex items-center">
            <a href={church.mapsUrl} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 text-sm font-semibold text-slate-900 hover:text-brand">
              Get directions <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>
      </section>

      {/* First visit */}
      <section className="py-28 md:py-36 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-50/40 via-white to-white pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
          <motion.div {...fadeUp()}>
            <Divider center={false} />
            <Eyebrow>New here?</Eyebrow>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter leading-tight mb-6">Your first Sunday, made easy.</h2>
            <p className="text-lg text-slate-500 leading-relaxed font-light mb-10">
              Walking into a new church can feel like a big step. Here's what your first visit looks like, so you know what to expect before you arrive.
            </p>
            <div className="space-y-6 mb-10">
              {[
                { icon: Coffee, title: "Arrive a few minutes early", text: "Park on site and look for a greeter at the main entrance at 1245 Thomaston Avenue." },
                { icon: Users, title: "Come as you are", text: "You'll find people of every age and background. There's no dress code." },
                { icon: Heart, title: "Worship, Word and prayer", text: "Expect heartfelt worship, a message from the Bible, and a chance to receive prayer." },
              ].map(({ icon: Icon, title, text }, i) => (
                <motion.div key={title} {...fadeUp(i * 0.08)} className="flex gap-5">
                  <div className="w-11 h-11 shrink-0 rounded-full bg-brand/[0.08] text-brand flex items-center justify-center"><Icon className="w-5 h-5" /></div>
                  <div>
                    <h3 className="font-bold tracking-tight">{title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed mt-1">{text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <Button to="/plan-your-visit" arrow>Plan Your Visit</Button>
          </motion.div>
          <motion.div {...fadeUp(0.15)}>
            <PhotoSlot label="Greeters welcoming guests at the door" className="rounded-2xl aspect-[4/5] shadow-2xl" />
          </motion.div>
        </div>
      </section>

      {/* Compassion statement */}
      <section className="relative overflow-hidden bg-slate-950 py-28 md:py-40">
        <PhotoSlot label="Bread of Life volunteers serving families" dark className="absolute inset-0 opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/75 to-slate-950/40" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div {...fadeUp()} className="max-w-2xl">
            <Eyebrow tone="light">Faith in action</Eyebrow>
            <p className="text-6xl sm:text-8xl font-bold text-white tracking-tightest leading-none">10 million</p>
            <p className="text-2xl md:text-3xl font-bold text-white/90 tracking-tight mt-4">pounds of food shared with Waterbury families.</p>
            <p className="text-white/60 leading-relaxed font-light mt-6 max-w-lg">
              Since 1998, our compassion ministry has fed neighbors, housed people in need, and walked with men and women
              on the road to recovery. Every gift and every volunteer is part of that story.
            </p>
            <div className="mt-10"><Button to="/give" variant="glass" arrow>See what giving does</Button></div>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-28 md:py-36 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(172,12,47,0.05)_0%,transparent_60%)]" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeading eyebrow="What we value" title="Seven things that shape us" text="These core values guide how we worship, serve and live together as a church family." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-slate-200 border border-slate-200 rounded-2xl overflow-hidden">
            {coreValues.map((v, i) => (
              <motion.div key={v.title} {...fadeUp(i * 0.05)} className="bg-white p-8">
                <p className="text-[11px] font-bold tracking-[0.2em] text-brand mb-5">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="text-lg font-bold tracking-tight mb-2">{v.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{v.text}</p>
              </motion.div>
            ))}
            <div className="bg-slate-950 p-8 flex flex-col justify-between">
              <p className="text-white/80 text-sm leading-relaxed italic">"A church of all nations, going to all the nations."</p>
              <Link to="/about" className="text-sm font-semibold text-rose-300 hover:text-white mt-6">Our story →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Ministries */}
      <section className="py-28 md:py-36 bg-slate-50/70 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeading eyebrow="Get connected" title="There's a place for you" text="From prayer to worship to serving our city, find where you fit." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map((m, i) => (
              <motion.div key={m.name} {...fadeUp(i * 0.08)}>
                <Link to="/ministries" className="group block bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 overflow-hidden h-full">
                  <PhotoSlot label={m.name} className="aspect-[4/3]" />
                  <div className="p-6">
                    <h3 className="font-bold tracking-tight group-hover:text-brand transition-colors">{m.name}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed mt-2">{m.text}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-12"><Button to="/ministries" variant="outline" arrow>All ministries</Button></div>
        </div>
      </section>

      {/* Watch + events */}
      <section className="py-28 md:py-36">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-5 gap-12">
          <motion.div {...fadeUp()} className="lg:col-span-3">
            <a href={church.social.youtube} target="_blank" rel="noopener noreferrer" className="group block relative rounded-2xl overflow-hidden shadow-2xl">
              <PhotoSlot label="Pastor preaching (sermon thumbnail)" dark className="aspect-video" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                  <Play className="w-8 h-8 text-brand fill-brand ml-1" />
                </span>
              </div>
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-rose-300 mb-2">Live Sundays at 9:00 AM</p>
                <p className="text-2xl font-bold text-white tracking-tight">Watch the latest message</p>
              </div>
            </a>
          </motion.div>
          <motion.div {...fadeUp(0.1)} className="lg:col-span-2 flex flex-col">
            <Eyebrow>Coming up</Eyebrow>
            <h2 className="text-3xl font-bold tracking-tighter mb-8">Upcoming events</h2>
            <div className="divide-y divide-slate-100 border-y border-slate-100 flex-1">
              {upcoming.length ? upcoming.map((e) => {
                const d = formatDate(e.date);
                return (
                  <div key={e.title} className="py-5 flex gap-5">
                    <div className="w-14 shrink-0 text-center">
                      <p className="text-[11px] font-bold tracking-[0.2em] text-brand">{d.month}</p>
                      <p className="text-3xl font-bold tracking-tight leading-none mt-1">{d.day}</p>
                    </div>
                    <div>
                      <p className="font-bold tracking-tight">{e.title}</p>
                      <p className="text-sm text-slate-500 mt-1">{e.time}</p>
                    </div>
                  </div>
                );
              }) : <p className="py-5 text-slate-500 text-sm">Check back soon for upcoming events.</p>}
            </div>
            <Link to="/events" className="mt-6 text-sm font-semibold hover:text-brand">See all events →</Link>
          </motion.div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="relative overflow-hidden bg-slate-950">
        <div className="grid lg:grid-cols-2 min-h-[480px]">
          <PhotoSlot label="Families walking into church" dark className="min-h-[300px] order-2 lg:order-1" />
          <motion.div {...fadeUp(0.1)} className="order-1 lg:order-2 flex flex-col justify-center px-8 md:px-16 py-20">
            <Eyebrow tone="light">See you Sunday</Eyebrow>
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tighter leading-tight mb-6">Let us know<br />you're coming.</h2>
            <p className="text-white/60 leading-relaxed mb-8 font-light max-w-sm">
              Tell us when you plan to visit and someone will be ready to welcome you, show you around and answer any questions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button to="/plan-your-visit" arrow className="w-fit">Plan Your Visit</Button>
              <Button to="/contact" variant="outlineDark" className="w-fit">Ask a question</Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
