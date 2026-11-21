import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, Clock, MapPin } from "lucide-react";
import { church, buildings } from "../data/church";
import { Button, Eyebrow, PageHero, SectionHeading, fadeUp } from "../components/ui";
import { sendForm } from "../lib/forms";

function ContactForm() {
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const field = "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition";
  const label = "block text-xs font-semibold tracking-wide text-slate-600 mb-2";

  async function onSubmit(e) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setStatus("sending");
    setError("");
    try {
      const r = await sendForm(f.get("topic") === "Prayer request" ? "Prayer request" : "Website message", {
        Name: f.get("name"), Email: f.get("email"), Phone: f.get("phone"), Topic: f.get("topic"), Message: f.get("message"),
      });
      setStatus(r === "sent" ? "sent" : "email");
    } catch (err) {
      setError(err.message);
      setStatus("idle");
    }
  }

  if (status === "sent" || status === "email") {
    return (
      <div className="text-center py-12">
        <p className="text-2xl font-bold tracking-tight mb-3">{status === "sent" ? "Thank you" : "Almost done"}</p>
        <p className="text-slate-500 max-w-sm mx-auto">
          {status === "sent" ? "Your message is on its way. We'll get back to you soon." : "Your email app opened with your message filled in. Just press send."}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid sm:grid-cols-2 gap-5">
      <div><label htmlFor="c-name" className={label}>Name</label><input id="c-name" name="name" required autoComplete="name" className={field} /></div>
      <div><label htmlFor="c-email" className={label}>Email</label><input id="c-email" name="email" type="email" required autoComplete="email" className={field} /></div>
      <div><label htmlFor="c-phone" className={label}>Phone (optional)</label><input id="c-phone" name="phone" type="tel" autoComplete="tel" className={field} /></div>
      <div>
        <label htmlFor="c-topic" className={label}>Topic</label>
        <select id="c-topic" name="topic" className={field}>
          <option>General question</option><option>Prayer request</option><option>Ministries</option><option>Giving</option>
        </select>
      </div>
      <div className="sm:col-span-2"><label htmlFor="c-message" className={label}>Message</label><textarea id="c-message" name="message" rows="5" required className={field} /></div>
      {error && <p className="sm:col-span-2 text-sm text-brand" role="alert">{error}</p>}
      <div className="sm:col-span-2"><Button type="submit" arrow disabled={status === "sending"} className="disabled:opacity-60">{status === "sending" ? "Sending…" : "Send message"}</Button></div>
    </form>
  );
}

export default function Contact() {
  return (
    <>
      <PageHero eyebrow="Contact us" title="We'd love to hear from you." text="Questions, prayer requests or just saying hello, reach out any time." photo="Church office front desk" />

      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-5 gap-16">
          <motion.div {...fadeUp()} className="lg:col-span-2 space-y-8">
            <div>
              <Eyebrow>Church office</Eyebrow>
              <h2 className="text-3xl font-bold tracking-tighter mb-8">Get in touch</h2>
            </div>
            {[
              { icon: Phone, label: "Phone", value: church.phone, href: church.phoneHref },
              { icon: Mail, label: "Email", value: church.email, href: `mailto:${church.email}` },
              { icon: Clock, label: "Office hours", value: church.officeHours },
              { icon: MapPin, label: "Sunday services", value: `${church.mainAddress.line1}, ${church.mainAddress.line2}`, href: church.mapsUrl },
            ].map(({ icon: Icon, label, value, href }) => (
              <div key={label} className="flex gap-5">
                <span className="w-11 h-11 shrink-0 rounded-full bg-brand/[0.08] text-brand flex items-center justify-center"><Icon className="w-5 h-5" /></span>
                <div className="min-w-0">
                  <p className="text-[11px] font-bold tracking-[0.2em] text-slate-400 uppercase mb-1">{label}</p>
                  {href
                    ? <a href={href} {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="font-semibold hover:text-brand break-words">{value}</a>
                    : <p className="font-semibold">{value}</p>}
                </div>
              </div>
            ))}
          </motion.div>
          <motion.div {...fadeUp(0.1)} className="lg:col-span-3 rounded-2xl border border-slate-100 shadow-lg p-8 md:p-10">
            <h2 className="text-2xl font-bold tracking-tight mb-6">Send us a message</h2>
            <ContactForm />
          </motion.div>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-slate-50/70 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeading eyebrow="Our campus" title="Which building is which" text="Our ministries meet in a few buildings along Thomaston Avenue." />
          <div className="grid lg:grid-cols-2 gap-10">
            <div className="divide-y divide-slate-200 border-y border-slate-200 bg-white rounded-2xl px-7">
              {buildings.map((b) => (
                <div key={b.name} className="py-5">
                  <p className="font-bold tracking-tight">{b.name}</p>
                  <p className="text-sm text-slate-700">{b.address}</p>
                  <p className="text-sm text-slate-500">{b.use}</p>
                </div>
              ))}
            </div>
            <div className="rounded-2xl overflow-hidden border border-slate-100 shadow-lg min-h-[360px]">
              <iframe title="Map to House of Prayer Church" src={church.mapEmbed} className="w-full h-full min-h-[360px]" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
