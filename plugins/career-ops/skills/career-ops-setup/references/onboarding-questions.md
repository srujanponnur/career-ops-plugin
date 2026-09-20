# Onboarding interview

Ask in small AskUserQuestion batches. Offer choices; the user can always type their own.

## Identity and contact
- Legal name as it should appear on applications; preferred first name if different.
- Email and phone (with country code) for applications.
- City/metro they live in. **Full street address and ZIP** — explain Workday tenants hard-require them; if they decline, record null and accept those applications will block.
- LinkedIn URL, GitHub/portfolio URL.

## Work history (cross-check against the resume)
- For each role: title, employer, location, start/end month-year. Autofill parsers mangle dates constantly, so the profile must hold the true ones.
- Current employer's product names, and any internal names that must NOT appear publicly.
- Total years of professional experience (they will be asked this number constantly).

## Education
- Each degree: school, city/country, degree, field, GPA if they want it shown, start/end month-year.

## Work authorization
- Citizen / permanent resident / visa holder? Which visa, which year of it?
- Needs sponsorship now or in future? Record the exact sentence to use in free-text sponsorship fields.
- **Rule to record:** "authorized to work in the US" and "authorized to work for ANY employer without sponsorship" are different questions. A visa holder is often Yes to the first and No to the second. Record both answers.
- If sponsorship is needed: does a green-card track record matter to them? (Turns on the employer-vetting weighting in career-ops-source.)

## Targets
- Role types / lanes (e.g. Seattle big tech, AI labs, developer tooling, healthcare AI).
- Level ceiling (see SKILL.md step 4) and level floor.
- Locations: which metros, remote OK, hybrid OK, in-office OK, open to relocation?
- Compensation floor (base) and target total comp; what to type when a salary field is required.
- Companies to avoid, and companies they already applied to recently (with dates) — goes into the tracker.

## Self-identification (EEO)
Ask whether they want these answered or left at "prefer not to answer". If answered, record their exact choices for: gender, race/ethnicity (and the more specific option if forms offer one), Hispanic/Latino, veteran status, disability, sexual orientation, transgender identity, age bracket. Never infer any of these.

## Policies
- Submit policy (stop_before_submit / auto_submit) — quote their words.
- May Claude answer "how did you hear about us"? Default answer.
- Free-text tone: formal, plain, first-person? Any phrases they dislike?
- Should Claude attach a cover letter when optional? (Default: no unless tailored.)
