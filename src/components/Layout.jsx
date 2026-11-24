import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Youtube, Facebook, Instagram } from "lucide-react";
import { church, nav, LOGO_URL } from "../data/church";

export default function Layout({ children }) {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans antialiased">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:bg-white focus:px-4 focus:py-2 focus:rounded-full focus:shadow">
        Skip to content
      </a>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-white/95 backdrop-blur-xl border-b border-slate-100 shadow-sm" : "bg-white/80 backdrop-blur-md"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-3 group shrink-0" aria-label="House of Prayer Church home">
              <img src={LOGO_URL} alt="" className="w-11 h-11 object-contain mix-blend-multiply transition-transform duration-300 group-hover:scale-105" />
              <div className="flex flex-col justify-center">
                <span className="text-sm font-bold tracking-tight text-slate-900 leading-none">House of Prayer</span>
                <span className="text-[10px] font-medium text-slate-500 tracking-widest uppercase mt-1">Waterbury, CT</span>
              </div>
            </Link>

            <nav className="hidden lg:flex items-center gap-1" aria-label="Main">
              {nav.slice(1).map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `relative px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      isActive ? "text-brand bg-brand/[0.08]" : "text-slate-500 hover:text-slate-900"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
              <Link
                to="/plan-your-visit"
                className="ml-3 inline-flex items-center px-5 py-2.5 rounded-full bg-brand hover:bg-brand-dark text-white text-sm font-semibold transition-colors shadow-md shadow-brand/25"
              >
                Plan Your Visit
              </Link>
            </nav>

            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden w-11 h-11 flex items-center justify-center rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="lg:hidden border-t border-slate-100 bg-white overflow-hidden"
              aria-label="Mobile"
            >
              <div className="px-6 py-4 space-y-1">
                {nav.slice(1).map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) =>
                      `block px-4 py-3 rounded-xl text-base font-medium ${
                        isActive ? "bg-brand/[0.08] text-brand" : "text-slate-700 hover:bg-slate-50"
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
                <Link to="/plan-your-visit" className="mt-3 flex justify-center px-5 py-3.5 rounded-full bg-brand text-white font-semibold">
                  Plan Your Visit
                </Link>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      <main id="main" className="pt-16">{children}</main>

      <footer className="bg-slate-950 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <img src={LOGO_URL} alt="" className="w-9 h-9 object-contain bg-white rounded-full p-1" />
              <span className="text-lg font-semibold tracking-tight">{church.name}</span>
            </div>
            <p className="text-slate-400 text-sm italic leading-relaxed max-w-sm">
              "My house shall be called a house of prayer for all nations."
            </p>
            <p className="text-slate-400 text-xs tracking-widest uppercase mt-2">Mark 11:17</p>
            <div className="flex gap-3 mt-8">
              {[
                { href: church.social.youtube, icon: Youtube, label: "YouTube" },
                { href: church.social.facebook, icon: Facebook, label: "Facebook" },
                { href: church.social.instagram, icon: Instagram, label: "Instagram" },
              ].map(({ href, icon: Icon, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                  className="w-11 h-11 rounded-full border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-white/40 transition-colors">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
          <div>
            <p className="text-[11px] font-bold tracking-[0.2em] text-rose-400 mb-5">SUNDAYS</p>
            {church.services.map((s) => (
              <p key={s.time} className="text-sm text-slate-300 mb-2">{s.time} · {s.name}</p>
            ))}
            <p className="text-sm text-slate-400 mt-4 leading-relaxed">
              {church.mainAddress.line1}<br />{church.mainAddress.line2}
            </p>
          </div>
          <div>
            <p className="text-[11px] font-bold tracking-[0.2em] text-rose-400 mb-5">CHURCH OFFICE</p>
            <p className="text-sm text-slate-300"><a href={church.phoneHref} className="inline-flex items-center min-h-[44px] hover:text-white">{church.phone}</a></p>
            <p className="text-sm text-slate-300 break-all"><a href={`mailto:${church.email}`} className="inline-flex items-center min-h-[44px] hover:text-white">{church.email}</a></p>
            <p className="text-sm text-slate-400 mt-4">{church.officeHours}</p>
          </div>
        </div>
        <div className="border-t border-slate-800">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 flex flex-col sm:flex-row gap-3 justify-between text-xs text-slate-400">
            <p>&copy; {new Date().getFullYear()} {church.name}. An {church.denomination} church.</p>
            <a href={church.worshipSite} target="_blank" rel="noopener noreferrer" className="inline-flex items-center min-h-[44px] hover:text-slate-300">HOP Worship Team</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
