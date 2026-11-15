import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, X, Users, CalendarCheck2, Star, RotateCcw } from "lucide-react";
import type { Doctor, Specialty } from "../types/doctor";
import DoctorCard from "./DoctorCard";

type Props = {
  doctors: Doctor[];
  onViewProfile: (doctor: Doctor) => void;
};

const specialties: Array<"ყველა" | Specialty> = [
  "ყველა", "კარდიოლოგია", "ნევროლოგია", "პედიატრია", "დერმატოლოგია",
  "გინეკოლოგია", "ორთოპედია", "ოფთალმოლოგია", "სტომატოლოგია"
];
const days = ["ორშ", "სამ", "ოთხ", "ხუთ", "პარ", "შაბ"];

export default function DoctorDirectory({ doctors, onViewProfile }: Props) {
  const [search, setSearch] = useState("");
  const [specialty, setSpecialty] = useState<"ყველა" | Specialty>("ყველა");
  const [day, setDay] = useState("ყველა დღე");
  const [sort, setSort] = useState("recommended");
  const [onlyFeatured, setOnlyFeatured] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const filteredDoctors = useMemo(() => {
    const normalized = search.trim().toLocaleLowerCase("ka");
    const result = doctors.filter(doctor => {
      const matchesSearch = !normalized ||
        doctor.name.toLocaleLowerCase("ka").includes(normalized) ||
        doctor.specialty.toLocaleLowerCase("ka").includes(normalized) ||
        doctor.clinic.toLocaleLowerCase("ka").includes(normalized);
      const matchesSpecialty = specialty === "ყველა" || doctor.specialty === specialty;
      const matchesDay = day === "ყველა დღე" || doctor.availableDays.includes(day);
      const matchesFeatured = !onlyFeatured || Boolean(doctor.featured);
      return matchesSearch && matchesSpecialty && matchesDay && matchesFeatured;
    });

    return [...result].sort((a, b) => {
      if (sort === "rating") return b.rating - a.rating;
      if (sort === "experience") return b.experience - a.experience;
      if (sort === "price") return a.fee - b.fee;
      return Number(Boolean(b.featured)) - Number(Boolean(a.featured)) || b.rating - a.rating;
    });
  }, [doctors, search, specialty, day, sort, onlyFeatured]);

  const resetFilters = () => {
    setSearch("");
    setSpecialty("ყველა");
    setDay("ყველა დღე");
    setSort("recommended");
    setOnlyFeatured(false);
  };

  return (
    <section className="directory-section" id="doctors">
      <div className="section-heading">
        <div>
          <span className="eyebrow">ჩვენი სპეციალისტები</span>
          <h2>იპოვე ექიმი, რომელსაც <em>ენდობი.</em></h2>
          <p>შეარჩიე სპეციალისტი გამოცდილების, მიმართულებისა და ხელმისაწვდომი დროის მიხედვით.</p>
        </div>
        <div className="result-count"><Users size={17} /><b>{filteredDoctors.length}</b> ექიმი</div>
      </div>

      <div className="filter-panel">
        <div className="search-field">
          <Search size={19} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="მოძებნე ექიმი, სპეციალობა ან კლინიკა..." aria-label="ექიმის ძიება" />
          {search && <button className="clear-search" onClick={() => setSearch("")} aria-label="ძიების გასუფთავება"><X size={16} /></button>}
        </div>
        <button className={`filter-toggle ${showFilters ? "active" : ""}`} onClick={() => setShowFilters(v => !v)}>
          <SlidersHorizontal size={17} /> ფილტრები
        </button>
      </div>

      <div className="specialty-chips" aria-label="სპეციალობით ფილტრაცია">
        {specialties.map(item => (
          <button key={item} className={`chip ${specialty === item ? "chip--active" : ""}`} onClick={() => setSpecialty(item)}>{item}</button>
        ))}
      </div>

      {showFilters && (
        <div className="advanced-filters">
          <label>ხელმისაწვდომი დღე
            <select value={day} onChange={e => setDay(e.target.value)}>
              <option>ყველა დღე</option>
              {days.map(d => <option key={d}>{d}</option>)}
            </select>
          </label>
          <label>დალაგება
            <select value={sort} onChange={e => setSort(e.target.value)}>
              <option value="recommended">რეკომენდებული</option>
              <option value="rating">მაღალი შეფასება</option>
              <option value="experience">გამოცდილება</option>
              <option value="price">ფასი: დაბლიდან</option>
            </select>
          </label>
          <label className="featured-check"><input type="checkbox" checked={onlyFeatured} onChange={e => setOnlyFeatured(e.target.checked)} /> მხოლოდ რჩეული ექიმები</label>
          <button className="reset-button" onClick={resetFilters}><RotateCcw size={15} /> გასუფთავება</button>
        </div>
      )}

      <div className="directory-meta">
        <span><CalendarCheck2 size={15} /> განრიგი განახლებულია</span>
        <span><Star size={14} fill="currentColor" /> რეიტინგი პაციენტების შეფასებებზეა დაფუძნებული</span>
      </div>

      {filteredDoctors.length > 0 ? (
        <div className="doctor-grid">
          {filteredDoctors.map(doctor => <DoctorCard key={doctor.id} doctor={doctor} onViewProfile={onViewProfile} />)}
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-icon"><Search size={26} /></div>
          <h3>შედეგი ვერ მოიძებნა</h3>
          <p>სცადე სხვა საძიებო სიტყვა ან შეცვალე ფილტრის პარამეტრები.</p>
          <button className="primary-button compact" onClick={resetFilters}>ფილტრების გასუფთავება</button>
        </div>
      )}
    </section>
  );
}
