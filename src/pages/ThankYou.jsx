import { CheckCircle2 } from "lucide-react";
import { church } from "../data/church";
import { Button } from "../components/ui";

// Shown after the Plan Your Visit form is sent. Its own URL (/thank-you) lets Google Ads count sign-ups.
export default function ThankYou() {
  return (
    <section className="min-h-[70vh] flex items-center justify-center px-6 py-24 text-center">
      <div className="max-w-xl">
        <CheckCircle2 className="w-14 h-14 text-brand mx-auto mb-8" />
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">We can't wait to meet you.</h1>
        <p className="text-lg text-slate-500 font-light leading-relaxed mb-10">
          Thanks for letting us know you're coming. Someone from our team will reach out before Sunday.
          Services are at {church.services.map((s) => s.time).join(" and ")} at {church.mainAddress.line1}.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button href={church.mapsUrl} arrow>Get directions</Button>
          <Button to="/watch" variant="outline">Watch a service first</Button>
        </div>
      </div>
    </section>
  );
}
