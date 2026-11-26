// charts.js — small canvas charts, no library. One job: draw a labelled
// bar chart or line chart from a SERIES entry, with axes and values,
// sized to its canvas element. Colours come from the site palette.
const INK = "#14312b";
const MUTED = "#5c6f68";
const TEAL = "#0e7c66";
const AMBER = "#c98a1b";
const GRID = "#dfe7e2";
const BAR = "#0e7c66";
const BAR_HI = "#e0a32e";

function setupCanvas(canvas) {
  const ratio = window.devicePixelRatio || 1;
  const w = canvas.clientWidth;
  const h = canvas.clientHeight;
  canvas.width = Math.round(w * ratio);
  canvas.height = Math.round(h * ratio);
  const ctx = canvas.getContext("2d");
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  return { ctx, w, h };
}

function axes(ctx, w, h, min, max, pad) {
  ctx.strokeStyle = GRID;
  ctx.lineWidth = 1;
  ctx.fillStyle = MUTED;
  ctx.font = "11px system-ui, sans-serif";
  ctx.textAlign = "right";
  const steps = 4;
  for (let i = 0; i <= steps; i++) {
    const v = min + ((max - min) * i) / steps;
    const y = pad.top + (h - pad.top - pad.bottom) * (1 - i / steps);
    ctx.beginPath();
    ctx.moveTo(pad.left, y);
    ctx.lineTo(w - pad.right, y);
    ctx.stroke();
    ctx.fillText(trimNumber(v), pad.left - 6, y + 4);
  }
}

function trimNumber(v) {
  if (Math.abs(v) >= 100) return String(Math.round(v));
  if (Math.abs(v) >= 10) return v.toFixed(0);
  return v.toFixed(1);
}

// Draw a bar chart of series.points into canvas. Returns nothing.
export function drawBars(canvas, series) {
  const { ctx, w, h } = setupCanvas(canvas);
  const values = series.points.map((p) => p[1]);
  let min = Math.min(0, ...values);
  let max = Math.max(...values);
  if (max - min < 1) max = min + 1;
  min = min - (max - min) * 0.08;
  max = max + (max - min) * 0.12;
  const pad = { top: 22, right: 8, bottom: 24, left: 46 };
  axes(ctx, w, h, min, max, pad);
  const n = series.points.length;
  const slot = (w - pad.left - pad.right) / n;
  const barW = Math.min(52, slot * 0.58);
  series.points.forEach(([year, value], i) => {
    const x = pad.left + slot * i + (slot - barW) / 2;
    const zeroY = pad.top + (h - pad.top - pad.bottom) * (1 - (0 - min) / (max - min));
    const y = pad.top + (h - pad.top - pad.bottom) * (1 - (value - min) / (max - min));
    ctx.fillStyle = i === n - 1 ? BAR_HI : BAR;
    ctx.fillRect(x, Math.min(y, zeroY), barW, Math.abs(zeroY - y));
    ctx.fillStyle = INK;
    ctx.font = "bold 12px system-ui, sans-serif";
    ctx.textAlign = "center";
    // A negative bar hangs below the zero line, so its label goes
    // underneath the bar instead of inside it.
    ctx.fillText(trimNumber(value), x + barW / 2, value < 0 ? y + 16 : y - 6);
    ctx.fillStyle = MUTED;
    ctx.font = "11px system-ui, sans-serif";
    ctx.fillText(String(year), x + barW / 2, h - 7);
  });
}

// Draw a line chart of series.points into canvas. Returns nothing.
export function drawLine(canvas, series) {
  const { ctx, w, h } = setupCanvas(canvas);
  const values = series.points.map((p) => p[1]);
  let min = Math.min(...values);
  let max = Math.max(...values);
  if (max - min < 1) max = min + 1;
  min = min - (max - min) * 0.15;
  max = max + (max - min) * 0.15;
  const pad = { top: 22, right: 14, bottom: 24, left: 46 };
  axes(ctx, w, h, min, max, pad);
  const n = series.points.length;
  const px = (i) => pad.left + ((w - pad.left - pad.right) * i) / (n - 1);
  const py = (v) => pad.top + (h - pad.top - pad.bottom) * (1 - (v - min) / (max - min));
  ctx.strokeStyle = TEAL;
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  series.points.forEach(([year, value], i) => {
    if (i === 0) ctx.moveTo(px(i), py(value));
    else ctx.lineTo(px(i), py(value));
  });
  ctx.stroke();
  series.points.forEach(([year, value], i) => {
    ctx.fillStyle = i === n - 1 ? AMBER : TEAL;
    ctx.beginPath();
    ctx.arc(px(i), py(value), 4.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = INK;
    ctx.font = "bold 12px system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(trimNumber(value), px(i), py(value) - 10);
    ctx.fillStyle = MUTED;
    ctx.font = "11px system-ui, sans-serif";
    ctx.fillText(String(year), px(i), h - 7);
  });
}

// Draw a horizontal bar list (sector shares) into canvas.
export function drawShares(canvas, rows) {
  const { ctx, w, h } = setupCanvas(canvas);
  const rowH = (h - 8) / rows.length;
  const max = Math.max(...rows.map((r) => r.share));
  ctx.font = "12px system-ui, sans-serif";
  rows.forEach((row, i) => {
    const y = 4 + i * rowH;
    const labelW = 208;
    ctx.fillStyle = INK;
    ctx.textAlign = "left";
    ctx.fillText(row.sector, 0, y + rowH / 2 + 4);
    const barX = labelW;
    const barW = (w - labelW - 52) * (row.share / max);
    ctx.fillStyle = i % 2 ? "#3a9d87" : TEAL;
    ctx.fillRect(barX, y + rowH / 2 - 8, Math.max(barW, 3), 16);
    ctx.fillStyle = INK;
    ctx.font = "bold 12px system-ui, sans-serif";
    ctx.fillText(row.share.toFixed(2) + "%", barX + Math.max(barW, 3) + 6, y + rowH / 2 + 4);
    ctx.font = "12px system-ui, sans-serif";
  });
}
