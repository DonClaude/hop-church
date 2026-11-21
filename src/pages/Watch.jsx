import { motion } from "framer-motion";
import { Youtube, Facebook, Play, Clock } from "lucide-react";
import { church } from "../data/church";
import { Button, Eyebrow, PageHero, PhotoSlot, SectionHeading, fadeUp } from "../components/ui";

export default function Watch() {
  return (
    <>
      <PageHero
        eyebrow="Watch online"
        title="Worship with us from anywhere."
        text="Our 9:00 AM service streams live every Sunday. Watch, pray along and get to know us before you visit."
        photo="Livestream camera view of the stage"
      />

      <section className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <motion.div {...fadeUp()} className="relative rounded-2xl overflow-hidden shadow-2xl bg-slate-950">
            {/* Swap this placeholder for a YouTube live embed: https://www.youtube.com/embed/live_stream?channel=YOUR_CHANNEL_ID */}
            <PhotoSlot label="Livestream player" dark className="aspect-video" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
              <span className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center shadow-lg mb-6"><Play className="w-8 h-8 text-brand fill-brand ml-1" /></span>
              <p className="text-white text-2xl font-bold tracking-tight">Live Sundays at 9:00 AM</p>
              <p className="text-white/60 mt-2 flex items-center gap-2 justify-center"><Clock className="w-4 h-4" /> Eastern Time</p>
            </div>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-6 mt-10">
            <a href={church.social.youtube} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-5 rounded-2xl border border-slate-100 p-7 shadow-sm hover:shadow-md transition-all">
              <span className="w-12 h-12 rounded-full bg-brand/[0.08] text-brand flex items-center justify-center"><Youtube className="w-6 h-6" /></span>
              <span><span className="block font-bold tracking-tight group-hover:text-brand">Watch on YouTube</span><span className="text-sm text-slate-500">Live services and past messages</span></span>
            </a>
            <a href={church.social.facebook} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-5 rounded-2xl border border-slate-100 p-7 shadow-sm hover:shadow-md transition-all">
              <span className="w-12 h-12 rounded-full bg-brand/[0.08] text-brand flex items-center justify-center"><Facebook className="w-6 h-6" /></span>
              <span><span className="block font-bold tracking-tight group-hover:text-brand">Watch on Facebook</span><span className="text-sm text-slate-500">Join the conversation live</span></span>
            </a>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-slate-50/70 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeading eyebrow="Recent messages" title="Catch up on past Sundays" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((n, i) => (
              <motion.a key={n} {...fadeUp(i * 0.08)} href={church.social.youtube} target="_blank" rel="noopener noreferrer" className="group block">
                <div className="relative rounded-2xl overflow-hidden shadow-sm group-hover:shadow-md transition-shadow">
                  <PhotoSlot label={`Sermon thumbnail ${n}`} dark className="aspect-video" />
                </div>
                <p className="mt-4 font-bold tracking-tight group-hover:text-brand">[Sermon title]</p>
                <p className="text-sm text-slate-500">[Speaker · Date]</p>
              </motion.a>
            ))}
          </div>
          <div className="text-center mt-12"><Button href={church.social.youtube} variant="outline" arrow>All messages on YouTube</Button></div>
        </div>
      </section>

      <section className="py-24 md:py-28">
        <motion.div {...fadeUp()} className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <Eyebrow>Ready to come in person?</Eyebrow>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-8">There's nothing like being in the room.</h2>
          <Button to="/plan-your-visit" arrow>Plan Your Visit</Button>
        </motion.div>
      </section>
    </>
  );
}
