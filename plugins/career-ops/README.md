# career-ops

A job-search operating system for Claude (Cowork). It turns Claude into a disciplined job-search partner that:

1. **Sets you up** — interviews you once, writes your profile, application tracker and master CV, and records the rules it must follow on your behalf.
2. **Finds and ranks roles** — pulls live postings straight from Greenhouse, Ashby and Lever job-board APIs, filters by level/location/sponsorship, scores them against your real record, and hands back a ranked markdown shortlist with clickable links.
3. **Vets employers** — checks the 2022-to-today layoff record and, if you need sponsorship, public PERM / green-card filing data, so you aim at companies that are stable and actually sponsor.
4. **Builds tailored resumes** — one-page .docx + .pdf variants per role type, generated from a single facts file so nothing gets invented.
5. **Fills applications in Chrome** — uploads the right resume, answers standard questions from your profile, drafts free-text answers from your real experience, logs every application, and runs many forms in parallel.

## Skills

| Skill | Say something like |
|---|---|
| career-ops-setup | "set up career ops", "onboard me for my job search" |
| career-ops-source | "find me 25 roles", "rank the best open positions for me" |
| career-ops-vet-employer | "is Databricks stable?", "which companies sponsor green cards?" |
| career-ops-resume | "make a backend version of my resume", "tailor my resume for this JD" |
| career-ops-apply | "apply to these jobs", "fill this application" |

Start with **career-ops-setup**. Every other skill reads the files it creates.

## What you need

- **Claude desktop app (Cowork)** with a folder from your computer connected — this is where your profile, tracker, resumes and shortlists live. Without one, files stay in the chat.
- **Claude in Chrome extension**, signed in, for filling applications. You sign in to job sites yourself; Claude drives the page after that.
- **Optional: a Claude Project** — setup saves a copy of key decisions there so a new chat picks up where the last one stopped.

## Safety rules that cannot be switched off

Claude will never: type a password or create an account for you; accept a binding arbitration agreement, legal waiver or NDA; solve a CAPTCHA, fill a bot honeypot, or read a verification code out of your email; invent experience, dates, degrees or personal data; or use AI on a question the employer says must be written without it. It stops and tells you instead.

By default Claude **stops at the Submit button** and you click it. You can change that during setup.

## Where things go

```
<your connected folder>/career-ops/
  config/profile.yml         # your facts, preferences and rules
  data/applications.md       # the tracker — single source of truth
  data/answers-<date>.md     # every free-text answer submitted, reusable
  data/shortlist-<date>.md   # ranked role lists with links
  research/<company>.md      # employer vetting notes
  resume/                    # resume.json + generated .docx/.pdf variants
  cv.md                      # master CV: every true bullet you have
```

*Not legal or immigration advice. Employer filing data is public information; confirm anything decision-critical with an attorney.*
