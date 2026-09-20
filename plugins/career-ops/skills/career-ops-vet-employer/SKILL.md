---
name: career-ops-vet-employer
description: This skill should be used when the user asks whether an employer is a safe bet — "is Databricks stable?", "which companies sponsor green cards?", "does X file PERMs?", "has Y had layoffs?", "find me companies that won't lay me off and will do my I-140", "is this company worth leaving my job for?". It researches the employer's 2022-to-today layoff record and, for candidates who need sponsorship, public PERM / green-card filing data and wait-before-PERM reports, and returns a sourced verdict.
---

# career-ops vet employer

Tell the candidate, with sources, whether an employer is stable and — if they need sponsorship — whether it actually gets people to an approved I-140.

**Always research fresh.** Reputations go stale fast: in 2026 several "safe" employers (Visa, Intuit, Atlassian, Cisco, Mastercard, Workday) made large engineering cuts, and Google filed essentially zero PERMs for three years while filing thousands of H-1B LCAs. Never answer from memory.

## Method
Follow `references/method.md`. For more than ~5 employers, split into two parallel subagents in one message — one for layoffs, one for PERM — each with a tight tool budget (~45–55 calls) and an instruction to report a partial answer rather than run out. Merge their results yourself.

## Output
For each employer: layoff rounds with dates, sizes and whether engineering was hit; headcount trend; current financial signal; stability rating (Very stable / Stable / Mixed / Risky / Avoid). If sponsorship matters: recent PERM volume with fiscal year and source, typical wait before PERM starts with source type, red flags, confidence.

Then a ranked list, an "avoid, and why" list with the specific evidence, and the two questions to ask in writing (below). Label every claim **official data**, **press**, or **crowd-sourced**. Say plainly what could not be found.

Save to `research/<company or topic>-<date>.md`. Close with: *not legal or immigration advice; confirm decision-critical points with an attorney.*

## Two questions the candidate should get answered in writing before signing
1. On what date after my start does counsel initiate PERM — and is that a policy or a commitment?
2. Does the company pay for I-140 premium processing, and does it withdraw an approved I-140 if an employee leaves before 180 days?
