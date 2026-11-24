import { ministries } from "../data/church";
import { Button, PageHero, PhotoSlot } from "../components/ui";

export default function Ministries() {
  return (
    <>
      <PageHero
        title="Ministries at House of Prayer"
        text="Ten ministries for prayer, worship, men, women, families and our neighbors across Waterbury."
        photo="Small group praying together"
      />

      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter leading-tight mb-12">All ten ministries</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ministries.map((m) => {
              const Card = m.link ? "a" : "div";
              return (
                <Card
                  key={m.name}
                  {...(m.link ? { href: m.link, target: "_blank", rel: "noopener noreferrer" } : {})}
                  className={`group block h-full bg-white rounded-2xl border border-slate-200 overflow-hidden transition-all duration-300 ${m.link ? "hover:-translate-y-0.5 hover:shadow-md" : ""}`}
                >
                  <div className="overflow-hidden"><PhotoSlot label={m.name} className="aspect-[16/10] transition-transform duration-500 group-hover:scale-[1.03]" /></div>
                  <div className="p-7">
                    <h3 className="text-xl font-bold tracking-tight mb-2 group-hover:text-brand transition-colors">{m.name}</h3>
                    <p className="text-slate-600 leading-relaxed">{m.text}</p>
                    {m.link && <p className="mt-5 text-sm font-semibold underline decoration-slate-300 underline-offset-4 group-hover:decoration-brand">See the {m.name} page</p>}
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-slate-950">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24 grid lg:grid-cols-2 gap-10 items-start">
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tighter leading-tight">Find a ministry on your first Sunday</h2>
          <div>
            <p className="text-white/70 leading-relaxed mb-8 max-w-md">Ask a greeter after the service and they will introduce you to the leaders.</p>
            <Button to="/plan-your-visit" arrow>Plan Your Visit</Button>
          </div>
        </div>
      </section>
    </>
  );
}
