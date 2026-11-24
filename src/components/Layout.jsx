import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ArrowRight, ArrowUpRight } from "lucide-react";
import { church, nav, LOGO_URL } from "../data/church";

export default function Layout({ children }) {
  const { pathname } = useLocation();
  const isHome = pathname === "/" || pathname === "/index.html";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.75);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    window.scrollTo(0, 0);
  }, [pathname]);

  const overPhoto = isHome && !scrolled && !open;
  const isActive = (to) => pathname === to;
  const links = nav.filter((n) => n.to !== "/plan-your-visit");

  return (
    <div className="min-h-screen bg-white text-ink font-sans">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:bg-ink focus:text-white focus:px-4 focus:py-2 text-sm">
        Skip to content
      </a>

      <header
        className={`fixed top-0 inset-x-0 z-50 transition-[background-color,color,border-color] duration-300 border-b ${
          overPhoto ? "bg-transparent text-white border-white/15" : "bg-white text-ink border-ink/10"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between h-[72px]">
            <Link to="/" className="flex items-center gap-3 flex-shrink-0" aria-label="House of Prayer Church, home">
              <img src={LOGO_URL} alt="" className="w-10 h-10 object-contain" />
              <span className="leading-none">
                <span className="headline block text-[21px] tracking-[0.01em]">House of Prayer</span>
                <span className={`block text-[10px] font-bold uppercase tracking-[0.24em] mt-1 ${overPhoto ? "text-white/70" : "text-oxblood"}`}>Church</span>
              </span>
            </Link>

            <nav className="hidden lg:flex items-center gap-8" aria-label="Main">
              {links.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  aria-current={isActive(item.to) ? "page" : undefined}
                  className={`relative text-[13px] font-bold uppercase tracking-[0.1em] py-1 transition-opacity ${isActive(item.to) ? "opacity-100" : "opacity-70 hover:opacity-100"}`}
                >
                  {item.label}
                  {isActive(item.to) && <motion.span layoutId="nav-rule" className="absolute -bottom-1 left-0 right-0 h-[2px] bg-oxblood" />}
                </Link>
              ))}
              <Link to="/plan-your-visit" className="inline-flex items-center gap-2 bg-oxblood hover:bg-oxblood-deep text-white text-[13px] font-bold uppercase tracking-[0.1em] px-5 py-3 transition-colors">
                Plan your visit <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </nav>

            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden -mr-2 w-11 h-11 flex items-center justify-center"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              {open ? <X className="w-7 h-7" strokeWidth={1.75} /> : <Menu className="w-7 h-7" strokeWidth={1.75} />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden fixed inset-x-0 top-[72px] bottom-0 z-40 bg-white overflow-y-auto"
          >
            <nav className="px-5 sm:px-8 pt-4 pb-10 flex flex-col min-h-full" aria-label="Mobile">
              {[{ label: "Home", to: "/" }, ...links].map((item) => (
                <Link key={item.to} to={item.to} className="py-3 border-b border-ink/10">
                  <span className={`headline text-[44px] ${isActive(item.to) ? "text-oxblood" : "text-ink"}`}>{item.label}</span>
                </Link>
              ))}
              <Link to="/plan-your-visit" className="btn-red mt-8">
                Plan your visit <ArrowRight className="w-4 h-4" />
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <main id="main">{children}</main>

      <footer className="bg-ink-night text-white">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="py-20 md:py-28 grid lg:grid-cols-12 gap-10 items-end border-b border-white/10">
            <div className="lg:col-span-8">
              <p className="headline text-[52px] sm:text-[80px] lg:text-[112px]">
                A house of prayer
                <br />
                for all <span className="accent text-oxblood">nations.</span>
              </p>
              <p className="mt-6 text-[12px] font-bold uppercase tracking-[0.2em] text-white/50">Mark 11:17</p>
            </div>
            <div className="lg:col-span-4 lg:justify-self-end">
              <Link to="/plan-your-visit" className="btn-red">
                Plan your visit <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-8 py-14 text-[14px]">
            <div className="col-span-2 md:col-span-1">
              <p className="headline text-[26px]">House of Prayer<br /><span className="text-oxblood">Church</span></p>
              <p className="text-white/60 mt-4 leading-6">{church.mainAddress.line1}<br />{church.mainAddress.line2}</p>
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/50 mb-4">Sundays</p>
              <p className="text-white/80 leading-7">First service {church.services[0].time}<br />Second service {church.services[1].time}</p>
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/50 mb-4">Church office</p>
              <ul className="text-white/80">
                <li><a href={church.phoneHref} className="inline-flex items-center min-h-[36px] hover:text-white">{church.phone}</a></li>
                <li><a href={`mailto:${church.email}`} className="inline-flex items-center min-h-[36px] hover:text-white break-all">{church.email}</a></li>
                <li className="text-white/60 mt-2 leading-6">{church.officeHours}</li>
              </ul>
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/50 mb-4">Follow</p>
              <ul className="text-white/80">
                <li><a href={church.social.youtube} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 min-h-[36px] hover:text-white">YouTube <ArrowUpRight className="w-3.5 h-3.5" /></a></li>
                <li><a href={church.social.facebook} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 min-h-[36px] hover:text-white">Facebook <ArrowUpRight className="w-3.5 h-3.5" /></a></li>
                <li><a href={church.social.instagram} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 min-h-[36px] hover:text-white">Instagram <ArrowUpRight className="w-3.5 h-3.5" /></a></li>
                <li><a href={church.worshipSite} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 min-h-[36px] hover:text-white">HOP Worship Team <ArrowUpRight className="w-3.5 h-3.5" /></a></li>
              </ul>
            </div>
          </div>

          <div className="py-6 border-t border-white/10 text-[12px] text-white/50">
            © {new Date().getFullYear()} {church.name}. An {church.denomination} church.
          </div>
        </div>
      </footer>
    </div>
  );
}
