import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { church } from "../data/church";
import { Container, MaskLine } from "../components/ui";

// Shown after the Plan Your Visit form is sent. Its own URL (/thank-you) lets Google Ads count sign-ups.
export default function ThankYou() {
  return (
    <section className="min-h-[80svh] flex items-end">
      <Container className="w-full pt-[160px] pb-20">
        <p className="text-[12px] font-bold uppercase tracking-[0.22em] mb-6 text-oxblood">You're all set</p>
        <h1 className="headline text-[64px] sm:text-[100px] lg:text-[132px]">
          <MaskLine delay={0.1}>We can't wait</MaskLine>
          <MaskLine delay={0.2}>to <span className="accent text-oxblood">meet you.</span></MaskLine>
        </h1>
        <p className="mt-8 text-[18px] leading-[1.6] text-stone-600 max-w-xl">
          Thanks for letting us know you're coming. Services are at {church.services.map((s) => s.time).join(" and ")} at {church.mainAddress.line1}.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <a href={church.mapsUrl} target="_blank" rel="noopener noreferrer" className="btn-red">Get directions <ArrowUpRight className="w-4 h-4" /></a>
          <Link to="/watch" className="btn-ghost">Watch a service first <ArrowRight className="w-4 h-4" /></Link>
        </div>
      </Container>
    </section>
  );
}
