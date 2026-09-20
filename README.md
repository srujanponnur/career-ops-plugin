# career-ops — a job-search plugin for Claude

Turns Claude into a disciplined job-search partner. Five skills:

| Skill | What it does | Say something like |
|---|---|---|
| **career-ops-setup** | One-time interview: writes your profile, application tracker, master CV and the rules Claude must follow for you | "set up career ops" |
| **career-ops-source** | Pulls live roles from Greenhouse, Ashby and Lever job-board APIs, filters by level, location and sponsorship, scores them against your real record, returns a ranked shortlist with clickable links | "find me 25 roles" |
| **career-ops-vet-employer** | Researches an employer's 2022-to-today layoff record and, if you need sponsorship, public PERM / green-card filing data | "is Databricks stable and does it sponsor green cards?" |
| **career-ops-resume** | Builds one-page .docx + .pdf resume variants per role type from a single facts file — nothing invented | "make a backend version of my resume" |
| **career-ops-apply** | Fills applications in Chrome — right resume variant, standard answers from your profile, tailored free text — in parallel, and logs every one | "apply to these 10 jobs" |

Start with **setup**; every other skill reads the files it creates.

## Install

### Claude desktop app (Cowork)
1. Download [`dist/career-ops.plugin`](dist/career-ops.plugin?raw=1).
2. Drop the file into any Cowork chat and accept the install when the preview appears.

### Claude Code
```
/plugin marketplace add srujanponnur/career-ops-plugin
/plugin install career-ops@career-ops
```

## What you need
- A folder from your computer connected to Claude — your profile, tracker, resumes and shortlists live there.
- The **Claude in Chrome** extension for filling applications. You sign in to job sites yourself; Claude drives the page after.
- Node.js and LibreOffice are used for resume building (Claude installs/uses them in its workspace).

## Safety rules that cannot be switched off
Claude will never type a password or create an account for you; accept a binding arbitration agreement, legal waiver or NDA; solve a CAPTCHA, fill a bot honeypot, or read a verification code from your email; invent experience, dates, degrees or personal data; or use AI on a question the employer says must be written without it. It stops and tells you instead.

By default Claude **stops at the Submit button** so you click it. You can switch to auto-submit during setup.

## Updating
Claude Code: `/plugin marketplace update career-ops`. Cowork: download the latest `dist/career-ops.plugin` and install it again.

## Repo layout
```
.claude-plugin/marketplace.json   # makes this repo installable as a plugin marketplace
plugins/career-ops/               # the plugin source (skills + references)
dist/career-ops.plugin            # prebuilt package for the Cowork desktop app
```

*Not legal or immigration advice. Employer filing data is public information; confirm decision-critical points with an attorney.*
