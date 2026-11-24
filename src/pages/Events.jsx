import { events, weekly } from "../data/church";
import { Button, PageHero, PhotoSlot } from "../components/ui";
import { formatDate } from "../lib/dates";

export default function Events() {
  const upcoming = events
    .filter((e) => new Date(e.date + "T23:59:59") >= new Date())
    .sort((a, b) => a.date.localeCompare(b.date));

  return (
    <>
      <PageHero
        title="Events at House of Prayer"
        text="Sunday services, holiday services and church gatherings. Everyone is welcome at every event."
        photo="A church event in the Family Life Center"
      />

      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter leading-tight mb-6">Upcoming events</h2>
            <PhotoSlot label="Christmas service" className="hidden lg:block rounded-2xl aspect-[4/5]" />
          </div>
          <div className="lg:col-span-8 border-t border-slate-200">
            {upcoming.length === 0 && <p className="py-6 text-slate-600">New events will be posted here.</p>}
            {upcoming.map((e) => {
              const d = formatDate(e.date);
              return (
                <article key={e.title + e.date} className="py-8 border-b border-slate-200 grid grid-cols-[5.5rem_1fr] gap-6">
                  <div>
                    <p className="text-xs font-bold tracking-widest text-brand">{d.month}</p>
                    <p className="text-5xl font-bold tracking-tighter leading-none mt-1">{d.day}</p>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold tracking-tight">{e.title}</h3>
                    <p className="text-slate-500 mt-1">{d.weekday}, {e.time}</p>
                    <p className="text-slate-600 leading-relaxed mt-3">{e.text}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter leading-tight mb-8">Every week</h2>
            <Button to="/plan-your-visit" arrow>Plan Your Visit</Button>
          </div>
          <div className="lg:col-span-8 border-t border-slate-200">
            {weekly.map((w) => (
              <div key={w.day + w.time} className="py-6 border-b border-slate-200 flex justify-between gap-6">
                <p className="text-lg font-bold tracking-tight">{w.title} <span className="font-normal text-slate-500">{w.day}</span></p>
                <p className="text-lg font-bold text-brand">{w.time}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
