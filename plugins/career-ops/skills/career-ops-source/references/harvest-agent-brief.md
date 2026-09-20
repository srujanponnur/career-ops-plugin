# Harvest-subagent brief template

---
Research task — sourcing live job postings only. NO applications, NO form filling, NO browser automation.
Load tools: ToolSearch "select:WebSearch,WebFetch". Budget ~50–70 tool calls; pace yourself and report a useful partial list rather than running out. Today is {{date}}.

## Candidate
{{3–5 line summary: years, current title/employer, core stack, standout work, degree, location, sponsorship need, location openness}}

## Your pool — {{pool name}}
Check these companies (Greenhouse, then Ashby, then Lever; slugs usually lowercase name): {{company list}}.
Skip — already applied: {{exclusion list}}.

## How to query
{{paste references/ats-apis.md}}

## Keep only reqs that are ALL of
- {{level floor}}–{{level ceiling}} IC (include Founding Engineer / MTS if in scope); exclude anything demanding more than {{max_years}} years.
- {{discipline filter, e.g. software engineering: backend, platform, full-stack, AI/agent, dev tooling; not research, not SRE-only, not sales engineering}}
- {{geography}}
- Does not explicitly refuse sponsorship {{if needed}}. Note refusals separately, quoted.

Be honest where a req demands a primary language or domain the candidate lacks — mark it a stretch.

## Report
Aim for 15–25 reqs. Table: Company | Title | Req id | ATS | Direct URL (from the API field) | Location | Comp band | Years | 4–6 concrete musts | Sponsorship language.
Then: Standouts (3–5, one sentence each naming the overlap) · Sponsorship-blocked (quoted) · Dead boards / wrong slugs / correct slugs discovered.
Never invent a req or a URL.
---
