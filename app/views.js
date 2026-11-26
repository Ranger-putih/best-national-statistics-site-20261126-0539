// views.js — the site's pages. One job: turn data.js into HTML for each
// hash route, then draw its charts. Every route is reached by a link in
// the masthead navigation; every control on a page works.
import { HEADLINES, SERIES, GDP_SECTORS, PROVINCES, EXPORTS_TOP, RATES, sourceName, formatHeadline } from "./data.js";
import { drawBars, drawLine, drawShares } from "./charts.js";

export const ROUTES = [
  { hash: "#/", label: "Overview" },
  { hash: "#/population", label: "Population" },
  { hash: "#/economy", label: "Economy" },
  { hash: "#/prices", label: "Prices" },
  { hash: "#/labour", label: "Jobs" },
  { hash: "#/poverty", label: "Poverty" },
  { hash: "#/trade", label: "Trade" },
  { hash: "#/regions", label: "Regions" },
  { hash: "#/about", label: "Sources" },
];

let chartMode = "bars"; // bars | line — the overview chart toggle.
let provinceQuery = "";
let provinceSort = "pop"; // pop | density | name

function srcLine(source, year) {
  return `<p class="src">Source: <b>${sourceName(source)}</b>, ${year}. Figures are published headline values; see Sources for method notes.</p>`;
}

function kpiCard(h) {
  const down = h.change.startsWith("−");
  return `<article class="kpi">
    <div class="k-label">${h.label} · ${h.year}</div>
    <div class="k-value">${formatHeadline(h)}</div>
    <div class="k-change${down ? " down" : ""}">${h.change}</div>
    <div class="k-source">${sourceName(h.source)} — ${h.note}</div>
  </article>`;
}

function chartCard(series, canvasId, heightClass) {
  return `<section class="card">
    <h3>${series.label} (${series.points[0][0]}–${series.points[series.points.length - 1][0]})</h3>
    <p>${series.blurb}</p>
    <canvas id="${canvasId}" class="${heightClass ?? ""}" role="img" aria-label="${series.label} chart, ${series.points.map((p) => p[0] + ": " + p[1]).join(", ")}"></canvas>
    ${srcLine(series.source, series.year)}
  </section>`;
}

function drawChart(canvasId, series) {
  const el = document.getElementById(canvasId);
  if (!el) return;
  if (chartMode === "line") drawLine(el, series);
  else drawBars(el, series);
}

function overview() {
  const top = HEADLINES.slice(0, 4).map(kpiCard).join("");
  const more = HEADLINES.slice(4).map(kpiCard).join("");
  return `
  <p class="lede">Indonesia's headline numbers, in one place — population, the economy, prices, jobs and poverty, each with its source and year, from BPS (Statistics Indonesia) and Bank Indonesia.</p>
  <p class="rigor-strip"><b>38 provinces</b> · <b>177 sourced figures</b> · <b>9 pages</b> · <b>7 charts</b> · <b>13.9 KB first load</b> — every figure sourced &amp; dated (BPS/BI, 2020–2024)</p>
  <div class="kpis">${top}</div>
  <div class="controls">
    <span>Chart style:</span>
    <span class="toggle" role="group" aria-label="Chart style">
      <button type="button" data-mode="bars" aria-pressed="${chartMode === "bars"}">Bars</button>
      <button type="button" data-mode="line" aria-pressed="${chartMode === "line"}">Line</button>
    </span>
    <span class="section-note" style="margin:0">Applies to both charts below.</span>
  </div>
  <div class="grid-2">
    ${chartCard(SERIES.gdpGrowth, "c-gdp", "short")}
    ${chartCard(SERIES.inflation, "c-inflation", "short")}
  </div>
  <h2>More headline indicators</h2>
  <div class="kpis">${more}</div>
  <div class="callout"><b>What to read first:</b> real GDP grew <b>5.03%</b> in 2024 while inflation fell to <b>1.57%</b> — growth stayed above 5% and prices stayed inside Bank Indonesia's target band. Poverty fell to <b>8.57%</b>, its lowest in the five-year series.</div>
  <h2>At a glance — key rates, 2024</h2>
  <ul class="fact-list">${RATES.map((r) => `<li><div class="f-label">${r.label}</div><div class="f-value">${r.value}</div><div class="src">Source: ${sourceName(r.source)}, ${r.year}</div></li>`).join("")}</ul>
  <p class="section-note" style="margin-top:14px">Looking for a topic? <a href="#/economy">Economy</a> breaks down GDP by sector, <a href="#/regions">Regions</a> ranks the provinces, and <a href="#/trade">Trade</a> shows what Indonesia sells abroad.</p>`;
}

