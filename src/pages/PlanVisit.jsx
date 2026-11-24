import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { church } from "../data/church";
import { Button, PageHero, PhotoSlot } from "../components/ui";
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
        <p className="text-2xl font-bold tracking-tight mb-3">One more step</p>
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
          {status === "sending" ? "Sending…" : "Send my visit plan"}
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
        title="Plan your first visit"
        text="Sundays at 9:00 and 11:00 AM in the main church at 1245 Thomaston Avenue, Waterbury."
        photo="Smiling greeter at the front entrance"
      />

      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter leading-tight mb-10">Service times and parking</h2>
            <dl className="divide-y divide-slate-200 border-y border-slate-200">
              {church.services.map((s) => (
                <div key={s.time} className="py-5 flex items-baseline justify-between gap-6">
                  <dt className="text-slate-600">{s.name}{s.note ? ` (${s.note.toLowerCase()})` : ""}</dt>
                  <dd className="text-2xl font-bold tracking-tight">{s.time}</dd>
                </div>
              ))}
              <div className="py-5 flex items-baseline justify-between gap-6">
                <dt className="text-slate-600">Address</dt>
                <dd className="text-right font-semibold">{church.mainAddress.line1}<span className="block text-sm font-normal text-slate-500">{church.mainAddress.line2}</span></dd>
              </div>
            </dl>
            <p className="mt-8 text-slate-600 leading-relaxed max-w-lg">
              Park in the church lot and come in through the main entrance, where greeters will help you find a seat.
            </p>
            <div className="mt-10"><Button href={church.mapsUrl} variant="outline">Get directions</Button></div>
          </div>
          <div className="rounded-2xl overflow-hidden border border-slate-200 aspect-[4/3]">
            <iframe title="Map to House of Prayer Church" src={church.mapEmbed} className="w-full h-full" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-4">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter leading-tight">Questions guests ask</h2>
            <PhotoSlot label="Families arriving for the service" className="hidden lg:block mt-10 rounded-2xl aspect-[4/5]" />
          </div>
          <div className="lg:col-span-8 divide-y divide-slate-200 border-y border-slate-200">
            {faqs.map((f, i) => {
              const open = openFaq === i;
              return (
                <div key={f.q}>
                  <button
                    onClick={() => setOpenFaq(open ? -1 : i)}
                    aria-expanded={open}
                    className="w-full min-h-[56px] flex items-center justify-between gap-6 py-5 text-left text-lg font-semibold tracking-tight hover:text-brand transition-colors"
                  >
                    {f.q}
                    <ChevronDown className={`w-5 h-5 shrink-0 transition-transform ${open ? "rotate-180 text-brand" : "text-slate-400"}`} />
                  </button>
                  {open && <p className="pb-6 -mt-1 text-slate-600 leading-relaxed max-w-2xl">{f.a}</p>}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="visit-form" className="py-24 md:py-32 bg-slate-950">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tighter leading-tight mb-6">Tell us which Sunday you're coming</h2>
            <p className="text-white/70 leading-relaxed">A greeter will look out for you at the door and save you a seat.</p>
          </div>
          <div className="lg:col-span-8 bg-white rounded-2xl p-8 md:p-10">
            <VisitForm />
          </div>
        </div>
      </section>
    </>
  );
}
