import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { church } from "../data/church";
import { Container, PageHero, PhotoSlot, rise } from "../components/ui";

export default function Give() {
  const ways = [
    ...(church.givingUrl ? [{ title: "Online", text: "Give once or set up a recurring gift.", action: <a href={church.givingUrl} target="_blank" rel="noopener noreferrer" className="btn-red">Give online <ArrowUpRight className="w-4 h-4" /></a> }] : []),
    { title: "On Sunday", text: `Give during the 9:00 or 11:15 AM service at ${church.mainAddress.line1}.` },
    { title: "By mail", text: "Send a check to House of Prayer Church, 1263 Thomaston Avenue, Waterbury, CT 06704." },
  ];

  return (
    <>
      <PageHero
        eyebrow="Give"
        lines={["Generosity", <span key="a">that <span className="accent text-oxblood">feeds.</span></span>]}
        intro="Gifts pay for Sunday ministry, the Bread of Life food pantry, Alpha Ministries and missions around the world."
      />

      <section className="py-24 md:py-36">
        <Container>
          <div className="grid lg:grid-cols-12 gap-y-12 lg:gap-x-14">
            <div className="lg:col-span-5">
              <motion.h2 {...rise()} className="headline text-[56px] sm:text-[80px] lg:text-[96px]">Ways to <span className="accent text-oxblood">give.</span></motion.h2>
              <motion.p {...rise(0.05)} className="mt-8 text-[17px] leading-[1.6] text-stone-600">
                Questions about giving? Call <a href={church.phoneHref} className="font-semibold text-ink border-b-2 border-ink">{church.phone}</a>.
              </motion.p>
            </div>
            <motion.div {...rise(0.1)} className="lg:col-span-7 border-t-2 border-ink">
              {ways.map((w) => (
                <div key={w.title} className="py-7 border-b border-ink/15 grid sm:grid-cols-[12rem_1fr] gap-x-6 gap-y-2">
                  <h3 className="headline text-[34px] md:text-[40px]">{w.title}</h3>
                  <div className="sm:pt-2">
                    <p className="text-[17px] leading-[1.6] text-stone-600">{w.text}</p>
                    {w.action && <div className="mt-5">{w.action}</div>}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </Container>
      </section>

      <section className="relative text-white bg-ink-night">
        <PhotoSlot label="Volunteers packing groceries" dark className="h-[80vh] min-h-[540px] max-h-[880px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10" />
        <Container className="absolute inset-x-0 bottom-0 pb-14 md:pb-20">
          <div className="grid lg:grid-cols-12 gap-8 items-end">
            <motion.h2 {...rise()} className="lg:col-span-8 headline text-[52px] sm:text-[84px] lg:text-[108px]">
              10 million pounds of food, and <span className="accent">counting.</span>
            </motion.h2>
            <motion.p {...rise(0.1)} className="lg:col-span-4 text-[17px] leading-[1.6] text-white/85">
              Our compassion ministry has given that much food to Waterbury families. Gifts also keep Alpha Ministries open for men and women in recovery.
            </motion.p>
          </div>
        </Container>
      </section>

      <section className="py-24 md:py-36">
        <Container>
          <motion.blockquote {...rise()} className="max-w-4xl pl-6 md:pl-10 border-l-[3px] border-oxblood">
            <p className="serif italic text-[28px] md:text-[44px] leading-[1.25] text-ink-soft">
              “Every man according as he purposeth in his heart, so let him give; not grudgingly, or of necessity: for God loveth a cheerful giver.”
            </p>
            <footer className="mt-6 text-[12px] font-bold uppercase tracking-[0.2em] text-stone-500">2 Corinthians 9:7</footer>
          </motion.blockquote>
        </Container>
      </section>
    </>
  );
}