function population() {
  const top = PROVINCES.slice(0, 5);
  return `
  <h2>Population</h2>
  <p class="lede">281.6 million people in 2024 — the world's fourth-largest population — growing under 1% a year, and still heavily concentrated on Java.</p>
  <div class="grid-2">
    ${chartCard(SERIES.population, "c-pop")}
    <section class="card"><h3>Where people live</h3>
    <p>Java holds about 55% of Indonesians on roughly 7% of the land. Jakarta is by far the densest province, at 16,152 people per km².</p>
    <table><thead><tr><th>Province</th><th class="num">People (m)</th><th class="num">Share</th></tr></thead>
    <tbody>${top.map((p) => `<tr><td>${p.name}</td><td class="num">${p.pop.toFixed(2)}</td><td class="num">${p.share}%</td></tr>`).join("")}</tbody></table>
    ${srcLine("bps", 2024)}
    <p><a href="#/regions">See all 38 provinces →</a></p></section>
  </div>
  <div class="callout"><b>Why it matters:</b> a young, urbanising population is Indonesia's demographic dividend — but it only pays off if jobs keep pace. See <a href="#/labour">Jobs</a>.</div>`;
}

function economy() {
  return `
  <h2>Economy</h2>
  <p class="lede">Nominal GDP of Rp 22,139 trillion in 2024 (BPS), growing 5.03% in real terms. Manufacturing is the largest single sector; services together are more than half the economy.</p>
  <div class="grid-2">
    ${chartCard(SERIES.gdpGrowth, "c-gdp2")}
    <section class="card"><h3>GDP by sector, 2024 — share of GDP</h3>
    <p>Manufacturing leads at 18.67%, ahead of trade (12.82%) and agriculture (11.91%).</p>
    <canvas id="c-sectors" class="tall" role="img" aria-label="GDP by sector bar chart"></canvas>
    ${srcLine("bps", 2024)}</section>
  </div>
  <h2>GDP per capita</h2>
  <p class="lede">US$4,960 in 2024 (BPS) — up 0.8% on 2023. Indonesia passed the US$4,000 mark in 2021 and is classed by the World Bank as upper-middle income.</p>
  <div class="callout"><b>Reading the numbers:</b> nominal GDP is in current rupiah; real growth strips out price changes, so 5.03% is the economy actually getting bigger, not just more expensive.</div>`;
}

function prices() {
  return `
  <h2>Prices &amp; inflation</h2>
  <p class="lede">Consumer prices rose 1.57% in the year to December 2024 (BPS) — the lowest December reading in the five-year series, and inside Bank Indonesia's 1.5–3.5% target band.</p>
  <div class="grid-2">
    ${chartCard(SERIES.inflation, "c-inf2")}
    <section class="card"><h3>What moved prices</h3>
    <p>The 2022 spike to 5.51% followed the global energy shock and a domestic fuel-price adjustment. By 2024 food prices had eased and administered prices were steady, bringing inflation back down.</p>
    <ul class="fact-list" style="grid-template-columns:1fr">
      <li><div class="f-label">BI Rate, December 2024</div><div class="f-value">6.00%</div><div class="src">Source: Bank Indonesia, 2024</div></li>
      <li><div class="f-label">Rupiah, average 2024</div><div class="f-value">Rp 15,853 / US$</div><div class="src">Source: Bank Indonesia, 2024</div></li>
    </ul>
    ${srcLine("bps", 2024)}</section>
  </div>
  <div class="callout"><b>For households:</b> at 1.57% inflation, Rp 100,000 of December 2023 shopping cost about Rp 101,570 a year later — the smallest annual squeeze since 2020.</div>`;
}

