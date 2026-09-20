---
name: career-ops-setup
description: This skill should be used when the user wants to start or reset their job search with career-ops — "set up career ops", "onboard me", "start my job search", "create my profile", "set up my application tracker". It interviews the candidate once and writes the profile, tracker, master CV and working rules that every other career-ops skill depends on.
---

# career-ops setup

Build the candidate's working files once, so every later session (and every subagent) works from the same facts and rules. Run this before any other career-ops skill. If `career-ops/config/profile.yml` already exists, offer to update it instead of starting over.

## 1. Pick the home folder

- Find the folder connected from the user's computer (remote-devices `get_device_info`). Create `career-ops/` inside it with `config/`, `data/`, `research/`, `resume/`.
- If no folder is connected, say once that connecting one in the Claude desktop app lets the files live on their computer, then work in the session workspace and deliver files with SendUserFile.
- **The connected-folder copy is the single source of truth.** Never keep a second tracker in the cloud workspace and let the two drift apart — a user who looks at their local file and sees stale rows loses trust in everything else.

## 2. Collect the resume

Ask for the current resume (attach, or point to a file in the connected folder). Read it fully. Write `cv.md`: every true bullet, per role, with dates — the union of all versions they give. Ask about anything ambiguous (a number that could be funding vs impact, a project that could be theirs or the team's). **Facts they confirm go in a "Confirmed facts" section with the date; these override any older draft.**

## 3. Interview for the profile

Use AskUserQuestion, a few questions per call, multiple-choice where possible. Work through `references/onboarding-questions.md`. Then write `config/profile.yml` from `references/profile.template.yml`.

Do not guess any field. Leave an explicit `null` and list it under `missing:` so the apply skill knows to stop rather than invent — street address and ZIP are the classic example; Workday tenants hard-require them.

## 4. Set the two policies explicitly

Ask both, record the answers verbatim in the profile with the date:

1. **Submit policy** — `stop_before_submit` (default: Claude fills everything and the user clicks Submit) or `auto_submit` (Claude submits). Record the user's exact words if they choose auto-submit, because subagents need to see that authorization quoted, not paraphrased.
2. **Level ceiling** — the highest title they want applied to (e.g. "Senior or Staff IC; no Senior Staff, Principal, Manager"). Applications sent above the ceiling cannot be retracted.

State plainly that the hard stops in `../career-ops-apply/references/guardrails.md` apply under either policy and cannot be turned off.

## 5. Create the tracker

Write `data/applications.md` from `references/applications.template.md`. If the user has prior applications, add them as rows — the tracker is also the **exclusion list** that stops duplicate applications.

## 6. Resume variants

Ask which role types they target (e.g. backend, full-stack, AI tooling, data platform). Plan one resume variant per type and hand off to **career-ops-resume** to build them. Record the role-type → variant-file mapping in `profile.yml` under `resume_variants`.

## 7. Check the browser

Confirm the Claude in Chrome extension is connected. If more than one Chrome is connected, ask which one to use (AskUserQuestion, one option per browser by display name with deviceId) and record the chosen `deviceId` in the profile — subagents cannot ask the user and will otherwise stall. Explain: they sign in to job sites and Workday tenants themselves; Claude never types passwords.

## 8. Save and summarize

- Write a short `career-ops/CONTEXT.md`: target lanes, level ceiling, submit policy, sponsorship needs, location rules, and "lessons learned" (start empty). Every session reads it first.
- If a Claude Project is attached, save CONTEXT.md there too.
- Tell the user in two or three sentences what was set up and what is still missing.
