import { church, coreValues, beliefs, leaders, history } from "../data/church";
import { Button, PageHero, PhotoSlot } from "../components/ui";

export default function About() {
  return (
    <>
      <PageHero
        title="About House of Prayer Church"
        text="An Assemblies of God church on Thomaston Avenue in Waterbury, founded in 1979 and led by Rev. James and Verna Lilley."
        photo="The church building on Thomaston Avenue"
      />

      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-5">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter leading-tight mb-6">A church of all nations</h2>
            <div className="space-y-5 text-lg text-slate-600 leading-relaxed">
              <p>
                Our name comes from Mark 11:17: "My house shall be called a house of prayer for all nations." People from many countries worship here together every Sunday.
              </p>
              <p>
                During the week the church runs the Bread of Life food pantry, Lighthouse Childcare and Alpha Ministries, a home for men and women recovering from addiction.
              </p>
            </div>
          </div>
          <PhotoSlot label="Congregation in worship" className="lg:col-span-7 rounded-2xl aspect-[4/3]" />
        </div>
      </section>

      <section className="py-24 md:py-32 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter leading-tight mb-6">Core values at House of Prayer</h2>
            <p className="text-slate-600 leading-relaxed">Seven values guide how we worship and serve.</p>
          </div>
          <dl className="lg:col-span-8 grid sm:grid-cols-2 gap-x-12 border-t border-slate-200">
            {coreValues.map((v) => (
              <div key={v.title} className="py-6 border-b border-slate-200">
                <dt className="text-lg font-bold tracking-tight mb-1">{v.title}</dt>
                <dd className="text-slate-600 leading-relaxed">{v.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter leading-tight mb-6">What we believe</h2>
            <p className="text-slate-600 leading-relaxed mb-8">
              As an {church.denomination} church, we hold to its 16 Fundamental Truths. These six are at the heart of them.
            </p>
            <a href="https://ag.org/Beliefs/Statement-of-Fundamental-Truths" target="_blank" rel="noopener noreferrer" className="inline-flex items-center min-h-[44px] font-semibold underline decoration-slate-300 underline-offset-4 hover:decoration-brand">
              Read all 16 Fundamental Truths
            </a>
          </div>
          <dl className="lg:col-span-8 grid sm:grid-cols-2 gap-x-12 border-t border-slate-200">
            {beliefs.map((b) => (
              <div key={b.title} className="py-6 border-b border-slate-200">
                <dt className="text-lg font-bold tracking-tight mb-1">{b.title}</dt>
                <dd className="text-slate-600 leading-relaxed">{b.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-slate-950">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tighter leading-tight mb-5">Our pastors</h2>
            <p className="text-white/70 text-lg leading-relaxed">Rev. James and Verna Lilley came to Waterbury in 1998 and have led the church ever since.</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-8 max-w-4xl">
            {leaders.map((l) => (
              <div key={l.name}>
                <PhotoSlot label={l.name} dark className="aspect-[4/5] rounded-2xl" />
                <p className="mt-5 text-sm text-rose-300">{l.role}</p>
                <h3 className="text-2xl font-bold text-white tracking-tight">{l.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter leading-tight mb-8">Church history</h2>
            <Button to="/plan-your-visit" arrow>Plan Your Visit</Button>
          </div>
          <ol className="lg:col-span-8 border-t border-slate-200">
            {history.map((h) => (
              <li key={h.year} className="py-6 border-b border-slate-200 grid grid-cols-[5rem_1fr] gap-6">
                <span className="text-2xl font-bold tracking-tight text-brand">{h.year}</span>
                <span className="text-lg text-slate-700 leading-relaxed">{h.text}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
