import { useState } from "react";
import { Activity, ArrowRight, BadgeCheck, CalendarDays, CheckCircle2, HeartPulse, Menu, ShieldCheck, Stethoscope, X } from "lucide-react";
import DoctorDirectory from "./components/DoctorDirectory";
import DoctorProfileModal from "./components/DoctorProfileModal";
import BookingModal from "./components/BookingModal";
import { useFetchDoctors } from "./hooks/useFetchDoctors";
import type { Doctor } from "./types/doctor";

export default function App() {
  const { doctors, loading, error } = useFetchDoctors();
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [bookingDoctor, setBookingDoctor] = useState<Doctor | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="header-inner">
          <a className="brand" href="#" aria-label="MediCare მთავარი">
            <span className="brand-mark"><HeartPulse size={22} /></span>
            <span>Medi<span>Care</span><small>CLINIC PORTAL</small></span>
          </a>
          <nav className={mobileMenuOpen ? "nav nav--open" : "nav"}>
            <a href="#home" onClick={() => setMobileMenuOpen(false)}>მთავარი</a>
            <a href="#doctors" onClick={() => setMobileMenuOpen(false)}>ექიმები</a>
            <a href="#why-us" onClick={() => setMobileMenuOpen(false)}>ჩვენ შესახებ</a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)}>კონტაქტი</a>
          </nav>
          <a className="header-cta" href="#doctors">ექიმის პოვნა <ArrowRight size={16} /></a>
          <button className="mobile-menu" onClick={() => setMobileMenuOpen(v => !v)} aria-label="მენიუს გახსნა">{mobileMenuOpen ? <X /> : <Menu />}</button>
        </div>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-glow hero-glow--one" /><div className="hero-glow hero-glow--two" />
          <div className="hero-content">
            <div className="hero-copy">
              <div className="hero-kicker"><span className="pulse-dot" /> ჯანმრთელობა იწყება სწორი არჩევანით</div>
              <h1>შენი ჯანმრთელობა<br />ჩვენი <em>პრიორიტეტია.</em></h1>
              <p>იპოვე შენთვის შესაფერისი ექიმი მარტივად. აღმოაჩინე გამოცდილი სპეციალისტები, შეადარე მათი პროფილები და დაგეგმე შემდეგი ნაბიჯი უკეთესი ჯანმრთელობისკენ.</p>
              <div className="hero-actions">
                <a className="primary-button" href="#doctors">ექიმების ნახვა <ArrowRight size={17} /></a>
                <a className="secondary-button" href="#why-us">რატომ MediCare?</a>
              </div>
              <div className="hero-trust">
                <div className="trust-avatars"><img src="https://i.pravatar.cc/80?img=47" alt="" /><img src="https://i.pravatar.cc/80?img=12" alt="" /><img src="https://i.pravatar.cc/80?img=44" alt="" /></div>
                <div><strong>სანდო არჩევანი</strong><span>პაციენტზე ორიენტირებული მიდგომა</span></div>
              </div>
            </div>
            <div className="hero-visual">
              <div className="hero-image-frame">
                <img src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=1000&q=85" alt="ექიმი კლინიკაში" />
                <div className="image-overlay" />
                <div className="floating-card floating-card--top"><span className="floating-icon"><ShieldCheck size={19} /></span><div><b>სანდო სპეციალისტები</b><small>გადამოწმებული პროფილები</small></div></div>
                <div className="floating-card floating-card--bottom"><div className="mini-chart"><Activity size={20} /></div><div><b>ზრუნვა შენზე</b><small>ყოველ ნაბიჯზე</small></div><CheckCircle2 className="floating-check" size={20} /></div>
              </div>
              <div className="hero-stamp"><span>CARE</span><HeartPulse size={25} /><small>WITH<br />CONFIDENCE</small></div>
            </div>
          </div>
          <div className="hero-bottom">
            <div><Stethoscope size={19} /><span><b>მრავალფეროვანი</b><small>სამედიცინო მიმართულებები</small></span></div>
            <div><BadgeCheck size={19} /><span><b>გადამოწმებული</b><small>სპეციალისტების პროფილები</small></span></div>
            <div><CalendarDays size={19} /><span><b>მარტივი ძიება</b><small>მოქნილი განრიგის ფილტრი</small></span></div>
          </div>
        </section>

        {loading && <div className="loading-state"><span className="loader" /> ექიმების სია იტვირთება...</div>}
        {error && <div className="error-state">{error} შეამოწმე, რომ public/doctors.json ფაილი არსებობს.</div>}
        {!loading && !error && <DoctorDirectory doctors={doctors} onViewProfile={setSelectedDoctor} />}

        <section className="why-section" id="why-us">
          <div className="why-intro"><span className="eyebrow">რატომ MediCare</span><h2>ჯანდაცვა, რომელიც<br /><em>შენზე ზრუნავს.</em></h2><p>ჩვენი მიზანია ექიმის პოვნის პროცესი იყოს გამჭვირვალე, მარტივი და კომფორტული.</p></div>
          <div className="benefit-grid">
            <article><span className="benefit-icon"><ShieldCheck /></span><h3>სანდო ინფორმაცია</h3><p>ექიმების პროფილები აერთიანებს სპეციალობას, გამოცდილებასა და პაციენტების შეფასებებს.</p></article>
            <article><span className="benefit-icon"><Activity /></span><h3>მარტივი არჩევანი</h3><p>მოძებნე სპეციალისტი, გაფილტრე შედეგები და შეადარე მნიშვნელოვანი დეტალები.</p></article>
            <article><span className="benefit-icon"><CalendarDays /></span><h3>დროის დაზოგვა</h3><p>ნახე მიღების დღეები და უახლოესი ხელმისაწვდომი დრო ერთ სივრცეში.</p></article>
          </div>
        </section>
      </main>

      <footer className="site-footer" id="contact">
        <div className="footer-main">
          <a className="brand brand--footer" href="#"><span className="brand-mark"><HeartPulse size={22} /></span><span>Medi<span>Care</span><small>CLINIC PORTAL</small></span></a>
          <p>სწორი ინფორმაცია. გააზრებული არჩევანი.<br />შენი ჯანმრთელობის უკეთესი გზა.</p>
          <a href="#doctors" className="footer-link">იპოვე ექიმი <ArrowRight size={15} /></a>
        </div>
        <div className="footer-bottom"><span>© 2026 MediCare Clinic Portal</span><span>სასწავლო პროექტი · დემო მონაცემები</span><a href="#home">ზემოთ დაბრუნება ↑</a></div>
      </footer>
      <DoctorProfileModal doctor={selectedDoctor} onClose={() => setSelectedDoctor(null)} onBook={doctor => { setSelectedDoctor(null); setBookingDoctor(doctor); }} />
      <BookingModal doctor={bookingDoctor} onClose={() => setBookingDoctor(null)} />
    </div>
  );
}
