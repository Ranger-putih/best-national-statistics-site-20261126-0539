// Indonesia in Figures — the numbers behind the site.
// Every figure carries its source and year. Figures are the published
// headline values of Statistics Indonesia (BPS) and Bank Indonesia;
// they are snapshots for reading, not a live feed. Units are stated
// next to every number on the page that shows it.
export const SOURCES = {
  bps: "BPS — Statistics Indonesia",
  bi: "Bank Indonesia",
  kemenkeu: "Ministry of Finance, Indonesia",
};

// Headline indicators shown on the overview dashboard.
export const HEADLINES = [
  { id: "population", label: "Population", value: 281.6, unit: "million", year: 2024, change: "+1.0% on 2023", source: "bps", note: "Mid-year projection from the 2020 Census base." },
  { id: "gdp", label: "GDP (nominal)", value: 22139, unit: "Rp trillion", year: 2024, change: "+5.03% real growth", source: "bps", note: "Gross domestic product at current prices." },
  { id: "gdpCapita", label: "GDP per capita", value: 4960, unit: "US$", year: 2024, change: "+0.8% on 2023", source: "bps", note: "Nominal GDP divided by mid-year population." },
  { id: "inflation", label: "Inflation (Dec, y-on-y)", value: 1.57, unit: "%", year: 2024, change: "−1.04 pts on 2023", source: "bps", note: "Consumer Price Index, December year-on-year." },
  { id: "unemployment", label: "Unemployment rate", value: 4.91, unit: "%", year: 2024, change: "−0.54 pts on 2023", source: "bps", note: "Open unemployment, August Sakernas round." },
  { id: "poverty", label: "Poverty rate", value: 8.57, unit: "%", year: 2024, change: "−0.79 pts on 2023", source: "bps", note: "Share below the poverty line, September." },
  { id: "exports", label: "Exports", value: 264.7, unit: "US$ billion", year: 2024, change: "+2.3% on 2023", source: "bps", note: "Merchandise exports, free on board." },
  { id: "hdi", label: "Human Development Index", value: 75.02, unit: "points", year: 2024, change: "+0.63 pts on 2023", source: "bps", note: "Composite of health, education and living standards." },
];

// Five-year series. Each series: { label, unit, source, year, points: [[year, value], ...] }
export const SERIES = {
  gdpGrowth: {
    label: "Real GDP growth", unit: "% per year", source: "bps", year: 2024,
    blurb: "Indonesia grew every year after the 2020 contraction, settling just above 5% — the pace the government targets for a middle-income economy of this size.",
    points: [[2020, -2.07], [2021, 3.7], [2022, 5.31], [2023, 5.05], [2024, 5.03]],
  },
  inflation: {
    label: "Inflation, December year-on-year", unit: "%", source: "bps", year: 2024,
    blurb: "Inflation spiked with global energy prices in 2022, then fell back inside Bank Indonesia's 1.5–3.5% target band by 2024.",
    points: [[2020, 1.68], [2021, 1.87], [2022, 5.51], [2023, 2.61], [2024, 1.57]],
  },
  unemployment: {
    label: "Open unemployment rate", unit: "% of labour force", source: "bps", year: 2024,
    blurb: "Unemployment peaked at 7.07% in the pandemic year and has fallen every August round since, to 4.91% in 2024.",
    points: [[2020, 7.07], [2021, 6.49], [2022, 5.86], [2023, 5.45], [2024, 4.91]],
  },
  poverty: {
    label: "Poverty rate", unit: "% of population", source: "bps", year: 2024,
    blurb: "The poverty rate fell in every September round of the last five years, from 9.78% in 2020 to 8.57% in 2024 — about 24.1 million people still below the line.",
    points: [[2020, 9.78], [2021, 9.71], [2022, 9.57], [2023, 9.36], [2024, 8.57]],
  },
  exports: {
    label: "Merchandise exports", unit: "US$ billion", source: "bps", year: 2024,
    blurb: "Exports jumped with the commodity boom in 2021–2022, eased in 2023, and recovered to US$264.7 billion in 2024 against US$233.7 billion of imports.",
    points: [[2020, 163.19], [2021, 231.61], [2022, 291.9], [2023, 258.82], [2024, 264.7]],
  },
  population: {
    label: "Population", unit: "million", source: "bps", year: 2024,
    blurb: "Population growth has slowed to under 1% a year. Java still holds about 55% of all Indonesians on about 7% of the land.",
    points: [[2020, 270.2], [2021, 272.68], [2022, 275.77], [2023, 278.69], [2024, 281.6]],
  },
};

// GDP by sector, 2024, share of nominal GDP (BPS).
export const GDP_SECTORS = [
  { sector: "Manufacturing", share: 18.67, source: "bps", year: 2024 },
  { sector: "Wholesale & retail trade", share: 12.82, source: "bps", year: 2024 },
  { sector: "Agriculture, forestry & fishing", share: 11.91, source: "bps", year: 2024 },
  { sector: "Construction", share: 9.55, source: "bps", year: 2024 },
  { sector: "Mining & quarrying", share: 8.48, source: "bps", year: 2024 },
  { sector: "Transportation & storage", share: 5.37, source: "bps", year: 2024 },
  { sector: "Information & communication", share: 4.25, source: "bps", year: 2024 },
  { sector: "Financial & insurance", share: 4.11, source: "bps", year: 2024 },
  { sector: "Other services", share: 24.84, source: "bps", year: 2024 },
];

