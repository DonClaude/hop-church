import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { church, buildings } from "../data/church";
import { Container, PageHero, rise } from "../components/ui";
import { sendForm } from "../lib/forms";

const topics = ["General question", "Prayer request", "Ministries", "Giving"];

function ContactForm() {
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const [topic, setTopic] = useState(topics[0]);

  async function onSubmit(e) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setStatus("sending");
    setError("");
    try {
      const r = await sendForm(topic === "Prayer request" ? "Prayer request" : "Website message", {
        Name: f.get("name"), Email: f.get("email"), Phone: f.get("phone"), Topic: topic, Message: f.get("message"),
      });
      setStatus(r === "sent" ? "sent" : "email");
    } catch (err) {
      setError(err.message);
      setStatus("idle");
    }
  }

  if (status !== "idle" && status !== "sending") {
    return (
      <div className="py-10">
        <p className="headline text-[48px]">{status === "sent" ? <>Thank <span className="accent text-oxblood">you.</span></> : <>One more <span className="accent text-oxblood">step.</span></>}</p>
        <p className="mt-4 text-stone-600 max-w-sm">{status === "sent" ? "Your message is on its way to the church office." : "Your email app opened with your message filled in. Press send."}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid sm:grid-cols-2 gap-x-8 gap-y-8">
      <div className="sm:col-span-2">
        <p className="field-label mb-3">What's it about?</p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2" role="radiogroup">
          {topics.map((t) => (
            <button type="button" key={t} role="radio" aria-checked={topic === t} onClick={() => setTopic(t)}
              className={`min-h-[52px] px-4 py-3 text-left text-[15px] font-semibold border-2 transition-colors ${topic === t ? "bg-ink text-white border-ink" : "border-ink/15 hover:border-ink"}`}>
              {t}
            </button>
          ))}
        </div>
      </div>
      <div><label htmlFor="c-name" className="field-label">Name</label><input id="c-name" name="name" required autoComplete="name" className="field" /></div>
      <div><label htmlFor="c-email" className="field-label">Email</label><input id="c-email" name="email" type="email" required autoComplete="email" className="field" /></div>
      <div className="sm:col-span-2"><label htmlFor="c-phone" className="field-label">Phone (optional)</label><input id="c-phone" name="phone" type="tel" autoComplete="tel" className="field" /></div>
      <div className="sm:col-span-2"><label htmlFor="c-message" className="field-label">Message</label><textarea id="c-message" name="message" rows="4" required className="field resize-none" /></div>
      {error && <p className="sm:col-span-2 text-oxblood" role="alert">{error}</p>}
      <div className="sm:col-span-2">
        <button type="submit" disabled={status === "sending"} className="btn-red disabled:opacity-60">
          {status === "sending" ? "Sending…" : <>Send message <ArrowRight className="w-4 h-4" /></>}
        </button>
      </div>
    </form>
  );
}

export default function Contact() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        lines={["Say", <span key="a" className="accent text-oxblood">hello.</span>]}
        intro={`Call ${church.phone} or email ${church.email}. The church office is open ${church.officeHours.replace("Tuesday to Thursday", "Tuesday to Thursday,")}.`}
      />

      <section className="py-24 md:py-36">
        <Container>
          <div className="grid lg:grid-cols-12 gap-y-14 lg:gap-x-14">
            <div className="lg:col-span-5">
              <motion.h2 {...rise()} className="headline text-[56px] sm:text-[80px] lg:text-[96px]">Church <span className="accent text-oxblood">office.</span></motion.h2>
              <motion.dl {...rise(0.1)} className="mt-10 border-t-2 border-ink">
                {[
                  { label: "Phone", value: church.phone, href: church.phoneHref },
                  { label: "Email", value: church.email, href: `mailto:${church.email}` },
                  { label: "Hours", value: church.officeHours },
                  { label: "Mail", value: "1263 Thomaston Avenue, Waterbury, CT 06704" },
                ].map(({ label, value, href }) => (
                  <div key={label} className="grid grid-cols-[5.5rem_1fr] gap-4 py-5 border-b border-ink/15">
                    <dt className="text-[12px] font-bold uppercase tracking-[0.16em] text-stone-500 pt-1">{label}</dt>
                    <dd className="text-[17px] font-semibold break-words">{href ? <a href={href} className="hover:text-oxblood">{value}</a> : value}</dd>
                  </div>
                ))}
              </motion.dl>
            </div>
            <motion.div {...rise(0.1)} className="lg:col-span-7">
              <h3 className="headline text-[36px] md:text-[44px] mb-8">Send a message or prayer request</h3>
              <ContactForm />
            </motion.div>
          </div>
        </Container>
      </section>

      <section className="bg-paper-deep py-24 md:py-36">
        <Container>
          <div className="grid lg:grid-cols-12 gap-y-12 lg:gap-x-14">
            <div className="lg:col-span-5">
              <motion.h2 {...rise()} className="headline text-[56px] sm:text-[80px] lg:text-[96px]">Our <span className="accent text-oxblood">campus.</span></motion.h2>
              <motion.div {...rise(0.1)} className="mt-10 border-t-2 border-ink">
                {buildings.map((b) => (
                  <div key={b.name} className="py-5 border-b border-ink/15">
                    <p className="headline text-[26px]">{b.name}</p>
                    <p className="text-[15px] text-stone-600 mt-1">{b.address} · {b.use}</p>
                  </div>
                ))}
              </motion.div>
            </div>
            <motion.div {...rise(0.1)} className="lg:col-span-7 border-2 border-ink min-h-[420px]">
              <iframe title="Map to House of Prayer Church" src={church.mapEmbed} className="w-full h-full min-h-[420px]" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            </motion.div>
          </div>
        </Container>
      </section>
    </>
  );
}
