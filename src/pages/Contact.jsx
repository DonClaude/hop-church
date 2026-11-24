import { useState } from "react";
import { church, buildings } from "../data/church";
import { Button, PageHero } from "../components/ui";
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
        <p className="text-2xl font-bold tracking-tight mb-3">{status === "sent" ? "Thank you" : "One more step"}</p>
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
      <PageHero
        title="Contact the church office"
        text={`Call ${church.phone} or email ${church.email}. The office is open ${church.officeHours.replace("Tuesday to Thursday", "Tuesday to Thursday,")}.`}
        photo="Church office front desk"
      />

      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-4">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter leading-tight mb-10">Office details</h2>
            <dl className="border-t border-slate-200">
              {[
                { label: "Phone", value: church.phone, href: church.phoneHref },
                { label: "Email", value: church.email, href: `mailto:${church.email}` },
                { label: "Office hours", value: church.officeHours },
                { label: "Mailing address", value: "1263 Thomaston Avenue, Waterbury, CT 06704" },
              ].map(({ label, value, href }) => (
                <div key={label} className="py-5 border-b border-slate-200">
                  <dt className="text-sm text-slate-500 mb-1">{label}</dt>
                  <dd>{href ? <a href={href} className="font-semibold break-words underline decoration-slate-300 underline-offset-4 hover:decoration-brand">{value}</a> : <span className="font-semibold">{value}</span>}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="lg:col-span-8 rounded-2xl border border-slate-200 p-8 md:p-10">
            <h3 className="text-2xl font-bold tracking-tight mb-6">Send a message or prayer request</h3>
            <ContactForm />
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter leading-tight mb-8">Buildings on Thomaston Avenue</h2>
            <div className="border-t border-slate-200">
              {buildings.map((b) => (
                <div key={b.name} className="py-5 border-b border-slate-200">
                  <p className="font-bold tracking-tight">{b.name}</p>
                  <p className="text-slate-600">{b.address}. {b.use}.</p>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-7 rounded-2xl overflow-hidden border border-slate-200 min-h-[420px]">
            <iframe title="Map to House of Prayer Church" src={church.mapEmbed} className="w-full h-full min-h-[420px]" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          </div>
        </div>
      </section>
    </>
  );
}