// All 38 provinces, 2024 mid-year projection (BPS). Population in
// millions, share of the national 281.6 million, density in people
// per km² (population ÷ land area, BIG/Wikipedia areas; the six Papua
// provinces use the densities published in Indonesia Education
// Statistics 2024/2025, Table 3, sourced from BPS). The four new
// Papua provinces split from the old Papua and West Papua totals,
// which is why those two old totals do not appear: their parts sum
// back to them (West Papua 0.58 + Southwest Papua 0.63 = 1.21;
// Papua 1.06 + South Papua 0.54 + Central Papua 1.47 +
// Highland Papua 1.47 = 4.54).
export const PROVINCES = [
  { name: "West Java", pop: 50.35, share: 17.9, density: 1359 },
  { name: "East Java", pop: 41.81, share: 14.8, density: 870 },
  { name: "Central Java", pop: 37.89, share: 13.5, density: 1103 },
  { name: "North Sumatra", pop: 15.59, share: 5.5, density: 215 },
  { name: "Banten", pop: 12.43, share: 4.4, density: 1329 },
  { name: "Jakarta", pop: 10.68, share: 3.8, density: 16152 },
  { name: "South Sulawesi", pop: 9.46, share: 3.4, density: 209 },
  { name: "Lampung", pop: 9.42, share: 3.3, density: 281 },
  { name: "South Sumatra", pop: 8.84, share: 3.1, density: 102 },
  { name: "Riau", pop: 6.73, share: 2.4, density: 75 },
  { name: "West Sumatra", pop: 5.84, share: 2.1, density: 139 },
  { name: "West Kalimantan", pop: 5.70, share: 2.0, density: 39 },
  { name: "East Nusa Tenggara", pop: 5.66, share: 2.0, density: 122 },
  { name: "West Nusa Tenggara", pop: 5.65, share: 2.0, density: 288 },
  { name: "Aceh", pop: 5.55, share: 2.0, density: 98 },
  { name: "Bali", pop: 4.43, share: 1.6, density: 794 },
  { name: "South Kalimantan", pop: 4.27, share: 1.5, density: 115 },
  { name: "East Kalimantan", pop: 4.05, share: 1.4, density: 32 },
  { name: "Yogyakarta", pop: 3.76, share: 1.3, density: 1186 },
  { name: "Jambi", pop: 3.72, share: 1.3, density: 76 },
  { name: "Central Sulawesi", pop: 3.12, share: 1.1, density: 51 },
  { name: "Central Kalimantan", pop: 2.81, share: 1.0, density: 18 },
  { name: "Southeast Sulawesi", pop: 2.79, share: 1.0, density: 77 },
  { name: "North Sulawesi", pop: 2.70, share: 1.0, density: 186 },
  { name: "Riau Islands", pop: 2.18, share: 0.8, density: 267 },
  { name: "Bengkulu", pop: 2.11, share: 0.8, density: 105 },
  { name: "Maluku", pop: 1.95, share: 0.7, density: 42 },
  { name: "Bangka Belitung Islands", pop: 1.53, share: 0.5, density: 92 },
  { name: "West Sulawesi", pop: 1.50, share: 0.5, density: 91 },
  { name: "Central Papua", pop: 1.47, share: 0.5, density: 24 },
  { name: "Highland Papua", pop: 1.47, share: 0.5, density: 29 },
  { name: "North Maluku", pop: 1.36, share: 0.5, density: 43 },
  { name: "Gorontalo", pop: 1.23, share: 0.4, density: 102 },
  { name: "Papua", pop: 1.06, share: 0.4, density: 13 },
  { name: "North Kalimantan", pop: 0.74, share: 0.3, density: 11 },
  { name: "Southwest Papua", pop: 0.63, share: 0.2, density: 16 },
  { name: "West Papua", pop: 0.58, share: 0.2, density: 10 },
  { name: "South Papua", pop: 0.54, share: 0.2, density: 5 },
];

// Top export commodities, 2024 (BPS, share of total exports).
export const EXPORTS_TOP = [
  { item: "Mineral fuels (coal, gas, oil)", share: 19.8 },
  { item: "Animal & vegetable fats and oils (palm oil)", share: 13.1 },
  { item: "Iron and steel", share: 9.6 },
  { item: "Electrical machinery & equipment", share: 6.2 },
  { item: "Vehicles and parts", share: 4.4 },
  { item: "Ores, slag and ash (nickel ore)", share: 3.4 },
  { item: "Rubber and articles thereof", share: 2.9 },
  { item: "Footwear", share: 2.6 },
];

// Key rates, 2024 (Bank Indonesia / BPS).
export const RATES = [
  { label: "BI Rate (policy rate, Dec 2024)", value: "6.00%", source: "bi", year: 2024 },
  { label: "Rupiah vs US$ (average 2024)", value: "Rp 15,853", source: "bi", year: 2024 },
  { label: "Gini ratio (Sep 2024)", value: "0.379", source: "bps", year: 2024 },
  { label: "Labour force (Aug 2024)", value: "152.1 million", source: "bps", year: 2024 },
  { label: "Life expectancy at birth (2024)", value: "74.0 years", source: "bps", year: 2024 },
  { label: "Literacy rate, age 15+ (2024)", value: "96.6%", source: "bps", year: 2024 },
  { label: "Internet users (2024)", value: "221.6 million", source: "bps", year: 2024 },
  { label: "Foreign visitors (2024)", value: "13.9 million", source: "bps", year: 2024 },
];

export function sourceName(key) {
  return SOURCES[key] ?? key;
}

// Format a headline value the way the site shows it.
export function formatHeadline(h) {
  if (h.id === "gdp") return "Rp " + h.value.toLocaleString("en-US") + " tn";
  if (h.id === "gdpCapita") return "US$" + h.value.toLocaleString("en-US");
  if (h.id === "exports") return "US$" + h.value + " bn";
  if (h.id === "population") return h.value + " m";
  return h.value + (h.unit === "%" ? "%" : " " + h.unit);
}
