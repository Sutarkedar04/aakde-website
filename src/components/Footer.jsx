import { navLinks } from '../data'
import logo from '../assets/aakde_logo.png'

export default function Footer() {
  return (
    <footer data-theme="dark" className={`relative overflow-hidden pb-6 pt-20 text-soft bg-navy`}>
      <div className="wrap relative grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <img src={logo} alt="AAKDE" className="h-9 w-auto" />
          <p className="mt-3">
            At AAKDE, we are dedicated to unlocking the potential of individuals and organizations
            through our specialized services in quant and data analysis.
          </p>
        </div>

        <nav aria-label="Footer" className="grid grid-cols-2 content-start gap-2 text-sm uppercase tracking-[0.15em]">
          {navLinks.map((l) => (
            <a key={l.id} href={`#${l.id}`} className="transition hover:text-main">{l.label}</a>
          ))}
        </nav>

        <div>
          <p className="text-sm uppercase tracking-[0.15em]">Contact</p>
          <p className="mt-3">
            <span className="block">Phone</span>
            <a href="tel:+918600373650" className="transition hover:text-main">+91 8600373650</a>
          </p>
          <p className="mt-3">
            <span className="block">Email</span>
            <a href="mailto:contact@aakde.com" className="transition hover:text-main">contact@aakde.com</a>
          </p>
          <p className="mt-3">
            <span className="block">Address</span>
            Aakde Infotech LLP<br />
            Shop 101, Orchid Enclave, 4th Ln, Poorvarang, Mahalaxminagar, Rajarampuri, Kolhapur,
            Maharashtra 416008
          </p>
        </div>
      </div>

      <p
        aria-hidden="true"
        data-speed="0.3"
        className="pointer-events-none mt-12 select-none text-center font-display text-[clamp(4rem,19vw,16rem)] font-bold leading-none text-white/[0.07] will-change-transform"
      >
        AAKDE
      </p>
      <p className="relative mt-6 text-center text-sm">© {new Date().getFullYear()} AAKDE. All rights reserved.</p>
    </footer>
  )
}