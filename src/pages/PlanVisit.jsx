import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Car, DoorOpen, Baby, Clock, MapPin, ChevronDown } from "lucide-react";
import { church } from "../data/church";
import { Button, Eyebrow, PageHero, PhotoSlot, SectionHeading, fadeUp } from "../components/ui";
import { sendForm } from "../lib/forms";

const faqs = [
  { q: "What should I wear?", a: "Whatever you're comfortable in. You'll see everything from suits to jeans on a Sunday morning." },
  { q: "How long is the service?", a: "Plan for about [90 minutes] of worship, a message from the Bible, and prayer." },
  { q: "Is there something for my kids?", a: "Yes. [Describe children's ministry: ages, where to check in, and what kids do during the service.]" },
  { q: "Can I watch online first?", a: "Absolutely. Our 9:00 AM service streams live every Sunday on YouTube and Facebook." },
  { q: "Do I have to give or sign anything?", a: "No. As our guest, you're simply welcome to worship with us. There's nothing you need to do or bring." },
  { q: "What if I need prayer?", a: "Our prayer team is available after every service, and you can send a prayer request any time." },
];

function nextSundays(n = 6) {
  const out = [];
  const d = new Date();
  d.setDate(d.getDate() + ((7 - d.getDay()) % 7 || 7));
  for (let i = 0; i < n; i++) {
    out.push(d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" }));
    d.setDate(d.getDate() + 7);
  }
  return out;
}

function VisitForm() {
  const navigate = useNavigate();
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const sundays = nextSundays();

  async function onSubmit(e) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setStatus("sending");
    setError("");
    try {
      const result = await sendForm("Plan a visit", {
        Name: f.get("name"),
        Email: f.get("email"),
        Phone: f.get("phone"),
        Sunday: f.get("sunday"),
        Service: f.get("service"),
        "Adults": f.get("adults"),
        "Kids": f.get("kids"),
        Questions: f.get("questions"),
      });
      if (result === "sent") navigate("/thank-you");
      else setStatus("email");
    } catch (err) {
      setError(err.message);
      setStatus("idle");
    }
  }

  const field = "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition";
  const label = "block text-xs font-semibold tracking-wide text-slate-600 mb-2";

  if (status === "email") {
    return (
      <div className="text-center py-10">
        <p className="text-2xl font-bold tracking-tight mb-3">Almost done</p>
        <p className="text-slate-500 max-w-sm mx-auto">Your email app opened with your details filled in. Just press send, and we'll be ready to welcome you.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid sm:grid-cols-2 gap-5">
      <div className="sm:col-span-2"><label htmlFor="name" className={label}>Your name</label><input id="name" name="name" required autoComplete="name" className={field} /></div>
      <div><label htmlFor="email" className={label}>Email</label><input id="email" name="email" type="email" required autoComplete="email" className={field} /></div>
      <div><label htmlFor="phone" className={label}>Phone (optional)</label><input id="phone" name="phone" type="tel" autoComplete="tel" className={field} /></div>
      <div>
        <label htmlFor="sunday" className={label}>Which Sunday?</label>
        <select id="sunday" name="sunday" className={field}>{sundays.map((s) => <option key={s}>{s}</option>)}<option>Not sure yet</option></select>
      </div>
      <div>
        <label htmlFor="service" className={label}>Which service?</label>
        <select id="service" name="service" className={field}>{church.services.map((s) => <option key={s.time}>{s.time}</option>)}</select>
      </div>
      <div><label htmlFor="adults" className={label}>Adults</label><input id="adults" name="adults" type="number" min="1" defaultValue="1" className={field} /></div>
      <div><label htmlFor="kids" className={label}>Kids</label><input id="kids" name="kids" type="number" min="0" defaultValue="0" className={field} /></div>
      <div className="sm:col-span-2"><label htmlFor="questions" className={label}>Anything we should know? (optional)</label><textarea id="questions" name="questions" rows="3" className={field} /></div>
      {error && <p className="sm:col-span-2 text-sm text-brand" role="alert">{error}</p>}
      <div className="sm:col-span-2">
        <Button type="submit" arrow disabled={status === "sending"} className="w-full sm:w-auto disabled:opacity-60">
          {status === "sending" ? "Sending…" : "Let us know you're coming"}
        </Button>
      </div>
    </form>
  );
}

export default function PlanVisit() {
  const [openFaq, setOpenFaq] = useState(0);
  return (
    <>
      <PageHero
        eyebrow="Plan your visit"
        title="We saved you a seat."
        text="Everything you need to know before your first Sunday at House of Prayer, from where to park to what your kids will do."
        photo="Smiling greeter at the front entrance"
      />

      {/* Service times + location */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-start">
          <motion.div {...fadeUp()}>
            <Eyebrow>When and where</Eyebrow>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter leading-tight mb-10">Join us any Sunday.</h2>
            <div className="divide-y divide-slate-100 border-y border-slate-100">
              {church.services.map((s) => (
                <div key={s.time} className="py-6 flex items-center justify-between gap-6">
                  <div>
                    <p className="font-bold text-lg tracking-tight">{s.name}</p>
                    {s.note && <p className="text-sm text-slate-500">{s.note}</p>}
                  </div>
                  <p className="text-2xl font-bold tracking-tight text-brand flex items-center gap-2"><Clock className="w-5 h-5" />{s.time}</p>
                </div>
              ))}
              <div className="py-6 flex items-start gap-4">
                <MapPin className="w-5 h-5 text-brand mt-1 shrink-0" />
                <div>
                  <p className="font-bold text-lg tracking-tight">{church.mainAddress.line1}</p>
                  <p className="text-slate-500">{church.mainAddress.line2}</p>
                  <a href={church.mapsUrl} target="_blank" rel="noopener noreferrer" className="inline-block mt-3 text-sm font-semibold hover:text-brand">Get directions →</a>
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div {...fadeUp(0.1)} className="rounded-2xl overflow-hidden border border-slate-100 shadow-lg aspect-[4/3]">
            <iframe title="Map to House of Prayer Church" src={church.mapEmbed} className="w-full h-full" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          </motion.div>
        </div>
      </section>

      {/* What to expect */}
      <section className="py-24 md:py-32 bg-slate-50/70 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeading eyebrow="What to expect" title="Your first Sunday, step by step" />
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Car, title: "Parking", text: "Free parking is available on site. [Confirm where guests should park and whether there are reserved guest spots.]" },
              { icon: DoorOpen, title: "Which door", text: "Sunday services are in the main church at 1245 Thomaston Avenue. Greeters at the front entrance will help you find a seat." },
              { icon: Baby, title: "Kids and youth", text: "[Describe children's check-in, age groups and youth activities during the service.]" },
            ].map(({ icon: Icon, title, text }, i) => (
              <motion.div key={title} {...fadeUp(i * 0.08)} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <PhotoSlot label={title} className="aspect-[16/10]" />
                <div className="p-7">
                  <div className="w-10 h-10 rounded-full bg-brand/[0.08] text-brand flex items-center justify-center mb-4"><Icon className="w-5 h-5" /></div>
                  <h3 className="font-bold text-lg tracking-tight mb-2">{title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 md:py-32">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <SectionHeading eyebrow="Questions" title="Common questions" />
          <div className="divide-y divide-slate-200 border-y border-slate-200">
            {faqs.map((f, i) => {
              const open = openFaq === i;
              return (
                <div key={f.q}>
                  <button
                    onClick={() => setOpenFaq(open ? -1 : i)}
                    aria-expanded={open}
                    className="w-full flex items-center justify-between gap-6 py-6 text-left font-semibold tracking-tight hover:text-brand transition-colors"
                  >
                    {f.q}
                    <ChevronDown className={`w-5 h-5 shrink-0 transition-transform ${open ? "rotate-180 text-brand" : "text-slate-400"}`} />
                  </button>
                  {open && <p className="pb-6 -mt-2 text-slate-500 leading-relaxed">{f.a}</p>}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Form */}
      <section id="visit-form" className="py-24 md:py-32 bg-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(172,12,47,0.18)_0%,transparent_60%)]" />
        <div className="relative max-w-3xl mx-auto px-6 lg:px-8">
          <SectionHeading dark eyebrow="Let us know" title="Tell us you're coming" text="We'll have someone ready to welcome you, save you a seat and answer any questions." />
          <motion.div {...fadeUp()} className="bg-white rounded-2xl p-8 md:p-10 shadow-2xl">
            <VisitForm />
          </motion.div>
        </div>
      </section>
    </>
  );
}
