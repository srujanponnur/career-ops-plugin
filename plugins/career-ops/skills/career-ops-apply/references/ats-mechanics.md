# ATS mechanics — learned the hard way

## All ATSes
- `file_upload` must target the right input. A page with Resume and Cover Letter uploads has look-alike buttons; the wrong ref silently attaches the resume as the cover letter. Screenshot after every upload.
- A required field can render a label with no input in the DOM (a real form bug). Confirm with a full interactive `read_page` scan, then report it — don't loop.
- Dropdowns often revert when set programmatically: set, then re-read to confirm; if it reverted, click the field, type, press Enter.
- Custom career sites sometimes render the form twice (one hidden). Fill the visible copy; `form_input` may not stick there — click and type.
- Many URL-based direct links are rejected or redirect; drive the site's own search box when an ID URL lands on a generic page (Microsoft keys jobs by an internal id and drops query params).

## Greenhouse (boards.greenhouse.io, job-boards.greenhouse.io, embeds)
- Embed URLs (`job-boards.greenhouse.io/embed/job_app?for=<slug>&token=<id>`) often open the job description; click Apply, wait ~3 s, press End (sometimes twice) to reach the form.
- "Autofill my application" and the browser's saved Greenhouse profile carry name, contact, LinkedIn and even EEO answers across companies. Verify rather than re-enter.
- **Always remove a pre-attached resume** from a previous application before uploading the tailored variant.
- Location (City) is a typeahead: type, then click the suggestion. Phone may need click-and-type.
- Some forms gate Submit behind an 8-character emailed verification code → guardrail 3: stop and report.

## Ashby (jobs.ashbyhq.com, embedded on company sites)
- **Upload the resume first.** The resume parse wipes all typed values once, 30–60 s after upload. Fill, wait, then verify every field and re-fill what was cleared.
- Some fields ignore programmatic text — use real typing.
- `ctrl+a` types a literal "a"; select existing text with triple-click.
- If the job URL 404s, append `?embed=js`, or find the form on the company's own careers page.
- Nothing carries over between companies. Yes/No are buttons; checkbox groups may need a coordinate click.

## Lever (jobs.lever.co)
- Straightforward; use the posting's `hostedUrl` + `/apply`. Watch for custom questions at the bottom.

## Workday (*.myworkdayjobs.com)
- **Every tenant is a separate account.** The user signs in per company; Claude drives after.
- Flow: Apply → Autofill with Resume → My Information → My Experience → Application Questions (1–2 pages) → Voluntary Disclosures → Self Identify (not every tenant) → Review → Submit. Only after My Information saves does a draft exist.
- **Street address and postal code are often hard-required** on My Information. Missing in profile → BLOCKED.
- Autofill UPPER-CASES names and mis-parses employment dates and truncates titles mid-parenthesis. Fix every one.
- Phone rejects a "+1" prefix when Country Phone Code is a separate field.
- Free text rejects `< > [ ] " { } \` — write "under 100 ms" not "<100 ms".
- "How did you hear about us" is often a hierarchical picker (e.g. Social Media → LinkedIn); typing doesn't filter; the list is virtualized so take a screenshot.
- Multi-select pickers need type-then-Enter.
- "Save and Continue" often needs a second click after a validation error clears.
- **Silent session expiry:** a save that returns a bare "Page Error" with a UUID and no field errors means the sign-in died. Reload (F5); if the wizard gained a "Create Account/Sign In" step, ask the user to sign in again.
- Navigating straight to an `/apply/...` URL may be blocked; click the Apply button instead.
- Some tenants put an arbitration checkbox on Voluntary Disclosures → guardrail 2.
- Candidate Home is `/userHome`; `/candidateProfile` may error.

## Big-company portals
- Apple (jobs.apple.com): detail pages are JavaScript-rendered; hiring is team-by-team; applying to many unrelated teams makes a profile look unfocused. Keep applications to one coherent area.
- Company portals built on Oracle Cloud, iCIMS, SuccessFactors or Eightfold behave like Workday: user signs in, heavier flows, no public JSON.
