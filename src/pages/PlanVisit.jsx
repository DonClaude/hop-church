import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Plus, Minus } from "lucide-react";
import { church } from "../data/church";
import { Container, PageHero, PhotoSlot, rise } from "../components/ui";
import { sendForm } from "../lib/forms";

const faqs = [
  { q: "What should I wear?", a: "Whatever you're comfortable in. Some people wear suits and others wear jeans." },
  { q: "Can I watch online first?", a: "Yes. The 9:00 AM service streams live every Sunday on YouTube and Facebook." },
  { q: "Do I have to give or sign anything?", a: "No. Guests are welcome to worship with us without giving or filling anything in." },
  { q: "What if I need prayer?", a: "Members of the prayer team are available after every service, and you can send a prayer request from the contact page any time." },
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

// Square choice tiles (no pills), like the worship site's role tiles
function Choice({ name, options, value, onChange }) {
  return (
    <div className="grid grid-cols-2 gap-2" role="radiogroup">
      {options.map((o) => (
        <button
          type="button"
          key={o}
          role="radio"
          aria-checked={value === o}
          onClick={() => onChange(o)}
          className={`min-h-[52px] px-4 py-3 text-left text-[15px] font-semibold border-2 transition-colors ${value === o ? "bg-ink text-white border-ink" : "border-ink/15 hover:border-ink"}`}
        >
          {o}
        </button>
      ))}
    </div>
  );
}

function VisitForm() {
  const navigate = useNavigate();
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const [service, setService] = useState(church.services[0].time);
  const sundays = nextSundays();

  async function onSubmit(e) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setStatus("sending");
    setError("");
    try {
      const result = await sendForm("Plan a visit", {
        Name: f.get("name"), Email: f.get("email"), Phone: f.get("phone"),
        Sunday: f.get("sunday"), Service: service, Adults: f.get("adults"), Kids: f.get("kids"), Questions: f.get("questions"),
      });
      if (result === "sent") navigate("/thank-you");
      else setStatus("email");
    } catch (err) {
      setError(err.message);
      setStatus("idle");
    }
  }

  if (status === "email") {
    return (
      <div className="py-10">
        <p className="headline text-[48px]">One more <span className="accent text-oxblood">step.</span></p>
        <p className="mt-4 text-stone-600 max-w-sm">Your email app opened with your details filled in. Press send, and a greeter will look out for you on Sunday.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid sm:grid-cols-2 gap-x-8 gap-y-8">
      <div className="sm:col-span-2"><label htmlFor="name" className="field-label">Your name</label><input id="name" name="name" required autoComplete="name" className="field" /></div>
      <div><label htmlFor="email" className="field-label">Email</label><input id="email" name="email" type="email" required autoComplete="email" className="field" /></div>
      <div><label htmlFor="phone" className="field-label">Phone (optional)</label><input id="phone" name="phone" type="tel" autoComplete="tel" className="field" /></div>
      <div>
        <label htmlFor="sunday" className="field-label">Sunday</label>
        <select id="sunday" name="sunday" className="field">{sundays.map((s) => <option key={s}>{s}</option>)}<option>Not sure yet</option></select>
      </div>
      <div>
        <p className="field-label mb-3">Service</p>
        <Choice name="service" options={church.services.map((s) => s.time)} value={service} onChange={setService} />
      </div>
      <div><label htmlFor="adults" className="field-label">Adults</label><input id="adults" name="adults" type="number" min="1" defaultValue="1" className="field" /></div>
      <div><label htmlFor="kids" className="field-label">Kids</label><input id="kids" name="kids" type="number" min="0" defaultValue="0" className="field" /></div>
      <div className="sm:col-span-2"><label htmlFor="questions" className="field-label">Anything we should know? (optional)</label><textarea id="questions" name="questions" rows="3" className="field resize-none" /></div>
      {error && <p className="sm:col-span-2 text-oxblood" role="alert">{error}</p>}
      <div className="sm:col-span-2">
        <button type="submit" disabled={status === "sending"} className="btn-red w-full sm:w-auto disabled:opacity-60">
          {status === "sending" ? "Sending…" : <>Send my visit plan <ArrowRight className="w-4 h-4" /></>}
        </button>
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
        lines={["We saved you", <span key="a">a <span className="accent text-oxblood">seat.</span></span>]}
        intro="Sundays at 9:00 and 11:15 AM in the main church at 1245 Thomaston Avenue, Waterbury. Here's what to expect on your first visit."
      >
        <a href="#visit-form" className="btn-red">Tell us you're coming <ArrowRight className="w-4 h-4" /></a>
      </PageHero>

      <section className="py-24 md:py-36">
        <Container>
          <div className="grid lg:grid-cols-12 gap-y-12 lg:gap-x-14">
            <div className="lg:col-span-5">
              <motion.h2 {...rise()} className="headline text-[56px] sm:text-[80px] lg:text-[96px]">Getting <span className="accent text-oxblood">here.</span></motion.h2>
              <motion.p {...rise(0.05)} className="mt-8 text-[18px] leading-[1.6] text-stone-600 max-w-[30rem]">
                Park in the church lot and come in through the main entrance. Greeters will help you find a seat.
              </motion.p>
              <motion.div {...rise(0.1)} className="mt-10">
                <a href={church.mapsUrl} target="_blank" rel="noopener noreferrer" className="btn-ink">Get directions <ArrowUpRight className="w-4 h-4" /></a>
              </motion.div>
            </div>
            <motion.div {...rise(0.1)} className="lg:col-span-7 aspect-[4/3] border-2 border-ink">
              <iframe title="Map to House of Prayer Church" src={church.mapEmbed} className="w-full h-full" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            </motion.div>
          </div>
        </Container>
      </section>

      <section id="questions" className="bg-paper-deep py-24 md:py-36">
        <Container>
          <div className="grid lg:grid-cols-12 gap-y-12 lg:gap-x-14">
            <div className="lg:col-span-5">
              <motion.h2 {...rise()} className="headline text-[56px] sm:text-[80px] lg:text-[96px]">Common <span className="accent text-oxblood">questions.</span></motion.h2>
              <motion.div {...rise(0.1)} className="hidden lg:block mt-12"><PhotoSlot label="Families arriving for the service" className="aspect-[4/5]" /></motion.div>
            </div>
            <motion.div {...rise(0.1)} className="lg:col-span-7 border-t-2 border-ink">
              {faqs.map((f, i) => {
                const open = openFaq === i;
                return (
                  <div key={f.q} className="border-b border-ink/15">
                    <button onClick={() => setOpenFaq(open ? -1 : i)} aria-expanded={open} className="group w-full min-h-[64px] flex items-center justify-between gap-6 py-6 text-left">
                      <span className={`headline text-[28px] md:text-[34px] transition-colors ${open ? "text-oxblood" : "group-hover:text-oxblood"}`}>{f.q}</span>
                      {open ? <Minus className="w-6 h-6 shrink-0 text-oxblood" /> : <Plus className="w-6 h-6 shrink-0" />}
                    </button>
                    {open && <p className="pb-8 -mt-1 text-[17px] text-stone-600 leading-[1.6] max-w-2xl">{f.a}</p>}
                  </div>
                );
              })}
            </motion.div>
          </div>
        </Container>
      </section>

      <section id="visit-form" className="py-24 md:py-36">
        <Container>
          <div className="grid lg:grid-cols-12 gap-y-12 lg:gap-x-14">
            <div className="lg:col-span-5">
              <motion.p {...rise()} className="eyebrow !text-oxblood mb-6">Let us know</motion.p>
              <motion.h2 {...rise(0.05)} className="headline text-[56px] sm:text-[80px] lg:text-[96px]">Tell us you're <span className="accent text-oxblood">coming.</span></motion.h2>
              <motion.p {...rise(0.1)} className="mt-8 text-[18px] leading-[1.6] text-stone-600 max-w-[28rem]">A greeter will look out for you at the door and save you a seat.</motion.p>
            </div>
            <motion.div {...rise(0.1)} className="lg:col-span-7"><VisitForm /></motion.div>
          </div>
        </Container>
      </section>
    </>
  );
}
