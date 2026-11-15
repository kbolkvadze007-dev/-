import { ArrowUpRight, BadgeCheck, CalendarDays, MapPin, Star, Stethoscope } from "lucide-react";
import type { Doctor } from "../types/doctor";

type DoctorCardProps = {
  doctor: Doctor;
  onViewProfile: (doctor: Doctor) => void;
};

export default function DoctorCard({ doctor, onViewProfile }: DoctorCardProps) {
  return (
    <article className={`doctor-card ${doctor.featured ? "doctor-card--featured" : ""}`}>
      <div className="doctor-card__top">
        {doctor.featured && <span className="featured-label">რჩეული ექიმი</span>}
        <button className="icon-button profile-arrow" aria-label={`${doctor.name} — პროფილის ნახვა`} onClick={() => onViewProfile(doctor)}>
          <ArrowUpRight size={18} />
        </button>
      </div>
      <div className="doctor-card__identity">
        <div className="avatar-wrap">
          <img src={doctor.image} alt={doctor.name} className="doctor-avatar" loading="lazy" />
          <span className="online-dot" title="პროფილი აქტიურია" />
        </div>
        <div className="doctor-card__name">
          <h3>{doctor.name}</h3>
          <div className="verified"><BadgeCheck size={14} /> გადამოწმებული პროფილი</div>
          <p>{doctor.title}</p>
        </div>
      </div>

      <div className="specialty-line">
        <span className="specialty-icon"><Stethoscope size={15} /></span>
        <span>{doctor.specialty}</span>
      </div>

      <div className="doctor-stats">
        <div><strong>{doctor.experience} წელი</strong><span>გამოცდილება</span></div>
        <div className="rating"><strong><Star size={14} fill="currentColor" /> {doctor.rating.toFixed(1)}</strong><span>{doctor.reviews} შეფასება</span></div>
        <div><strong>{doctor.fee} ₾</strong><span>კონსულტაცია</span></div>
      </div>

      <div className="doctor-details">
        <p><MapPin size={15} /> {doctor.clinic} · {doctor.location}</p>
        <p><CalendarDays size={15} /> უახლოესი ვიზიტი: <b>{doctor.nextAvailable}</b></p>
      </div>

      <div className="doctor-card__footer">
        <div className="day-list">{doctor.availableDays.slice(0, 3).map(day => <span key={day}>{day}</span>)}</div>
        <button className="text-button" onClick={() => onViewProfile(doctor)}>პროფილი <ArrowUpRight size={15} /></button>
      </div>
    </article>
  );
}
