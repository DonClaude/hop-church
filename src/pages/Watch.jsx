import { Youtube, Facebook } from "lucide-react";
import { church } from "../data/church";
import { Button, PageHero, PhotoSlot } from "../components/ui";

export default function Watch() {
  return (
    <>
      <PageHero
        title="Watch the Sunday service online"
        text="The 9:00 AM service streams live every Sunday on YouTube and Facebook, and past sermons stay on our YouTube channel."
        photo="Livestream camera view of the stage"
      />

      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-12 gap-12 items-start">
          {/* Swap this for a YouTube live embed: https://www.youtube.com/embed/live_stream?channel=YOUR_CHANNEL_ID */}
          <a href={church.social.youtube} target="_blank" rel="noopener noreferrer" className="lg:col-span-8 group block rounded-2xl overflow-hidden">
            <PhotoSlot label="Livestream player" dark className="aspect-video transition-transform duration-500 group-hover:scale-[1.02]" />
          </a>
          <div className="lg:col-span-4">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter leading-tight mb-8">Where to watch</h2>
            <div className="space-y-4">
              <a href={church.social.youtube} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 min-h-[64px] rounded-2xl border border-slate-200 px-6 py-4 hover:-translate-y-0.5 hover:border-slate-400 transition-all">
                <Youtube className="w-6 h-6 text-[#FF0000]" aria-hidden="true" />
                <span className="font-semibold group-hover:text-brand">Watch on YouTube</span>
              </a>
              <a href={church.social.facebook} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 min-h-[64px] rounded-2xl border border-slate-200 px-6 py-4 hover:-translate-y-0.5 hover:border-slate-400 transition-all">
                <Facebook className="w-6 h-6 text-[#1877F2]" aria-hidden="true" />
                <span className="font-semibold group-hover:text-brand">Watch on Facebook</span>
              </a>
            </div>
            <p className="mt-8 text-slate-600 leading-relaxed">Live at 9:00 AM Eastern every Sunday.</p>
          </div>
        </div>
      </section>

      <section className="bg-slate-950">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24 grid lg:grid-cols-2 gap-10 items-start">
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tighter leading-tight">Worship with us in person</h2>
          <div>
            <p className="text-white/70 leading-relaxed mb-8 max-w-md">Services are at 9:00 and 11:00 AM at {church.mainAddress.line1}.</p>
            <Button to="/plan-your-visit" arrow>Plan Your Visit</Button>
          </div>
        </div>
      </section>
    </>
  );
}
