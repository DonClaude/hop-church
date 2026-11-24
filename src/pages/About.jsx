import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { church, coreValues, beliefs, leaders, history } from "../data/church";
import { Container, PageHero, PhotoSlot, rise } from "../components/ui";

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        lines={["A church of", <span key="a">all <span className="accent text-oxblood">nations.</span></span>]}
        intro="An Assemblies of God church on Thomaston Avenue in Waterbury, founded in 1979 and led by Rev. James and Verna Lilley."
      />

      <section className="py-24 md:py-36">
        <Container>
          <div className="grid lg:grid-cols-12 gap-y-12 lg:gap-x-14 items-center">
            <motion.div {...rise()} className="lg:col-span-6"><PhotoSlot label="Congregation in worship" className="aspect-[4/5]" /></motion.div>
            <div className="lg:col-span-6">
              <motion.h2 {...rise()} className="headline text-[56px] sm:text-[80px] lg:text-[96px]">Who we <span className="accent text-oxblood">are.</span></motion.h2>
              <motion.p {...rise(0.05)} className="mt-8 text-[19px] md:text-[22px] leading-[1.55] max-w-[36rem]">
                Our name comes from Mark 11:17, and we take it to heart: people from many countries worship here together every Sunday.
              </motion.p>
              <motion.p {...rise(0.1)} className="mt-6 text-[17px] leading-[1.6] text-stone-600 max-w-[34rem]">
                During the week the church runs the Bread of Life food pantry, Lighthouse Childcare and Alpha Ministries, a home for men and women recovering from addiction.
              </motion.p>
              <motion.blockquote {...rise(0.15)} className="mt-12 pl-6 md:pl-8 border-l-[3px] border-oxblood">
                <p className="serif italic text-[24px] md:text-[30px] leading-[1.35] text-ink-soft max-w-[30ch]">“My house shall be called a house of prayer for all nations.”</p>
                <footer className="mt-5 text-[12px] font-bold uppercase tracking-[0.2em] text-stone-500">Mark 11:17</footer>
              </motion.blockquote>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-paper-deep py-24 md:py-36">
        <Container>
          <div className="grid lg:grid-cols-12 gap-8 items-end mb-16 md:mb-20">
            <motion.h2 {...rise()} className="lg:col-span-7 headline text-[56px] sm:text-[84px] lg:text-[104px]">What we <span className="accent text-oxblood">stand</span> for.</motion.h2>
            <motion.p {...rise(0.1)} className="lg:col-span-4 lg:col-start-9 text-[17px] leading-[1.6] text-stone-600">Seven core values guide how we worship, serve and live as one family.</motion.p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 border-t-2 border-ink">
            {coreValues.map((v, i) => (
              <motion.div key={v.title} {...rise((i % 4) * 0.08)} className="pt-8 pb-10 sm:pr-8 border-b border-ink/15">
                <span className="headline text-[48px] text-oxblood">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="headline text-[30px] mt-5">{v.title}</h3>
                <p className="mt-3 text-[15px] leading-[1.6] text-stone-600">{v.text}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-24 md:py-36">
        <Container>
          <div className="grid lg:grid-cols-12 gap-y-12 lg:gap-x-14">
            <div className="lg:col-span-5">
              <motion.h2 {...rise()} className="headline text-[56px] sm:text-[80px] lg:text-[96px]">What we <span className="accent text-oxblood">believe.</span></motion.h2>
              <motion.p {...rise(0.05)} className="mt-8 text-[17px] leading-[1.6] text-stone-600 max-w-[28rem]">
                As an {church.denomination} church, we hold to its 16 Fundamental Truths. These six are at the heart of them.
              </motion.p>
              <motion.a {...rise(0.1)} href="https://ag.org/Beliefs/Statement-of-Fundamental-Truths" target="_blank" rel="noopener noreferrer" className="link-cta mt-8">
                All 16 Fundamental Truths <ArrowUpRight className="w-4 h-4" />
              </motion.a>
            </div>
            <motion.div {...rise(0.1)} className="lg:col-span-7 border-t-2 border-ink">
              {beliefs.map((b) => (
                <div key={b.title} className="grid sm:grid-cols-[12rem_1fr] gap-x-6 gap-y-1 py-6 border-b border-ink/15">
                  <h3 className="headline text-[30px] md:text-[34px]">{b.title}</h3>
                  <p className="text-[16px] leading-[1.6] text-stone-600 sm:pt-1">{b.text}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </Container>
      </section>

      <section className="bg-ink-night text-white py-24 md:py-36">
        <Container>
          <div className="grid lg:grid-cols-12 gap-8 items-end mb-14">
            <motion.h2 {...rise()} className="lg:col-span-7 headline text-[56px] sm:text-[84px] lg:text-[104px]">Our <span className="accent text-oxblood">pastors.</span></motion.h2>
            <motion.p {...rise(0.1)} className="lg:col-span-4 lg:col-start-9 text-[17px] leading-[1.6] text-white/75">
              Rev. James and Verna Lilley came to Waterbury in 1998 and have led the church ever since.
            </motion.p>
          </div>
          <div className="grid sm:grid-cols-2 gap-6 max-w-4xl">
            {leaders.map((l, i) => (
              <motion.div key={l.name} {...rise(i * 0.08)}>
                <PhotoSlot label={l.name} dark className="aspect-[4/5]" />
                <p className="mt-5 text-[12px] font-bold uppercase tracking-[0.18em] text-oxblood">{l.role}</p>
                <h3 className="headline text-[40px] mt-1">{l.name}</h3>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-24 md:py-36">
        <Container>
          <div className="grid lg:grid-cols-12 gap-y-12 lg:gap-x-14">
            <div className="lg:col-span-5">
              <motion.h2 {...rise()} className="headline text-[56px] sm:text-[80px] lg:text-[96px]">Our <span className="accent text-oxblood">story.</span></motion.h2>
              <motion.div {...rise(0.1)} className="mt-10">
                <Link to="/plan-your-visit" className="btn-red">Plan your visit <ArrowRight className="w-4 h-4" /></Link>
              </motion.div>
            </div>
            <motion.ol {...rise(0.1)} className="lg:col-span-7 border-t-2 border-ink">
              {history.map((h) => (
                <li key={h.year} className="grid grid-cols-[6.5rem_1fr] md:grid-cols-[9rem_1fr] gap-6 py-6 border-b border-ink/15">
                  <span className="headline text-[44px] md:text-[56px] text-oxblood">{h.year}</span>
                  <span className="text-[17px] leading-[1.6] pt-1 md:pt-3">{h.text}</span>
                </li>
              ))}
            </motion.ol>
          </div>
        </Container>
      </section>
    </>
  );
}
