// career-ops resume builder: node build_resume.js <resume.json> <out.docx>
// Env knobs: SIZE (body pt, default 10), LINE (twips, default 236), MLR / MTB (margins in twips).
// Markup inside strings: **bold**, *italic*.
const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, AlignmentType, TabStopType,
  LevelFormat, ExternalHyperlink, UnderlineType,
} = require("docx");

const [, , IN, OUT = "Resume.docx"] = process.argv;
if (!IN) { console.error("usage: node build_resume.js <resume.json> <out.docx>"); process.exit(1); }
const R = JSON.parse(fs.readFileSync(IN, "utf8"));

const FONT = "Calibri";
const SIZE = parseFloat(process.env.SIZE || "10");
const LINE = parseInt(process.env.LINE || "236");
const MARGIN_LR = parseInt(process.env.MLR || "648");
const MARGIN_TB = parseInt(process.env.MTB || "504");
const CONTENT_W = 12240 - 2 * MARGIN_LR;
const hp = (pt) => Math.round(pt * 2);

function runs(text, base = {}) {
  const out = []; const re = /(\*\*[^*]+\*\*|\*[^*]+\*)/g; let last = 0, m;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) out.push(new TextRun({ text: text.slice(last, m.index), ...base }));
    const t = m[0];
    out.push(t.startsWith("**") ? new TextRun({ text: t.slice(2, -2), bold: true, ...base })
                                : new TextRun({ text: t.slice(1, -1), italics: true, ...base }));
    last = m.index + t.length;
  }
  if (last < text.length) out.push(new TextRun({ text: text.slice(last), ...base }));
  return out;
}
const P = (children, opts = {}) =>
  new Paragraph({ spacing: { before: 0, after: 0, line: LINE, lineRule: "exact" }, ...opts, children });
const header = (label) => P([new TextRun({ text: label, bold: true, underline: { type: UnderlineType.SINGLE } })]);

const contact = [];
(R.contact || []).forEach((c, i) => {
  if (i) contact.push(new TextRun({ text: " | " }));
  if (typeof c === "string") contact.push(new TextRun({ text: c }));
  else contact.push(new ExternalHyperlink({ link: c.url, children: [new TextRun({ text: c.text, style: "Hyperlink" })] }));
});

const children = [
  P([new TextRun({ text: R.name, bold: true, size: hp(15) })], { alignment: AlignmentType.CENTER }),
  P(contact, { alignment: AlignmentType.CENTER, spacing: { before: 0, after: 60, line: LINE, lineRule: "exact" } }),
];
if (R.summary) children.push(P([
  new TextRun({ text: "SUMMARY:", bold: true, underline: { type: UnderlineType.SINGLE } }),
  new TextRun({ text: "  " }), ...runs(R.summary),
]));
if (R.skills?.length) {
  children.push(header("TECHNICAL SKILLS:"));
  R.skills.forEach(([label, value]) => children.push(P(
    [new TextRun({ text: label, bold: true }), new TextRun({ text: "\t" }), ...runs(value)],
    { tabStops: [{ type: TabStopType.LEFT, position: 1440 }], indent: { left: 1440, hanging: 1440 } })));
}
children.push(header("WORK EXPERIENCE:"));
(R.experience || []).forEach((j) => {
  children.push(P([
    new TextRun({ text: j.title + ", ", bold: true, italics: true }),
    new TextRun({ text: j.org, bold: true }),
    new TextRun({ text: "\t" + j.dates, bold: true }),
  ], { tabStops: [{ type: TabStopType.RIGHT, position: CONTENT_W }] }));
  (j.bullets || []).forEach((b) => children.push(P(runs(b), { numbering: { reference: "dots", level: 0 } })));
});
if (R.education?.length) {
  children.push(header("EDUCATION:"));
  R.education.forEach((e) => {
    children.push(P([new TextRun({ text: e.school, bold: true }), new TextRun({ text: "\t" + e.dates, bold: true })],
      { indent: { left: 144 }, tabStops: [{ type: TabStopType.RIGHT, position: CONTENT_W }] }));
    if (e.line) children.push(P(runs(e.line), { indent: { left: 288 } }));
  });
}

const doc = new Document({
  creator: R.author || R.name, lastModifiedBy: R.author || R.name, title: `${R.author || R.name} - Resume`,
  styles: {
    default: { document: { run: { font: FONT, size: hp(SIZE) } } },
    characterStyles: [{ id: "Hyperlink", name: "Hyperlink", basedOn: "DefaultParagraphFont",
      run: { color: "1155CC", underline: { type: UnderlineType.SINGLE } } }],
  },
  numbering: { config: [{ reference: "dots", levels: [{ level: 0, format: LevelFormat.BULLET, text: "●",
    alignment: AlignmentType.LEFT, style: { run: { font: "Arial", size: hp(SIZE) },
    paragraph: { indent: { left: 720, hanging: 360 } } } }] }] },
  sections: [{ properties: { page: { size: { width: 12240, height: 15840 },
    margin: { top: MARGIN_TB, bottom: MARGIN_TB, left: MARGIN_LR, right: MARGIN_LR } } }, children }],
});
Packer.toBuffer(doc).then((buf) => { fs.writeFileSync(OUT, buf); console.log("wrote", OUT); });
