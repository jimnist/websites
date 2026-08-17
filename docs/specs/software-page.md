# /software page - rework handoff

**Written:** 2026-08-16
**App:** `apps/jimnist-com`, page at `src/pages/software.astro`
**Live:** https://jimnist.com/software
**Source of truth for career facts:** `bigbrain/jobs/generic/RESUME.md` and `bigbrain/jobs/LINKEDIN_PROFILE.md`

---

## 1. Why this rework exists

The page shipped on 2026-08-16 was written in a few hours ahead of outreach to Hover for a Senior Engineering Manager, Estimation role.
That deadline shaped it in two ways that do not survive the week.

**It reads as a resume.**
Track record sits first and takes roughly two thirds of the page.
Six roles, reverse-relevance ordered, each with a paragraph.
Anyone who wanted that could read the LinkedIn profile, which is the actual canonical version.

**It is aimed at one job posting.**
The opening frame is:

> Pricing and rules engines are the through-line. Systems where a lot of parties each need their own logic and you cannot fork the product for every one of them.

That is a good sentence and it is true, but it was chosen because the Hover JD asks for exactly that.
It narrows Jim to a pricing specialist for every other reader, and the two audiences that matter most (see below) are not asking about pricing.

## 2. What this page is actually for

Clarified by Jim 2026-08-16, and it should govern every decision below.

**This is not a pitch surface.**
It does not get linked in outreach, and it is not where anyone learns the pricing-systems argument.
That argument lives in the notes, the cover letter, and the LinkedIn profile, which are the documents actually doing the persuading.

**Its job is the "personal website" field on job applications.**
Someone types the URL in because a form asked for it, or because they have the resume in hand and are checking that he is real.
They arrive already interested.
The page has to be credible, current, and clearly his. It does not have to convert anybody.

**It grows over time.**
This is a standing surface, not a campaign asset with a deadline.
Treat every pass as incremental. No version of it has to be finished by a date.

### What follows from that

- **The visitor probably has the resume already.** That makes a second full copy of the work history the most redundant thing on the page, which is the real argument for compressing it in section 5. The track record is not uninteresting; this particular reader has just read it.
- **Projects are the part that is not on the resume.** A resume bullet cannot show what the context-profile MCP server actually does. The page can. That is the whole reason to lead with them.
- **Do not optimize for strangers discovering it.** Discovery is munibus.bingo's job per `bigbrain/jobs/generic/PORTFOLIO_SEQUENCE.md`. This page serves people who already have the name.
- **Do not tune it to any single role.** That mistake is what produced this spec.

The question a reader is really answering is still: can this person take a fuzzy real-world problem, model it, and ship something that works?
Projects answer that. A track record answers "has he been trusted before," which they already know from the resume that sent them here.

**Target order:**

1. Name and a short identity line
2. **Projects** - client work first, personal projects after
3. Track record, compressed
4. Contact

The existing thesis line is the right opener for the projects section and probably for the page:

> Take messy real-world observation, turn it into structured data you can act on, and put agent-native tooling on top.

It is audience-neutral, it describes every project honestly, and it does not read as aimed at a posting.

## 3. Client work goes first, and the client is not named

**Hard constraint: do not name Magic Mind.**
Confirmed by Jim 2026-08-16.
Refer to it as "a consumer CPG brand," matching the language already used on the resume and LinkedIn.

This settles open question 1 in `bigbrain/jobs/generic/PORTFOLIO_SEQUENCE.md`, which asked whether independent clients could be named publicly.
The answer is no for now.
That file should be updated to record it.

### Source material

The work lives in `~/code/magicmind/ai-automation`, a Bun monorepo of three apps.
Everything below is drawn from that repo's `docs/agents/apps/*.md` and app READMEs, so it is accurate as of 2026-08-16.
Describe capability and architecture, never the brand.

**Context profile MCP server** - the strongest of the three, and the one to lead with.

- An MCP server that serves curated Google Drive documents to Claude as named "context profiles."
- Subfolders of a root Drive folder are discovered dynamically as profiles; a `common` folder is always auto-included; files shared across folders are deduplicated.
- Two tools: `list_profiles` and `load_context_profile`.
- Handles Google Docs, Sheets, PDFs, CSVs, and plain text.
- Runs on Cloud Run, secrets in Secret Manager, optional Upstash Redis cache with a configurable TTL.
- Registered as an org-level MCP connector in Claude Teams.
- Ships a validator for `VERBATIM COPY` structured documents that exits non-zero, so it can gate a deploy or run in CI.

