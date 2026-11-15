import { X, BadgeCheck, MapPin, Star, CalendarDays, Languages, Clock3 } from "lucide-react";
import type { Doctor } from "../types/doctor";

type Props = { doctor: Doctor | null; onClose: () => void };

export default function DoctorProfileModal({ doctor, onClose }: Props) {
  if (!doctor) return null;
  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={e => { if (e.target === e.currentTarget) onClose(); }}>
      <section className="profile-modal" role="dialog" aria-modal="true" aria-labelledby="profile-title">
        <button className="modal-close" onClick={onClose} aria-label="დახურვა"><X size={20} /></button>
        <div className="modal-cover" />
        <div className="modal-profile-head">
          <img src={doctor.image} alt={doctor.name} />
          <div>
            <span className="modal-specialty">{doctor.specialty}</span>
            <h2 id="profile-title">{doctor.name}</h2>
            <p>{doctor.title}</p>
            <span className="verified"><BadgeCheck size={14} /> გადამოწმებული სპეციალისტი</span>
          </div>
        </div>
        <div className="modal-facts">
          <div><strong>{doctor.experience} წელი</strong><span>გამოცდილება</span></div>
          <div><strong><Star size={15} fill="currentColor" /> {doctor.rating.toFixed(1)}</strong><span>{doctor.reviews} შეფასება</span></div>
          <div><strong>{doctor.fee} ₾</strong><span>კონსულტაცია</span></div>
        </div>
        <div className="modal-info">
          <p><MapPin size={17} /> {doctor.clinic}, {doctor.location}</p>
          <p><CalendarDays size={17} /> უახლოესი თავისუფალი დრო: <b>{doctor.nextAvailable}</b></p>
          <p><Languages size={17} /> ენები: {doctor.languages.join(", ")}</p>
          <p><Clock3 size={17} /> მიღების დღეები: {doctor.availableDays.join(" · ")}</p>
        </div>
        <div className="modal-note">ეს არის დემო-პროფილი. ონლაინ ჩაწერის ფუნქცია პროექტის შემდეგ ეტაპზე შეიძლება დაემატოს.</div>
        <button className="primary-button modal-action" onClick={onClose}>გასაგებია</button>
      </section>
    </div>
  );
}
