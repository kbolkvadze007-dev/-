import { useEffect, useState } from "react";
import type { Doctor } from "../types/doctor";

type FetchDoctorsState = {
  doctors: Doctor[];
  loading: boolean;
  error: string | null;
};

export function useFetchDoctors(): FetchDoctorsState {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadDoctors() {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch("/doctors.json", { signal: controller.signal });
        if (!response.ok) throw new Error("ექიმების სიის ჩატვირთვა ვერ მოხერხდა.");
        const data = (await response.json()) as Doctor[];
        setDoctors(data);
      } catch (err) {
        if (err instanceof Error && err.name !== "AbortError") {
          setError(err.message || "დაფიქსირდა მოულოდნელი შეცდომა.");
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    loadDoctors();
    return () => controller.abort();
  }, []);

  return { doctors, loading, error };
}
