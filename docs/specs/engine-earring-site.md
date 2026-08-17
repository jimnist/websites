# Engine Earring - site build handoff

**Written:** 2026-08-14
**Destination:** `jimnist/websites` repo.
Suggested home there: `docs/specs/engine-earring-site.md`, or `apps/engine-earring/README.md` (currently empty).
**Source of truth for copy:** `bigbrain/jobs/LINKEDIN_PROFILE.md`

---

## 1. Why this work exists

The LinkedIn "current" employment entry reads:

```
Independent Advisor & Builder (Product Engineering, AI Agents, Automation)
Multiple Companies
Feb 2026 - Present
```

The decision is to change the company field from "Multiple Companies" to **Engine Earring**.

Reasoning:

- There is no employment gap to cover.
  Yardzen ran Mar 2025 to Feb 2026, and the independent entry picks up Feb 2026.
  The entry is not doing damage control, so it can be optimized for signal instead.
- The "independent consultant" read is already fully present from the job title.
  Naming the company does not add that signal, it is already priced in.
  The only variable is whether six months reads as **a deliberate practice** or **a holding pattern**, and "Multiple Companies" reads as the latter.
- "Multiple Companies" renders with a generic gray building icon.
  Yardzen, Provide, and Sonder all show real logos, so it is the one visually orphaned row on the profile.

**Hard prerequisite:** the site has to earn the click before the profile links to it.
Right now engine-earring.com is a placeholder with no name, no bio, no proof, and no contact.
A recruiter who clicks through from LinkedIn and lands on that concludes "unfinished vanity project," which is strictly worse than the gray building icon.
A placeholder nobody finds is harmless.
A placeholder you have advertised is not.

### Order of operations

1. Build out the site (this document).
2. Create the LinkedIn Company Page, which is what produces the logo and the clickable link.
   Requires a verified email at the domain.
   Google Workspace is already running on engine-earring.com, so this is unblocked.
3. Swap the LinkedIn company field, leaving the job title and body text exactly as written.
   Those are already tuned.

---

## 2. Current state of the app

Astro 5 app in a Bun workspace monorepo.

| Item | Value |
| --- | --- |
| Path | `apps/engine-earring` |
| Package | `@jimnist/engine-earring` |
| Framework | Astro `^5.16.15`, no integrations |
| Source | A single file: `src/pages/index.astro` |
| Dev | `bun run dev:engine-earring` (port 4323) |
| Build | `bun run build:engine-earring` |
| Config | `astro.config.mjs` is an empty `defineConfig({})`, so this is a plain static build |
| Deploy | `.wrangler/` present, so Cloudflare. DNS resolves to Cloudflare IPs with a 300s TTL |
| Context doc | `apps/engine-earring/CONTEXT.md`, currently a stub |

`index.astro` is self-contained: inline `<style>` block, no shared layout, no use of `packages/components`.
The whole page is one SVG-bordered card with a folded corner, the logo image at `/img/ee.png`, and two text groups.

Live copy, in full:

```
engine-earring.com
[logo]
software.
infrastructure.
creative.

business-driven
technology
consulting

© 2026
```

### Assets already in the repo

`apps/engine-earring/artwork/` has the full identity kit, mostly unused by the current page:

- `ee.ai`, `ee.psd`, `e_upside_down_e.{ai,pdf,png,skp}` - the logo, including the 3D extruded "E" with the earring glyph
- `engine-earring.{jpg,skp,xml}`, `piston.skp` - source models
- `favicon.psd`, `fb_cover2.png`, `header.psd`, `bg.psd`, `bottom.psd`, `left.jpg`

There is real design equity here.
Preserve the card and the logo mark.
This is not a redesign, it is a build-out.

---

## 3. Positioning - read this before writing any copy

`LINKEDIN_PROFILE.md` was revised on 2026-08-10 for a deliberate focus pivot:

> senior-IC building and project work, away from Director-at-scale-up and away from infrastructure

Rationale lives in `bigbrain/generic/PORTFOLIO_SEQUENCE.md` and `bigbrain/research/personality/`.

**The current site copy is off-strategy on both counts.**

- The card leads `software. / infrastructure. / creative.`
  The LinkedIn revision note is explicit that infrastructure-first framing "reads as the platform/infra work Jim is deliberately steering away from."
  The site currently leads with the exact thing the profile was rewritten to de-emphasize.
- "business-driven technology consulting" is an executive-advisory framing.
  The pivot is toward hands-on product engineering.

So the three words and the tagline both need to change.
That is the single highest-value edit on the site, and it is worth settling before layout work starts.

**Audience:** founders and hiring managers at startups and consumer brands, plus recruiters arriving from LinkedIn.
**Job of the site:** make "Independent Advisor & Builder" look like a real practice, and make the track record visible in under ten seconds.

---

## 4. What the site needs

Single page is fine, and probably correct.
Resist building a multi-page marketing site.

**Identity.**
Jim's name, prominently.
The site currently never says who runs it, which is the biggest single gap.
"Engine Earring" tells an engineering audience nothing on its own, so the name has to carry the meaning immediately.

**What he does now.**
Lift from the About section and the three example-project bullets in `LINKEDIN_PROFILE.md`.
They are already concrete and already in his voice.
Do not re-invent this copy.

**Proof.**
This is the whole argument and the current site makes none of it.
The load-bearing facts, all already public on LinkedIn:

