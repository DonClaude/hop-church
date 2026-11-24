import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { church, LOGO_URL } from "../data/church";

const menu = [
  { label: "I'm new", to: "/plan-your-visit", red: true },
  { label: "About", to: "/about" },
  { label: "Messages", to: "/watch" },
  { label: "Ministries", to: "/ministries" },
  { label: "Events", to: "/events" },
  { label: "Give", to: "/give" },
  { label: "Contact", to: "/contact" },
];

// Emblem + "HOUSE OF PRAYER / CHURCH", set like the HOP Worship wordmark.
function Logo({ light = false, onClick }) {
  return (
    <Link to="/" onClick={onClick} className="flex items-center gap-3.5 flex-shrink-0" aria-label="House of Prayer Church, home">
      <img src={LOGO_URL} alt="" className="w-11 h-11 sm:w-[50px] sm:h-[50px] object-contain" />
      <span className="leading-none flex flex-col gap-[5px]">
        <span className="headline text-[21px] sm:text-[24px] tracking-[0.01em]">House of Prayer</span>
        <span className={`font-sans text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.24em] ${light ? "text-white/80" : "text-oxblood"}`}>Church</span>
      </span>
    </Link>
  );
}

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

  const openBtn = useRef(null);
  const closeBtn = useRef(null);

  // While the menu is open: no page scroll behind it, Escape closes it, focus goes to the close button.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => closeBtn.current?.focus(), 50);
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      clearTimeout(t);
      window.removeEventListener("keydown", onKey);
      openBtn.current?.focus({ preventScroll: true });
    };
  }, [open]);

  const overPhoto = isHome && !scrolled;
  const isActive = (to) => pathname === to;

  return (
    <div className="min-h-screen bg-white text-ink font-sans">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:bg-ink focus:text-white focus:px-4 focus:py-2 text-sm">
        Skip to content
      </a>

      <header
        className={`fixed top-0 inset-x-0 z-50 transition-[background-color,color,border-color] duration-300 border-b ${
          overPhoto ? "bg-transparent text-white border-transparent" : "bg-white text-ink border-ink/10"
        }`}
      >
        <div className="px-5 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between h-[84px]">
            <Logo light={overPhoto} />
            <button
              ref={openBtn}
              onClick={() => setOpen(true)}
              className="-mr-2 w-12 h-12 flex items-center justify-center"
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="site-menu"
            >
              <svg aria-hidden="true" width="30" height="18" viewBox="0 0 30 18" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M0 1h30M0 9h30M0 17h30" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="site-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[70] bg-white text-ink flex flex-col overflow-y-auto font-modern"
          >
            <div className="w-full px-5 sm:px-8 lg:px-12 flex items-center justify-between h-[84px] flex-shrink-0">
              <Logo onClick={() => setOpen(false)} />
              <button ref={closeBtn} onClick={() => setOpen(false)} className="-mr-2 w-12 h-12 flex items-center justify-center" aria-label="Close menu">
                <svg aria-hidden="true" width="22" height="22" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 2l16 16M18 2L2 18" /></svg>
              </button>
            </div>
            <nav className="flex-1 w-full flex flex-col justify-center px-5 sm:px-8 lg:px-12 py-6" aria-label="Main">
              {menu.map((item, i) => (
                <motion.div
                  key={item.to}
                  initial={{ opacity: 0, y: -24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, transition: { duration: 0.15 } }}
                  transition={{ duration: 0.6, delay: 0.18 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    to={item.to}
                    onClick={() => setOpen(false)}
                    aria-current={isActive(item.to) ? "page" : undefined}
                    className={`inline-block font-bold leading-[1.02] tracking-[-0.05em] text-[clamp(40px,min(7.5vw,8.6vh),112px)] transition-colors ${
                      item.red || isActive(item.to) ? "text-oxblood" : "text-ink hover:text-oxblood"
                    }`}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="border-t border-ink/10"><div className="px-5 sm:px-8 lg:px-12 py-6 flex flex-wrap justify-between gap-x-8 gap-y-3 font-sans font-bold uppercase tracking-[0.3em] text-[11px] sm:text-[12px] text-stone-600">
              <span>Sundays 9:00 + 11:15 AM</span>
              <a href={church.mapsUrl} target="_blank" rel="noopener noreferrer" className="hover:text-ink">1245 Thomaston Avenue, Waterbury</a>
              <a href={church.phoneHref} className="hover:text-ink">{church.phone}</a>
            </div></div>
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