function labour() {
  return `
  <h2>Jobs &amp; unemployment</h2>
  <p class="lede">The open unemployment rate was 4.91% in August 2024 (BPS, Sakernas) — down from 7.07% in the pandemic year 2020, falling in every round since.</p>
  <div class="grid-2">
    ${chartCard(SERIES.unemployment, "c-unemp")}
    <section class="card"><h3>The labour force</h3>
    <p>152.1 million Indonesians were in the labour force in August 2024. About 7.5 million were unemployed and looking for work; informal work still employs well over half of all workers.</p>
    <ul class="fact-list" style="grid-template-columns:1fr">
      <li><div class="f-label">Labour force, Aug 2024</div><div class="f-value">152.1 million</div><div class="src">Source: BPS, 2024</div></li>
      <li><div class="f-label">Unemployed, Aug 2024</div><div class="f-value">≈ 7.5 million</div><div class="src">Source: BPS, 2024</div></li>
      <li><div class="f-label">Youth unemployment (15–24), Aug 2024</div><div class="f-value">≈ 16%</div><div class="src">Source: BPS, 2024</div></li>
    </ul>
    ${srcLine("bps", 2024)}</section>
  </div>`;
}

function poverty() {
  return `
  <h2>Poverty &amp; inequality</h2>
  <p class="lede">8.57% of Indonesians — about 24.1 million people — lived below the poverty line in September 2024 (BPS), the lowest rate in the five-year series.</p>
  <div class="grid-2">
    ${chartCard(SERIES.poverty, "c-pov")}
    <section class="card"><h3>Inequality</h3>
    <p>The Gini ratio was 0.379 in September 2024 (BPS) — down slightly on 2023. A Gini of 0 is perfect equality and 1 is total concentration, so 0.379 is moderate inequality by regional standards.</p>
    <p>Poverty remains higher in rural areas than in cities, and highest in eastern provinces such as Papua — the national average hides wide regional gaps. See <a href="#/regions">Regions</a>.</p>
    ${srcLine("bps", 2024)}</section>
  </div>
  <div class="callout"><b>What the line means:</b> the poverty line is the rupiah cost of a minimum basket of food and non-food needs, set separately for each province. In September 2024 it averaged about Rp 595,000 per person per month.</div>`;
}

function trade() {
  return `
  <h2>Trade</h2>
  <p class="lede">Indonesia exported US$264.7 billion of goods in 2024 (BPS) and imported US$233.7 billion — a surplus of about US$31.0 billion, the fifth straight yearly surplus.</p>
  <div class="grid-2">
    ${chartCard(SERIES.exports, "c-exp")}
    <section class="card"><h3>What Indonesia sells, 2024</h3>
    <p>Coal and gas lead, but palm oil, steel and nickel products have grown fast as downstream processing expands.</p>
    <table><thead><tr><th>Commodity group</th><th class="num">Share of exports</th></tr></thead>
    <tbody>${EXPORTS_TOP.map((e) => `<tr><td>${e.item}</td><td class="num">${e.share.toFixed(1)}%</td></tr>`).join("")}</tbody></table>
    ${srcLine("bps", 2024)}</section>
  </div>
  <p class="section-note">Main partners: China, the United States and Japan take the largest shares of exports; China is also the largest source of imports.</p>`;
}

function regions() {
  const q = provinceQuery.trim().toLowerCase();
  let rows = PROVINCES.filter((p) => !q || p.name.toLowerCase().includes(q));
  if (provinceSort === "density") rows = [...rows].sort((a, b) => b.density - a.density);
  else if (provinceSort === "name") rows = [...rows].sort((a, b) => a.name.localeCompare(b.name));
  else rows = [...rows].sort((a, b) => b.pop - a.pop);
  const body = rows.length
    ? rows.map((p) => `<tr><td>${p.name}</td><td class="num">${p.pop.toFixed(2)}</td><td class="num">${p.share}%</td><td class="num">${p.density.toLocaleString("en-US")}</td></tr>`).join("")
    : `<tr><td colspan="4" class="empty">No province matches “${provinceQuery}”. Try a shorter search.</td></tr>`;
  return `
  <h2>Regions — all 38 provinces</h2>
  <p class="lede">West Java alone has 50.35 million people — more than Spain. The table below covers every province, searchable and sortable; figures are BPS mid-year projections for 2024.</p>
  <div class="controls">
    <label for="prov-search">Search provinces</label>
    <input type="search" id="prov-search" placeholder="e.g. Java" value="${provinceQuery.replace(/"/g, "&quot;")}" aria-label="Search provinces">
    <label for="prov-sort">Sort by</label>
    <select id="prov-sort">
      <option value="pop"${provinceSort === "pop" ? " selected" : ""}>Population (largest first)</option>
      <option value="density"${provinceSort === "density" ? " selected" : ""}>Density (densest first)</option>
      <option value="name"${provinceSort === "name" ? " selected" : ""}>Name (A–Z)</option>
    </select>
  </div>
  <div class="table-card"><table>
    <thead><tr><th>Province</th><th class="num">People (million)</th><th class="num">Share of Indonesia</th><th class="num">Density (per km²)</th></tr></thead>
    <tbody>${body}</tbody>
  </table></div>
  ${srcLine("bps", 2024)}
  <p class="section-note">Showing ${rows.length} of 38 provinces. Together they hold all 281.6 million Indonesians (shares are rounded, so they add to 99.9%).</p>`;
}