- Loan origination for Fifth Third Bank, a top-15 US bank, under bank audit (Provide)
- $600M+ in annual bookings at Sonder, through IPO
- Couchsurfing rebuilt for 11M+ members in seven months, after three failed attempts
- Yardzen: $200K+/yr infrastructure and service spend eliminated

**Contact.**
Currently absent.
Decide between a `mailto:` at the domain and a form.
A `mailto:` is simpler, and there is no reason to run a form for this volume.

**Meta and social.**
No `<meta name="description">`, no Open Graph tags today.
Add them, because this URL is about to be shared from a LinkedIn profile.
`fb_cover2.png` in artwork may be reusable as an OG image.

---

## 5. Source material - use verbatim

From `bigbrain/jobs/LINKEDIN_PROFILE.md`.
This copy is already voice-checked, so lift it rather than paraphrasing.

**About, as written:**

> I build software. Twenty years of it, mostly leading the people who build it.
>
> Right now I'm hands-on. Applications, agent orchestration, eval harnesses. Every day. Claude Code and Codex as daily drivers, cross-model review between them.
>
> For a consumer CPG brand: marketing content automation running off brand guidelines the team edits themselves. A Gmail-to-Shopify pipeline that killed manual triage.
>
> Before that I ran engineering orgs. Loan origination for Fifth Third Bank, a top-15 US bank, under bank audit. $600M+ in annual bookings at Sonder, through IPO. Couchsurfing rebuilt for 11M+ members in seven months, after three failed attempts.
>
> That's the judgment I bring to a build. These days I'd rather be in the code.
>
> Taking project work now, advisory and hands-on, with startups and consumer brands.
>
> I've made a career out of fixing what's broken, but I love to do things right the first time. I'm at my best when there's a hard problem and a real product that helps people live their best offline lives.
>
> San Francisco. MFA from CU Boulder - painting and computer science. That combination has aged well.

The three example projects (CPG brand, personal AI tooling, AI-native development practice) are in the Experience section of the same file, lines 40 through 50.

---

## 6. Voice rules

Read `~/VOICE.md` (symlink to `dotfiles/claude/VOICE.md`) before drafting any prose.
Register for this site is **LinkedIn / public**: his normal voice with clean capitalization, no corporate mode.

Hard rules that bite most often:

- No em dashes anywhere.
  Plain dash instead.
- Banned vocabulary: delve, leverage, robust, utilize, facilitate, spearhead, boasts.
- Banned enthusiasm: "I'm excited to", "I'd love to", "I'm thrilled", "I'm passionate about".
- Banned connectors: Furthermore, Moreover, Additionally, "In conclusion", "It's worth noting that".
- Cut trailing clauses that only editorialize about the sentence they are attached to.
- State capability flatly, no hedging and no gushing.
  "This is squarely what I do."
- Contractions always.
- Emoji and exclamation points essentially never.

Note that `leverage` is banned and was already caught once in the LinkedIn rewrite, so it is a repeat offender.

---

## 7. Open decisions

These need Jim's call, not an implementer's guess.

1. **The three words.**
   `software. / infrastructure. / creative.` conflicts with the pivot.
   What replaces "infrastructure"?
   The profile suggests something in the direction of agents, automation, or product engineering.
2. **The tagline.**
   "business-driven technology consulting" reads executive-advisory.
   Does it become something hands-on, or does it go away?
3. **Client naming.**
   The CPG brand is unnamed on LinkedIn.
   Confirm whether it can be named on the site or stays anonymized.
4. **Availability language.**
   LinkedIn says "Taking project work now."
   Decide whether the site states this plainly or stays neutral, given a parallel full-time search is running.
5. **Relationship to jimnist.com.**
   That app is personal (photos, wedding, `imadethis`).
   Confirm engine-earring.com is the professional front door and they do not cross-link, or decide how they should.

---

## 8. Definition of done

- [ ] Three words and tagline resolved against the 2026-08-10 positioning
- [ ] Jim's name on the page
- [ ] Current work described, lifted from `LINKEDIN_PROFILE.md`
- [ ] Proof points present (Fifth Third, Sonder, Couchsurfing, Yardzen)
- [ ] Contact method live
- [ ] Meta description and Open Graph tags added
- [ ] Responsive down to mobile, since recruiters open LinkedIn links on phones
- [ ] Card and logo identity preserved
- [ ] Voice pass against `~/VOICE.md`, and a scan for em dashes and banned vocabulary
- [ ] Deployed and verified live at engine-earring.com
- [ ] `apps/engine-earring/CONTEXT.md` filled in, since it is currently a stub

**Then, and only then, back in the LinkedIn workflow:**

- [ ] Create the LinkedIn Company Page using an @engine-earring.com address
- [ ] Change the current employment company field from "Multiple Companies" to Engine Earring
- [ ] Leave the job title and body copy unchanged
- [ ] Update `bigbrain/jobs/LINKEDIN_PROFILE.md` to match what is live

---

## 9. Notes for whoever picks this up

The site is deployed behind Cloudflare with a 300 second DNS TTL.
It was briefly unreachable on 2026-08-14 and resolved on its own, which is consistent with propagation or edge certificate provisioning rather than a real fault.
If it appears down, check again before debugging.

The existing page is genuinely well made for what it is.
The problem is not quality, it is that it is a business card when it now needs to be an argument.
