export const MONTHS = [
  "january", "february", "march", "april", "may", "june",
  "july", "august", "september", "october", "november", "december",
] as const;

export type MonthSlug = (typeof MONTHS)[number];

const MONTH_LABELS: Record<MonthSlug, string> = {
  january: "January", february: "February", march: "March",
  april: "April", may: "May", june: "June",
  july: "July", august: "August", september: "September",
  october: "October", november: "November", december: "December",
};

// All month-year slugs from June 2026 through December 2027
export function getAllMonthYearSlugs(): string[] {
  const slugs: string[] = [];
  for (let m = 5; m < 12; m++) slugs.push(`${MONTHS[m]}-2026`);   // Jun-Dec 2026
  for (let m = 0; m < 12; m++) slugs.push(`${MONTHS[m]}-2027`);   // Jan-Dec 2027
  return slugs;
}

export type ParsedMonthYear = {
  month: MonthSlug;
  year: number;
  label: string;        // "June 2026"
  shortLabel: string;   // "Jun '26"
  slug: string;         // "june-2026"
};

export function parseMonthYear(slug: string): ParsedMonthYear | null {
  const parts = slug.split("-");
  if (parts.length !== 2) return null;
  const [monthStr, yearStr] = parts;
  const year = parseInt(yearStr, 10);
  if (isNaN(year) || year < 2020 || year > 2030) return null;
  if (!(MONTHS as readonly string[]).includes(monthStr)) return null;
  const month = monthStr as MonthSlug;
  const label = `${MONTH_LABELS[month]} ${year}`;
  const shortLabel = `${MONTH_LABELS[month].slice(0, 3)} '${String(year).slice(2)}`;
  return { month, year, label, shortLabel, slug };
}

export function isMonthYear(slug: string): boolean {
  return parseMonthYear(slug) !== null;
}

export function adjacentMonths(slug: string): { prev: string | null; next: string | null } {
  const all = getAllMonthYearSlugs();
  const idx = all.indexOf(slug);
  return {
    prev: idx > 0 ? all[idx - 1] : null,
    next: idx >= 0 && idx < all.length - 1 ? all[idx + 1] : null,
  };
}

// Returns the current month-year slug (e.g. "june-2026")
export function currentMonthSlug(): string {
  const now = new Date();
  return `${MONTHS[now.getMonth()]}-${now.getFullYear()}`;
}

// Season for a given month (for contextual copy variation)
export type Season = "summer" | "winter" | "spring" | "autumn";
export function getSeason(month: MonthSlug, hemisphere: "north" | "south" = "north"): Season {
  const idx = MONTHS.indexOf(month);
  const northSeason: Season[] = [
    "winter", "winter", "spring", "spring", "spring",
    "summer", "summer", "summer", "autumn", "autumn", "autumn", "winter",
  ];
  const season = northSeason[idx];
  if (hemisphere === "south") {
    const flip: Record<Season, Season> = { summer: "winter", winter: "summer", spring: "autumn", autumn: "spring" };
    return flip[season];
  }
  return season;
}
