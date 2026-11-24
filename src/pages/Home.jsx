import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Play } from "lucide-react";
import { church, coreValues, ministries, events } from "../data/church";
import { Container, EASE, MaskLine, PhotoSlot, rise } from "../components/ui";
import { formatDate } from "../lib/dates";

const firstSunday = [
  { step: "Arrive", text: "Park in the church lot and come in through the main entrance at 1245 Thomaston Avenue." },
  { step: "Worship", text: "The service opens with worship led by the HOP Worship Team." },
  { step: "The Word", text: "A message from the Bible, taught by one of our pastors." },
  { step: "Prayer", text: "The prayer team is at the front after every service if you'd like someone to pray with you." },
];

export default function Home() {
  const upcoming = events.filter((e) => new Date(e.date + "T23:59:59") >= new Date()).slice(0, 3);
  const highlights = ministries.filter((m) => ["Prayer", "Worship", "Alpha Ministries", "Bread of Life"].includes(m.name));

  return (
    <div className="bg-white text-ink">
      {/* ── Hero ── */}
      <section className="relative min-h-[100svh] flex flex-col justify-end overflow-hidden bg-ink-night text-white">
        <PhotoSlot label="Sunday worship, wide shot of the congregation" dark className="absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/45" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-transparent to-transparent" />

        <Container className="relative w-full pt-40 pb-10 md:pb-14">
          <h1 className="headline text-[64px] min-[400px]:text-[72px] sm:text-[116px] lg:text-[min(160px,17vh)] xl:text-[min(184px,19vh)] leading-[0.84] [font-stretch:62%]">
            <MaskLine delay={0.1}>
              <span className="block font-sans font-bold tracking-[0.3em] [font-stretch:100%] leading-none mb-[0.18em] text-[15px] sm:text-[18px] lg:text-[20px]">
                House of Prayer · Waterbury
              </span>
            </MaskLine>
            <MaskLine delay={0.2}>A church for</MaskLine>
            <MaskLine delay={0.3}>all <span className="text-oxblood">nations</span></MaskLine>
          </h1>

          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.55, ease: EASE }}
            className="mt-3 accent text-[34px] sm:text-[46px] lg:text-[54px] leading-none text-white">
            Stronger together.
          </motion.p>

          <div className="mt-6 md:mt-8 grid lg:grid-cols-12 gap-8 items-end">
            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.75, ease: EASE }}
              className="lg:col-span-6 text-[16px] md:text-[18px] leading-[1.55] text-white/85 max-w-[36rem]">
              Join us Sundays at 9:00 and 11:15 AM on Thomaston Avenue. Whoever you are and wherever you're from, there's a seat for you.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.95, ease: EASE }}
              className="lg:col-span-6 flex flex-wrap gap-3 lg:justify-end">
              <Link to="/plan-your-visit" className="btn-red">Plan your visit <ArrowRight className="w-4 h-4" /></Link>
              <Link to="/watch" className="btn-ghost-light">Watch online</Link>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ── Sunday times ── */}
      <section className="py-24 md:py-36">
        <Container>
          <div className="grid lg:grid-cols-12 gap-y-12 lg:gap-x-14">
            <div className="lg:col-span-5">
              <motion.p {...rise()} className="eyebrow !text-oxblood mb-6">Every Sunday</motion.p>
              <motion.h2 {...rise(0.05)} className="headline text-[56px] sm:text-[80px] lg:text-[96px]">
                Service <span className="accent text-oxblood">times.</span>
              </motion.h2>
              <motion.p {...rise(0.1)} className="mt-8 text-[18px] leading-[1.6] text-stone-600 max-w-[30rem]">
                Both services are in the main church at {church.mainAddress.line1}. The 9:00 service streams live on YouTube and Facebook.
              </motion.p>
              <motion.div {...rise(0.15)} className="mt-10">
                <a href={church.mapsUrl} target="_blank" rel="noopener noreferrer" className="btn-ink">Get directions <ArrowUpRight className="w-4 h-4" /></a>
              </motion.div>
            </div>
            <motion.div {...rise(0.1)} className="lg:col-span-7">
              <table className="w-full text-left">
                <caption className="sr-only">Sunday service times</caption>
                <tbody>
                  {church.services.map((s) => (
                    <tr key={s.time} className="border-t border-ink/15 first:border-t-2 first:border-ink">
                      <th scope="row" className="py-6 pr-6 font-normal w-[55%]">
                        <span className="headline text-[64px] md:text-[88px] whitespace-nowrap">{s.time.replace(" AM", "")}<span className="text-[0.38em] align-top ml-1.5">AM</span></span>
                      </th>
                      <td className="py-6 text-[17px] text-ink">
                        <span className="font-bold block">{s.name}</span>
                        {s.note && <span className="text-stone-600">{s.note}</span>}
                      </td>
                    </tr>
                  ))}
                  <tr className="border-t border-ink/15 border-b">
                    <th scope="row" className="py-6 pr-6 font-normal align-top">
                      <span className="text-[12px] font-bold uppercase tracking-[0.16em] text-stone-500">Where</span>
                    </th>
                    <td className="py-6 text-[17px]">
                      <span className="font-bold block">{church.mainAddress.line1}</span>
                      <span className="text-stone-600">{church.mainAddress.line2}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ── First Sunday ── */}
      <section className="pb-24 md:pb-36">
        <Container>
          <div className="grid lg:grid-cols-12 gap-y-14 lg:gap-x-14 items-center">
            <div className="lg:col-span-6">
              <motion.p {...rise()} className="eyebrow !text-oxblood mb-6">New here</motion.p>
              <motion.h2 {...rise(0.05)} className="headline text-[56px] sm:text-[80px] lg:text-[96px]">
                Your first <span className="accent text-oxblood">Sunday.</span>
              </motion.h2>
              <motion.ul {...rise(0.1)} className="mt-12 border-t-2 border-ink">
                {firstSunday.map((s) => (
                  <li key={s.step} className="grid sm:grid-cols-[10rem_1fr] gap-x-6 gap-y-1 py-5 border-b border-ink/15">
                    <span className="headline text-[30px] md:text-[34px]">{s.step}</span>
                    <span className="text-[16px] leading-[1.6] text-stone-600 sm:pt-1">{s.text}</span>
                  </li>
                ))}
              </motion.ul>
              <motion.div {...rise(0.15)} className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
                <Link to="/plan-your-visit" className="btn-red">Plan your visit <ArrowRight className="w-4 h-4" /></Link>
                <Link to="/plan-your-visit" className="link-cta">Common questions</Link>
              </motion.div>
            </div>
            <motion.div {...rise(0.1)} className="lg:col-span-6">
              <PhotoSlot label="Greeters welcoming guests at the door" className="aspect-[4/5]" />
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ── Full-bleed statement ── */}
      <section className="relative text-white bg-ink-night">
        <PhotoSlot label="Bread of Life volunteers serving families" dark className="h-[85vh] min-h-[560px] max-h-[920px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10" />
        <Container className="absolute inset-x-0 bottom-0 pb-14 md:pb-20">
          <div className="grid lg:grid-cols-12 gap-8 items-end">
            <motion.h2 {...rise()} className="lg:col-span-8 headline text-[52px] sm:text-[84px] lg:text-[108px]">
              10 million pounds of food for our <span className="accent">neighbors.</span>
            </motion.h2>
            <motion.div {...rise(0.1)} className="lg:col-span-4">
              <p className="text-[17px] leading-[1.6] text-white/85">
                That's how much our compassion ministry has given out in Waterbury, much of it through the Bread of Life food pantry.
              </p>
              <Link to="/give" className="link-cta-light mt-6">See where gifts go</Link>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ── Core values ── */}
      <section className="bg-paper-deep py-24 md:py-36">
        <Container>
          <div className="grid lg:grid-cols-12 gap-8 items-end mb-16 md:mb-20">
            <motion.h2 {...rise()} className="lg:col-span-7 headline text-[56px] sm:text-[84px] lg:text-[104px]">
              What we <span className="accent text-oxblood">stand</span> for.
            </motion.h2>
            <motion.p {...rise(0.1)} className="lg:col-span-4 lg:col-start-9 text-[17px] leading-[1.6] text-stone-600">
              Seven core values shape how we worship, serve and live as one church family. Prayer comes first.
            </motion.p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 border-t-2 border-ink">
            {coreValues.map((v, i) => (
              <motion.div key={v.title} {...rise((i % 4) * 0.08)} className="pt-8 pb-10 sm:pr-8 border-b border-ink/15">
                <span className="headline text-[48px] text-oxblood">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="headline text-[30px] mt-5">{v.title}</h3>
                <p className="mt-3 text-[15px] leading-[1.6] text-stone-600">{v.text}</p>
              </motion.div>
            ))}
            <motion.div {...rise(0.24)} className="pt-8 pb-10 border-b border-ink/15 flex items-end">
              <Link to="/about" className="link-cta">Read our story <ArrowRight className="w-4 h-4" /></Link>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ── Ministries ── */}
      <section className="py-24 md:py-36">
        <Container>
          <div className="grid lg:grid-cols-12 gap-8 items-end mb-14">
            <motion.h2 {...rise()} className="lg:col-span-8 headline text-[56px] sm:text-[84px] lg:text-[104px]">
              Find your <span className="accent text-oxblood">place.</span>
            </motion.h2>
            <motion.div {...rise(0.1)} className="lg:col-span-4 lg:justify-self-end">
              <Link to="/ministries" className="link-cta">All ten ministries <ArrowRight className="w-4 h-4" /></Link>
            </motion.div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
            {highlights.map((m, i) => (
              <motion.div key={m.name} {...rise(i * 0.08)}>
                <Link to="/ministries" className="group block">
                  <div className="overflow-hidden">
                    <PhotoSlot label={m.name} className="aspect-[4/5] transition-transform duration-700 ease-out group-hover:scale-[1.03]" />
                  </div>
                  <h3 className="headline text-[32px] mt-5 transition-colors group-hover:text-oxblood">{m.name}</h3>
                  <p className="mt-2 text-[15px] leading-[1.6] text-stone-600">{m.text}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Watch + events ── */}
      <section className="bg-paper-deep py-24 md:py-36">
        <Container>
          <div className="grid lg:grid-cols-12 gap-y-14 lg:gap-x-14">
            <motion.div {...rise()} className="lg:col-span-7">
              <a href={church.social.youtube} target="_blank" rel="noopener noreferrer" className="group block relative overflow-hidden text-white">
                <PhotoSlot label="Pastor preaching (sermon thumbnail)" dark className="aspect-video transition-transform duration-700 group-hover:scale-[1.02]" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="w-20 h-20 bg-oxblood flex items-center justify-center transition-transform group-hover:scale-105"><Play className="w-8 h-8 text-white fill-white ml-1" /></span>
                </div>
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-white/70 mb-2">Live Sundays at 9:00 AM</p>
                  <p className="headline text-[36px] md:text-[48px]">Watch the latest sermon</p>
                </div>
              </a>
            </motion.div>
            <motion.div {...rise(0.1)} className="lg:col-span-5">
              <p className="eyebrow mb-6">Coming up</p>
              <h2 className="headline text-[56px] sm:text-[72px]">Upcoming <span className="accent text-oxblood">events.</span></h2>
              <div className="mt-10 border-t-2 border-ink">
                {upcoming.length ? upcoming.map((e) => {
                  const d = formatDate(e.date);
                  return (
                    <div key={e.title} className="py-5 border-b border-ink/15 grid grid-cols-[5rem_1fr] gap-4 items-center">
                      <div>
                        <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-oxblood">{d.month}</p>
                        <p className="headline text-[48px]">{d.day}</p>
                      </div>
                      <div>
                        <p className="headline text-[28px]">{e.title}</p>
                        <p className="text-stone-600 text-[15px] mt-1">{e.time}</p>
                      </div>
                    </div>
                  );
                }) : <p className="py-5 text-stone-600">New events will be posted here.</p>}
              </div>
              <Link to="/events" className="link-cta mt-8">See all events <ArrowRight className="w-4 h-4" /></Link>
            </motion.div>
          </div>
        </Container>
      </section>
    </div>
  );
}
