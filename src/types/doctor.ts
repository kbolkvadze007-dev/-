export type Specialty =
  | "კარდიოლოგია"
  | "ნევროლოგია"
  | "პედიატრია"
  | "დერმატოლოგია"
  | "გინეკოლოგია"
  | "ორთოპედია"
  | "ოფთალმოლოგია"
  | "სტომატოლოგია";

export type Doctor = {
  id: number;
  name: string;
  specialty: Specialty;
  title: string;
  experience: number;
  rating: number;
  reviews: number;
  clinic: string;
  location: string;
  languages: string[];
  availableDays: string[];
  nextAvailable: string;
  fee: number;
  image: string;
  featured?: boolean;
  verified: boolean;
};
