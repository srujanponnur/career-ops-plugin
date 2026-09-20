---
name: career-ops-resume
description: This skill should be used when the user wants a resume built, tailored or updated — "make a backend version of my resume", "tailor my resume for this JD", "update my resume with my new role", "build resume variants", "rename the product on my resume". It generates one-page .docx and .pdf resumes from a single facts file, one variant per role type, without inventing anything.
---

# career-ops resume

Produce clean one-page resumes from the candidate's true record, with a variant per role type.

## Rules
Read `references/rules.md` first. The core rule: every bullet traces to `cv.md` or a fact the candidate confirmed. Reorder, select and reword — never add a skill, number, title or scope that isn't there.

## Build
1. Read `cv.md` and `config/profile.yml` (role types → `resume_variants`).
2. For each variant, write `resume/<variant>.json` in the shape of `references/resume.example.json`: pick the summary, skill rows and the 8–12 strongest bullets for that role type; lead with the bullets whose keywords the target JDs repeat.
3. Copy `references/build_resume.js` into `resume/`. Run `npm install docx` once, then `node build_resume.js <variant>.json <Output_Name>.docx`.
4. Convert: `soffice --headless --convert-to pdf <Output_Name>.docx`.
5. **Verify one page:** check the PDF page count (e.g. with pypdf). If it spills, tighten by setting env `SIZE=9.5` or `LINE=228`, or cut the weakest bullet — never shrink below 9.5 pt.
6. Scrub PDF metadata to the candidate's name (Author/Creator) and blank Producer.
7. Render page 1 to an image and look at it before delivering.
8. Save .docx and .pdf to `career-ops/resume/`, update `resume_variants` in the profile, and deliver with SendUserFile.

## When a fact changes
(new role, product renamed, a number corrected) — update `cv.md` first, then regenerate **every** variant, not just one, and tell the user which files changed. Stale variants keep going out otherwise.
