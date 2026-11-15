# MediCare — ექიმების დირექტორია

სასწავლო პროექტი: **სცენარი 4 — ტელემედიცინისა და კლინიკის მართვის პორტალი**  
**ინდივიდუალური დავალება: სტუდენტი 1 — ექიმების დირექტორია და განრიგის ფილტრაცია.**

## პროექტის მიმოხილვა
MediCare არის რესპონსიული React აპლიკაცია, რომლის მთავარი მიზანია მომხმარებელს დაეხმაროს ექიმების მოძიებაში და მათი პროფილების შედარებაში. დირექტორია მოიცავს სპეციალობის, საძიებო სიტყვისა და მიღების დღის მიხედვით ფილტრაციას, შედეგების დალაგებას და ექიმის დეტალური პროფილის ნახვას.

## შესრულებული ფუნქციონალი
- ექიმების მონაცემების ასინქრონული წამოღება `fetch` + `async/await`-ით `public/doctors.json` ფაილიდან.
- TypeScript `Doctor` და `Specialty` ტიპები.
- `useFetchDoctors` Custom Hook ჩატვირთვისა და შეცდომის მდგომარეობებით.
- `useMemo` საძიებო/ფილტრაციისა და დალაგების შედეგების ოპტიმიზაციისთვის.
- `DoctorDirectory` მშობელი კომპონენტი და `DoctorCard` შვილობილი კომპონენტი.
- ფილტრაცია სპეციალობით, ექიმის/კლინიკის სახელით და მიღების დღით.
- დალაგება რეკომენდაციით, შეფასებით, გამოცდილებითა და ფასით.
- ექიმის დეტალური პროფილის Modal.
- ცარიელი შედეგის, ჩატვირთვისა და შეცდომის მდგომარეობები.
- Responsive დიზაინი მობილურის, ტაბლეტისა და დესკტოპისთვის.

## ტექნოლოგიური სტეკი
- React 18 + Vite
- TypeScript
- Tailwind CSS
- Sass / SCSS
- Lucide React Icons
- React Hooks (`useState`, `useEffect`, `useMemo`)
- Fetch API

## პროექტის გაშვება
```bash
npm install
npm run dev
```
ტერმინალში გამოჩნდება ლოკალური მისამართი, ჩვეულებრივ `http://localhost:5173`.

Production build:
```bash
npm run build
```

ტიპების შემოწმება:
```bash
npm run typecheck
```

## საქაღალდეების სტრუქტურა
```text
clinic-portal-scenario4-student1/
├── public/
│   └── doctors.json
├── src/
│   ├── components/
│   │   ├── DoctorCard.tsx
│   │   ├── DoctorDirectory.tsx
│   │   └── DoctorProfileModal.tsx
│   ├── hooks/
│   │   └── useFetchDoctors.ts
│   ├── styles/
│   │   ├── index.scss
│   │   └── theme.scss
│   ├── types/
│   │   └── doctor.ts
│   ├── App.tsx
│   └── main.tsx
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── tsconfig*.json
└── vite.config.ts
```

## დავალებასთან შესაბამისობა
| მოთხოვნა | რეალიზაცია |
|---|---|
| TypeScript type/interface | `src/types/doctor.ts` |
| useMemo ფილტრაციისთვის | `DoctorDirectory.tsx` |
| Tailwind CSS | `tailwind.config.js`, `index.scss` |
| Custom Hook `useFetchDoctors` | `src/hooks/useFetchDoctors.ts` |
| DoctorDirectory | `src/components/DoctorDirectory.tsx` |
| DoctorCard | `src/components/DoctorCard.tsx` |
| ექიმების სია და სპეციალობებით ფილტრაცია | საძიებო ველი + სპეციალობის ჩიპები |
| განრიგის ფილტრაცია | მიღების დღის ფილტრი |

## მნიშვნელოვანი შენიშვნა
პროექტში გამოყენებულია დემო ექიმები და სატესტო პროფილის მონაცემები. კლინიკების სახელები, რეიტინგები, ფასები და განრიგი რეალურ სამედიცინო შეთავაზებად არ უნდა ჩაითვალოს. რეალურ სერვისად გამოსაყენებლად საჭიროა backend/API და მონაცემების გადამოწმება.

## ონლაინ ჩაწერის ფუნქცია (Student 2)

ექიმის პროფილიდან შესაძლებელია ონლაინ ვიზიტის დაჯავშნის ფორმის გახსნა. ფორმა მოიცავს პაციენტის მონაცემებს, თარიღის არჩევას, ექიმის სამუშაო დღეების შემოწმებას, დროის სლოტებსა და მიმართვის მიზეზს.

- `src/components/BookingModal.tsx` — დაჯავშნის მოდალი და წარმატების შეტყობინება.
- `src/hooks/useBookingForm.ts` — Formik-ზე დაფუძნებული Custom Hook, Yup ვალიდაცია და `useCallback`-ით დამუშავებული დაჯავშნა.
- დაჯავშნილი ჩანაწერები ინახება ბრაუზერის `localStorage`-ში (`medicare-bookings`).

ეს არის სასწავლო დემო ფუნქცია: ჩანაწერი ინახება მხოლოდ მიმდინარე ბრაუზერში და კლინიკის რეალურ სერვერზე არ იგზავნება.

### გაშვება

```bash
npm install
npm run dev
```

Formik და Yup დამატებულია `package.json`-ში; `npm install` ჩამოტვირთავს მათ და შექმნის შესაბამის lock ფაილს.
