---
name: career-ops-source
description: This skill should be used when the user wants live job openings found, filtered and ranked for them — "find me 25 roles", "rank the best open positions for me", "use a different job pool", "which roles should I apply to", "make a shortlist with links". It pulls postings directly from ATS job-board APIs, filters by the candidate's level, location and sponsorship rules, scores them against the candidate's real record, and delivers a ranked markdown shortlist with clickable links.
---

# career-ops source

Find live roles the candidate should actually apply to, and explain why each one fits.

## 1. Frame the pool
Read `CONTEXT.md`, `config/profile.yml` and `data/applications.md`. Build:
- **Exclusion list** = every company in the tracker + `avoid_companies` + companies ruled out for no sponsorship (if sponsorship needed).
- **Pools** from the candidate's `targets.lanes` — e.g. AI infrastructure, developer tooling, data/streaming, the candidate's domain, local-metro employers, big-name stable employers. Name 40–70 companies per pool.

**Check the pool list itself for bias before trusting results.** If every scan comes back one flavor of company, the company list is narrow — the market isn't. (A tooling-convenience choice, like disabling noisy big-company boards, can silently become the strategy.)

## 2. Harvest in parallel
Launch one subagent per pool **in a single message**, each with the brief in `references/harvest-agent-brief.md`. They query ATS APIs through WebFetch (see `references/ats-apis.md`) — `curl` is usually blocked by egress. For Workday/iCIMS/Eightfold employers there is no public JSON; use WebSearch + the careers page and mark those rows "login required".

Posting APIs return only live jobs, so API rows are open as of today. URLs must come from the API response fields — never construct one.

## 3. Score
Use `references/scoring-rubric.md`. Adjust weights to what the user asked for this time (e.g. "well-known and stable" → raise brand, layoff and sponsorship weights; "early-stage" → raise stage/pace). If sponsorship matters and the user cares about green cards, run **career-ops-vet-employer** on the top candidates before finalizing.

Be honest in each entry: name the specific overlap with the candidate's record (with their real numbers) and the real gap (language, years, domain).

## 4. Deliver
Write `data/shortlist-<date>.md` in the shape of `references/shortlist-template.md`: tiers, score, one clickable **Apply →** link per role, location, comp band, years, why it fits, gap to name. Then "also live", "rule out permanently — won't sponsor" (quote the posting), and "dropped for the level ceiling".

Save to the connected folder, deliver with SendUserFile, and save to the Project if attached. In chat, give two or three findings the user wouldn't have guessed — not a recap of the file.
