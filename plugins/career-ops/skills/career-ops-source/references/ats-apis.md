# Public job-board APIs (use WebFetch)

| ATS | List endpoint | Link field | Notes |
|---|---|---|---|
| Greenhouse | `https://boards-api.greenhouse.io/v1/boards/<slug>/jobs?content=true` | `absolute_url` | Big boards truncate; confirm a specific job at `.../jobs/<id>`. Board token can differ from the public slug (e.g. job-boards.greenhouse.io/groq renders but the API slug differs). |
| Ashby | `https://api.ashbyhq.com/posting-api/job-board/<slug>?includeCompensation=true` | `jobUrl` / `applyUrl` | Comp bands often included. Some boards are embed-only. |
| Lever | `https://api.lever.co/v0/postings/<slug>?mode=json` | `hostedUrl` | |
| Workable | `https://apply.workable.com/api/v1/widget/accounts/<slug>` | `url` | |
| SmartRecruiters | `https://api.smartrecruiters.com/v1/companies/<slug>/postings` | `ref` | |
| Workday / iCIMS / Eightfold / Oracle Cloud | none public (Workday `/wday/cxs/` returns 403) | careers page URL | WebSearch `site:<careers-domain> "<title>"`; mark as login-required. |

- Slugs are usually the lowercase company name; try one or two variants, then move on. Record dead slugs and discovered correct slugs so later runs don't retry.
- A slug can belong to an unrelated company with the same name — sanity-check the postings.
- Sponsorship language lives in the JD body (`content`). Search it for "sponsor", "visa", "authorized to work", "without the need for".