**Why it matters, and this is the part worth writing well:** the marketing team edits Google Docs and the agents pick up the change.
Brand guidelines and approved copy stay in the tool the team already uses, and no engineer is in the loop to ship an update.
That is the whole argument for agent-native tooling in one concrete example, and it is more persuasive than any adjective.

**Shopify sample-request automation.**

- Parses sample requests out of an inbox, creates a Shopify draft order with a 100% manual discount, logs each request to a Google Sheet, and fulfills once approved. Tracking is backfilled on a separate pass.
- The Google Sheet is the approval control surface, which is the interesting design decision: the humans doing approvals never leave the spreadsheet they were already using.
- Shopify Admin API for draft orders, discounts, orders, and fulfillments.
- Note this app is marked "in discovery" in its agent doc. Describe what it does, not a finished state, unless that has changed by the time you write.

**Persona pipeline.**

- A staged CLI that turns raw source data into generated personas: `prepare`, `bios`, `distill`, `export`, `cards`, or `full` end to end.
- Uses the Anthropic Claude API through `@anthropic-ai/sdk`.
- Local pipeline, no hosted infrastructure. Output is assembled into a Drive export folder.
- Weakest of the three for this audience. Include it only if the section does not already feel full.

### Then the personal projects

`jimtime` and `ath` are already written on the page and the copy is fine.
Keep `jimtime` linked, since it is the only public repo of the three.
Keep `ath` unlinked and described, with the "happy to walk through it" line.

Consider folding the current "Personal AI tooling" catch-all into the client section or cutting it.
It is the vaguest block on the page.

## 4. What to keep

Do not rewrite these; they work.

- The visual design. Cream background, yellow underline accents, the type scale, the dark mode block.
- The `/software` URL and the homepage category link, so `/artwork` and `/furniture` slot in as siblings.
- The contact row and the MFA closing line. That line is Jim's own and it is the best differentiator on the page.
- Facts mirroring `bigbrain/jobs/generic/RESUME.md`. If a number changes there, change it here.

## 5. Track record, compressed

Six roles with a paragraph each is too much once projects lead.
Options, in rough order of preference:

1. Cut to a compact list: org, role, years, and one line each. Keeps the credibility, loses the bulk.
2. Keep full paragraphs for the three that carry the most weight (Couchsurfing, Sonder, Provide) and one-line the rest.
3. Move the whole thing behind a `/resume` page and leave a single summarizing line on `/software`.

Whichever you pick, drop the pricing-first framing from the intro.
It can stay inside the Liftopia entry, where it is a fact about a job rather than a claim about Jim.

## 6. Voice

Read `~/VOICE.md` before drafting.
Register is LinkedIn/public: his normal voice, clean capitalization, no corporate mode.

The rules that bite most often here:

- No em dashes anywhere. Plain dash instead.
- Banned vocabulary: delve, leverage, robust, utilize, facilitate, spearhead, boasts.
- Banned enthusiasm: "I'm excited to", "I'd love to", "I'm thrilled", "I'm passionate about".
- Contractions always.
- Cut trailing clauses that only editorialize about the sentence they are attached to.

Per `bigbrain/jobs/CLAUDE.md`, this genre gets the VOICE.md pass and **skips the GPTZero gate**.
Technical prose about LLM systems scores as AI even when Jim writes it himself, and chasing the score means writing more conventionally.

## 7. Branch state, read before you start

As of 2026-08-16 the repo has diverged in both directions:

- `main` has the `/software` page and the homepage nav link. This is what is deployed.
- `easteregg` is 12 commits ahead of `main` with the dance easter egg, which is **deliberately unreleased**. Jim does not want it pushed.

`easteregg` never touched `index.astro`, so merging it into `main` later is clean and keeps the nav link.
**Branch this work from `main`, not from `easteregg`**, or the page you edit will not be the page that is live.

Deploy is push-to-`main` via GitHub Actions to Cloudflare Pages, and it takes about 20 seconds.

## 8. Definition of done

- [ ] Projects lead the page, track record follows
- [ ] Client work opens the projects section, with the CPG brand unnamed
- [ ] The context-profile MCP server described in terms of what it lets the marketing team do
- [ ] Hover-specific pricing framing removed from the intro
- [ ] Track record compressed
- [ ] `jimtime` still linked, `ath` still described
- [ ] Design, URL, homepage link, and contact row preserved
- [ ] Voice pass, plus a scan for em dashes and banned vocabulary
- [ ] `bun run build:jimnist` clean, checked at mobile width
- [ ] Deployed and verified live
- [ ] `bigbrain/jobs/generic/PORTFOLIO_SEQUENCE.md` open question 1 updated to record that clients stay unnamed