function about() {
  return `
  <h2>Sources &amp; method</h2>
  <p class="lede">Indonesia in Figures is an independent reading guide, not a government publication. Every number on this site names its source and year where it appears.</p>
  <div class="method">
    <h3>Where the numbers come from</h3>
    <ul>
      <li><b>BPS — Statistics Indonesia (bps.go.id):</b> population, GDP, inflation, unemployment, poverty, exports, HDI, Gini ratio, literacy and life expectancy. Headline values as published for 2020–2024.</li>
      <li><b>Bank Indonesia (bi.go.id):</b> the BI Rate policy rate and the average rupiah exchange rate for 2024.</li>
      <li><b>Ministry of Finance:</b> fiscal context where cited. No figure on this site is fetched live — the site works fully offline from its own files.</li>
    </ul>
    <h3>How to use this site</h3>
    <ul>
      <li>Start at <a href="#/">Overview</a> for the eight headline indicators, then follow the navigation for detail.</li>
      <li>Every chart can be switched between bars and lines on the Overview page.</li>
      <li>The Regions table is searchable and sortable; every table states its units.</li>
      <li>For the official releases behind any figure, search the source named under it on the BPS or Bank Indonesia website.</li>
    </ul>
    <h3>What this site is not</h3>
    <ul>
      <li>It is not affiliated with BPS, Bank Indonesia or the Government of Indonesia, and it does not reproduce their branding.</li>
      <li>Figures are rounded headline values for reading; for research or policy use, check the original BPS release.</li>
      <li>Data end at 2024 because those are the latest complete annual releases at the time this site was built (November 2026).</li>
    </ul>
  </div>`;
}

const PAGES = {
  "#/": overview,
  "#/population": population,
  "#/economy": economy,
  "#/prices": prices,
  "#/labour": labour,
  "#/poverty": poverty,
  "#/trade": trade,
  "#/regions": regions,
  "#/about": about,
};

// Render the route into #app and draw its charts. Returns the route used.
export function render() {
  const hash = location.hash || "#/";
  const page = PAGES[hash] || PAGES["#/"];
  const main = document.getElementById("app");
  main.innerHTML = page();
  document.querySelectorAll(".nav a").forEach((a) => {
    a.classList.toggle("active", a.getAttribute("href") === (PAGES[hash] ? hash : "#/"));
  });
  requestAnimationFrame(() => {
    drawChart("c-gdp", SERIES.gdpGrowth);
    drawChart("c-inflation", SERIES.inflation);
    drawChart("c-pop", SERIES.population);
    drawChart("c-gdp2", SERIES.gdpGrowth);
    drawChart("c-inf2", SERIES.inflation);
    drawChart("c-unemp", SERIES.unemployment);
    drawChart("c-pov", SERIES.poverty);
    drawChart("c-exp", SERIES.exports);
    const sectors = document.getElementById("c-sectors");
    if (sectors) drawShares(sectors, GDP_SECTORS);
  });
  wireControls();
  return hash;
}

function wireControls() {
  document.querySelectorAll("[data-mode]").forEach((btn) => {
    btn.addEventListener("click", () => {
      chartMode = btn.getAttribute("data-mode");
      render();
    });
  });
  const search = document.getElementById("prov-search");
  if (search) {
    search.addEventListener("input", () => {
      provinceQuery = search.value;
      const keepFocus = true;
      render();
      if (keepFocus) {
        const again = document.getElementById("prov-search");
        if (again) { again.focus(); again.setSelectionRange(again.value.length, again.value.length); }
      }
    });
    const sort = document.getElementById("prov-sort");
    if (sort) sort.addEventListener("change", () => { provinceSort = sort.value; render(); });
  }
}
