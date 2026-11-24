import { church } from "../data/church";
import { Button, PageHero, PhotoSlot } from "../components/ui";

export default function Give() {
  return (
    <>
      <PageHero
        title="Give to House of Prayer"
        text="Gifts pay for Sunday ministry, the Bread of Life food pantry, Alpha Ministries and missions."
        photo="Families receiving groceries at Bread of Life"
      />

      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter leading-tight mb-6">Ways to give</h2>
            <p className="text-slate-600 leading-relaxed">
              Questions about giving? Call <a href={church.phoneHref} className="font-semibold text-slate-900 underline decoration-slate-300 underline-offset-4">{church.phone}</a>.
            </p>
          </div>
          <div className="lg:col-span-8 border-t border-slate-200">
            {church.givingUrl && (
              <div className="py-8 border-b border-slate-200 grid sm:grid-cols-[1fr_auto] gap-6 items-center">
                <div><h3 className="text-xl font-bold tracking-tight">Online</h3><p className="text-slate-600 mt-1">Give once or set up a recurring gift.</p></div>
                <Button href={church.givingUrl} arrow>Give online</Button>
              </div>
            )}
            <div className="py-8 border-b border-slate-200">
              <h3 className="text-xl font-bold tracking-tight">During a service</h3>
              <p className="text-slate-600 mt-1">Give at the 9:00 or 11:00 AM service at {church.mainAddress.line1}.</p>
            </div>
            <div className="py-8 border-b border-slate-200">
              <h3 className="text-xl font-bold tracking-tight">By mail</h3>
              <p className="text-slate-600 mt-1">Send a check to House of Prayer Church, 1263 Thomaston Avenue, Waterbury, CT 06704.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-950 py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tighter leading-tight mb-6">Where gifts go in Waterbury</h2>
            <p className="text-white/70 text-lg leading-relaxed mb-6">
              Through Bread of Life and our compassion ministry, the church has given out more than 10 million pounds of food to families in the city.
            </p>
            <p className="text-white/70 leading-relaxed">
              Gifts also keep Alpha Ministries open, where men and women in recovery live and grow in faith. Each quarter we will share a report on what giving made possible.
            </p>
          </div>
          <PhotoSlot label="Volunteers packing groceries" dark className="rounded-2xl aspect-[4/3]" />
        </div>
      </section>

      <section className="py-24 md:py-28">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <blockquote>
            <p className="text-3xl md:text-4xl font-bold tracking-tight leading-snug">"Every man according as he purposeth in his heart, so let him give; not grudgingly, or of necessity: for God loveth a cheerful giver."</p>
            <footer className="mt-6 text-brand font-semibold">2 Corinthians 9:7</footer>
          </blockquote>
        </div>
      </section>
    </>
  );
}
