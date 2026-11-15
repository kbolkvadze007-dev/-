import { useState } from "react";
import { CalendarDays, CheckCircle2, Clock3, X } from "lucide-react";
import type { Doctor } from "../types/doctor";
import { isDoctorAvailableOnDate, useBookingForm } from "../hooks/useBookingForm";
import type { BookingRecord } from "../hooks/useBookingForm";

type Props = { doctor: Doctor | null; onClose: () => void };

const timeSlots = ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30"];
const today = () => new Date().toISOString().slice(0, 10);

export default function BookingModal({ doctor, onClose }: Props) {
  const [confirmation, setConfirmation] = useState<BookingRecord | null>(null);
  if (!doctor) return null;

  return (
    <BookingModalContent doctor={doctor} onClose={onClose} confirmation={confirmation} setConfirmation={setConfirmation} />
  );
}

type ContentProps = {
  doctor: Doctor;
  onClose: () => void;
  confirmation: BookingRecord | null;
  setConfirmation: (record: BookingRecord | null) => void;
};

function BookingModalContent({ doctor, onClose, confirmation, setConfirmation }: ContentProps) {
  const formik = useBookingForm(doctor, setConfirmation);
  const dateError = formik.touched.date && formik.errors.date;
  const timeError = formik.touched.time && formik.errors.time;

  return (
    <div className="booking-backdrop" role="presentation" onMouseDown={event => { if (event.target === event.currentTarget) onClose(); }}>
      <section className="booking-modal" role="dialog" aria-modal="true" aria-labelledby="booking-title">
        <button className="booking-close" onClick={onClose} aria-label="დახურვა"><X size={20} /></button>
        {confirmation ? (
          <div className="booking-success">
            <span className="booking-success-icon"><CheckCircle2 size={34} /></span>
            <span className="booking-eyebrow">MediCare · ონლაინ ჩაწერა</span>
            <h2 id="booking-title">ვიზიტი წარმატებით დაიჯავშნა!</h2>
            <p>მადლობა, {confirmation.patientName}. შენი მოთხოვნა შენახულია ამ ბრაუზერში.</p>
            <div className="booking-summary">
              <strong>{confirmation.doctorName}</strong>
              <span>{confirmation.specialty} · {confirmation.clinic}</span>
              <span><CalendarDays size={15} /> {confirmation.date}</span>
              <span><Clock3 size={15} /> {confirmation.time}</span>
              <b>კონსულტაცია: {confirmation.fee} ₾</b>
            </div>
            <p className="booking-demo-note">ეს არის სასწავლო დემო-ჩაწერა და არ იგზავნება კლინიკის რეალურ სისტემაში.</p>
            <button className="primary-button booking-submit" onClick={onClose}>დახურვა</button>
          </div>
        ) : (
          <>
            <div className="booking-heading">
              <span className="booking-eyebrow">MediCare · ონლაინ ჩაწერა</span>
              <h2 id="booking-title">დაჯავშნე ვიზიტი</h2>
              <p>შეავსე ფორმა და აირჩიე შენთვის მოსახერხებელი დრო.</p>
            </div>
            <div className="booking-doctor">
              <img src={doctor.image} alt={doctor.name} />
              <div><strong>{doctor.name}</strong><span>{doctor.specialty} · {doctor.clinic}</span></div>
              <b>{doctor.fee} ₾</b>
            </div>
            <form onSubmit={formik.handleSubmit} noValidate>
              <div className="booking-fields">
                <label className="booking-field">პაციენტის სახელი და გვარი
                  <input name="patientName" value={formik.values.patientName} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="მაგ. ნინო გიორგაძე" />
                  {formik.touched.patientName && formik.errors.patientName && <small>{formik.errors.patientName}</small>}
                </label>
                <label className="booking-field">ტელეფონის ნომერი
                  <input name="phone" value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="+995 5XX XX XX XX" />
                  {formik.touched.phone && formik.errors.phone && <small>{formik.errors.phone}</small>}
                </label>
                <label className="booking-field booking-field--full">ელფოსტა
                  <input type="email" name="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="name@example.com" />
                  {formik.touched.email && formik.errors.email && <small>{formik.errors.email}</small>}
                </label>
                <label className="booking-field booking-field--full">ვიზიტის თარიღი
                  <input type="date" name="date" min={today()} value={formik.values.date} onChange={event => { formik.handleChange(event); formik.setFieldValue("time", ""); }} onBlur={formik.handleBlur} />
                  {formik.values.date && !isDoctorAvailableOnDate(formik.values.date, doctor) && <small>ექიმის მიღების დღეებია: {doctor.availableDays.join(", ")}</small>}
                  {dateError && <small>{formik.errors.date}</small>}
                </label>
                <div className="booking-field booking-field--full">
                  <span className="booking-label">თავისუფალი დრო</span>
                  <div className="time-slots">
                    {timeSlots.map(slot => <button type="button" key={slot} disabled={!formik.values.date || !isDoctorAvailableOnDate(formik.values.date, doctor)} className={formik.values.time === slot ? "time-slot time-slot--active" : "time-slot"} onClick={() => formik.setFieldValue("time", slot)}>{slot}</button>)}
                  </div>
                  {timeError && <small>{formik.errors.time}</small>}
                </div>
                <label className="booking-field booking-field--full">მიმართვის მიზეზი <span className="booking-optional">(არასავალდებულო)</span>
                  <textarea name="reason" value={formik.values.reason} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="მოკლედ აღწერე ვიზიტის მიზეზი..." rows={3} />
                  {formik.touched.reason && formik.errors.reason && <small>{formik.errors.reason}</small>}
                </label>
              </div>
              {formik.status && <p className="booking-form-error">{formik.status}</p>}
              <button className="primary-button booking-submit" type="submit" disabled={formik.isSubmitting}>ვიზიტის დაჯავშნა <CalendarDays size={17} /></button>
              <p className="booking-footnote">დაჯავშნის დასრულებით ადასტურებ, რომ შეყვანილი მონაცემები სწორია.</p>
            </form>
          </>
        )}
      </section>
    </div>
  );
}
