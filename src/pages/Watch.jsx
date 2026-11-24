import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Play } from "lucide-react";
import { church } from "../data/church";
import { Container, PageHero, PhotoSlot, rise } from "../components/ui";

export default function Watch() {
  return (
    <>
      <PageHero
        eyebrow="Watch online"
        lines={["Worship with us", <span key="a">from <span className="accent text-oxblood">anywhere.</span></span>]}
        intro="The 9:00 AM service streams live every Sunday on YouTube and Facebook. Past sermons stay on our YouTube channel."
      >
        <a href={church.social.youtube} target="_blank" rel="noopener noreferrer" className="btn-red">Watch on YouTube <ArrowUpRight className="w-4 h-4" /></a>
        <a href={church.social.facebook} target="_blank" rel="noopener noreferrer" className="btn-ghost">Watch on Facebook</a>
      </PageHero>

      <section className="py-24 md:py-36">
        <Container>
          {/* Swap this for a YouTube live embed: https://www.youtube.com/embed/live_stream?channel=YOUR_CHANNEL_ID */}
          <motion.a {...rise()} href={church.social.youtube} target="_blank" rel="noopener noreferrer" className="group block relative overflow-hidden bg-ink-night">
            <PhotoSlot label="Livestream player" dark className="aspect-video transition-transform duration-700 group-hover:scale-[1.02]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="w-24 h-24 bg-oxblood flex items-center justify-center transition-transform group-hover:scale-105"><Play className="w-10 h-10 text-white fill-white ml-1" /></span>
            </div>
            <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 text-white">
              <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-white/70 mb-2">Every Sunday · 9:00 AM Eastern</p>
              <p className="headline text-[40px] md:text-[64px]">Live on YouTube</p>
            </div>
          </motion.a>
        </Container>
      </section>

      <section className="bg-paper-deep py-24 md:py-32">
        <Container>
          <div className="grid lg:grid-cols-12 gap-8 items-end">
            <motion.h2 {...rise()} className="lg:col-span-8 headline text-[52px] sm:text-[80px] lg:text-[96px]">
              Come in <span className="accent text-oxblood">person.</span>
            </motion.h2>
            <motion.div {...rise(0.1)} className="lg:col-span-4">
              <p className="text-[17px] leading-[1.6] text-stone-600 mb-8">Services are at 9:00 and 11:15 AM at {church.mainAddress.line1}.</p>
              <Link to="/plan-your-visit" className="btn-red">Plan your visit <ArrowRight className="w-4 h-4" /></Link>
            </motion.div>
          </div>
        </Container>
      </section>
    </>
  );
}
