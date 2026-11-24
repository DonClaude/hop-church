import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { events, weekly } from "../data/church";
import { Container, PageHero, rise } from "../components/ui";
import { formatDate } from "../lib/dates";

export default function Events() {
  const upcoming = events
    .filter((e) => new Date(e.date + "T23:59:59") >= new Date())
    .sort((a, b) => a.date.localeCompare(b.date));

  return (
    <>
      <PageHero
        eyebrow="Events"
        lines={["What's", <span key="a" className="accent text-oxblood">next.</span>]}
        intro="Sunday services, holiday services and church gatherings. Everyone is welcome at every event."
      />

      <section className="py-24 md:py-36">
        <Container>
          {upcoming.length === 0 && <p className="text-stone-600">New events will be posted here.</p>}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcoming.map((e, i) => {
              const d = formatDate(e.date);
              return (
                <motion.article key={e.title + e.date} {...rise(i * 0.08)} className="group border-2 border-ink p-8 transition-colors hover:bg-ink hover:text-white">
                  <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-oxblood">{d.weekday}</p>
                  <p className="headline text-[96px] leading-[0.85] mt-3">{d.day}</p>
                  <p className="headline text-[28px] text-stone-500 group-hover:text-white/60">{d.month}</p>
                  <h2 className="headline text-[40px] mt-8">{e.title}</h2>
                  <p className="mt-2 font-semibold">{e.time}</p>
                  <p className="mt-4 text-[16px] leading-[1.6] text-stone-600 group-hover:text-white/75">{e.text}</p>
                </motion.article>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="bg-paper-deep py-24 md:py-36">
        <Container>
          <div className="grid lg:grid-cols-12 gap-y-12 lg:gap-x-14">
            <div className="lg:col-span-5">
              <motion.h2 {...rise()} className="headline text-[56px] sm:text-[80px]">Every <span className="accent text-oxblood">week.</span></motion.h2>
              <motion.div {...rise(0.1)} className="mt-10">
                <Link to="/plan-your-visit" className="btn-red">Plan your visit <ArrowRight className="w-4 h-4" /></Link>
              </motion.div>
            </div>
            <motion.div {...rise(0.1)} className="lg:col-span-7">
              <table className="w-full text-left">
                <caption className="sr-only">Weekly services</caption>
                <tbody>
                  {weekly.map((row) => (
                    <tr key={row.day + row.time} className="border-t border-ink/15 first:border-t-2 first:border-ink last:border-b">
                      <th scope="row" className="py-5 pr-4 font-normal w-[26%]"><span className="headline text-[34px] md:text-[40px]">{row.day.slice(0, 3)}</span></th>
                      <td className="py-5 pr-4 text-[15px] font-semibold tabular-nums text-oxblood w-[26%] whitespace-nowrap">{row.time}</td>
                      <td className="py-5 text-[16px] md:text-[17px]">{row.title}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          </div>
        </Container>
      </section>
    </>
  );
}
