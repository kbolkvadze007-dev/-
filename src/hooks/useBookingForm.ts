import { useCallback } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import type { Doctor } from "../types/doctor";

export type BookingValues = {
  patientName: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  reason: string;
};

export type BookingRecord = BookingValues & {
  id: string;
  doctorId: number;
  doctorName: string;
  specialty: string;
  clinic: string;
  fee: number;
  createdAt: string;
};

const weekdayLabels = ["კვი", "ორშ", "სამ", "ოთხ", "ხუთ", "პარ", "შაბ"];

export function isDoctorAvailableOnDate(date: string, doctor: Doctor): boolean {
  if (!date) return false;
  const selectedDate = new Date(`${date}T12:00:00`);
  return doctor.availableDays.includes(weekdayLabels[selectedDate.getDay()]);
}

const validationSchema = (doctor: Doctor) => Yup.object({
  patientName: Yup.string().trim().min(2, "სახელი მინიმუმ 2 სიმბოლოს უნდა შეიცავდეს.").required("შეიყვანე პაციენტის სახელი და გვარი."),
  phone: Yup.string().matches(/^\+?[0-9\s()-]{9,16}$/, "შეიყვანე სწორი ტელეფონის ნომერი.").required("ტელეფონის ნომერი აუცილებელია."),
  email: Yup.string().email("შეიყვანე სწორი ელფოსტა.").required("ელფოსტა აუცილებელია."),
  date: Yup.string().required("აირჩიე ვიზიტის თარიღი.").test("future-date", "აირჩიე დღევანდელი ან მომავალი თარიღი.", (value: string | undefined) => Boolean(value && value >= new Date().toISOString().slice(0, 10))).test("available-day", "ექიმს ამ დღეს მიღება არ აქვს. აირჩიე სხვა დღე.", (value: string | undefined) => Boolean(value && isDoctorAvailableOnDate(value, doctor))),
  time: Yup.string().required("აირჩიე თავისუფალი დრო."),
  reason: Yup.string().max(300, "მიზეზი არ უნდა აღემატებოდეს 300 სიმბოლოს."),
});

export function useBookingForm(doctor: Doctor, onSuccess: (record: BookingRecord) => void) {
  const handleBooking = useCallback((values: BookingValues) => {
    const record: BookingRecord = {
      ...values,
      id: typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `${Date.now()}-${doctor.id}`,
      doctorId: doctor.id,
      doctorName: doctor.name,
      specialty: doctor.specialty,
      clinic: doctor.clinic,
      fee: doctor.fee,
      createdAt: new Date().toISOString(),
    };

    try {
      const saved = localStorage.getItem("medicare-bookings");
      const bookings: BookingRecord[] = saved ? JSON.parse(saved) as BookingRecord[] : [];
      localStorage.setItem("medicare-bookings", JSON.stringify([...bookings, record]));
      onSuccess(record);
    } catch {
      throw new Error("ჩაწერის შენახვა ვერ მოხერხდა. შეამოწმე ბრაუზერის მეხსიერება და სცადე თავიდან.");
    }
  }, [doctor]);

  const formik = useFormik<BookingValues>({
    initialValues: { patientName: "", phone: "", email: "", date: "", time: "", reason: "" },
    validationSchema: validationSchema(doctor),
    onSubmit: (values, helpers) => {
      try {
        handleBooking(values);
        helpers.resetForm();
      } catch (error) {
        helpers.setStatus(error instanceof Error ? error.message : "დაფიქსირდა შეცდომა.");
      }
    },
  });

  return formik;
}
