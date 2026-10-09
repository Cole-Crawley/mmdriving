# MMDriving redesign: research and rules

Written 9 October 2026 on the `redesign` branch. Nothing here is live until the branch is merged and pushed.
Screenshots and raw measurements are in `_research/` (the pictures are not committed).

Labels: **[measured]** means I loaded the page at 1440 or 390 wide and read the numbers from it.
**[article]** means a published source. **[judgement]** is my own call.

---

## 1. What I looked at

### Driving schools and instructors (17 sites) [measured]
Smooth Driving School (Glasgow), Rimmers (Fleet), Ash's (East London), TOFU Driving (London), RED, Pull Up (Glasgow),
Step In Drive, Kruzee (Canada), Drivisa (Canada), LTrent (Australia), Coastline Academy (US), Aceable (US),
AA Driving School, PassMeFast, BSM, Bill Plant, Zutobi.

### Well-designed brands for the same audience, and award-level small services (11 sites) [measured]
Duck English (language school, Awwwards Site of the Day, January 2024), Cuvva and Marshmallow and Veygo
(car insurance for learners and young drivers), Tend (dentist, the best "nervous customer" site I know),
101 Physio and Foothills Physical Therapy (both Awwwards nominees, 2025), GOV.UK "Learn to drive a car: step by step",
Monzo, Citymapper, and the Design Museum's page on British road signs.

### What the category looks like [judgement, from the captures]
- **Most driving school sites are the same page.** A stock photo of a car or a smiling learner, a red, blue or orange
  palette, a row of badges, three service cards with icons, a star rating, and a footer. Step In Drive, Pull Up,
  Kruzee and the current MMDriving site could swap content and nobody would notice.
- **Two stand out.** TOFU Driving has a point of view: a 130px serif headline ("Learn to drive, without the stress"),
  a drawn road, a mascot, cream and navy. Rimmers is the opposite kind of good: almost nothing on the page, bold blue
  shapes, and the price in the heading ("Driving Lessons From £65 per 90 Minutes").
- **The best ideas are outside the category.** Tend opens with the fear, not the service ("Look forward to going to
  the dentist"), and keeps "Book now" and the phone number beside each other everywhere. GOV.UK reduces learning to
  drive to a numbered list of seven plain steps. Cuvva and Marshmallow talk to seventeen-year-olds without talking down.

### Measured type and layout [measured, 1440 wide]
| Site | Largest heading | Next size | Body | Line height | Notes |
|---|---|---|---|---|---|
| TOFU Driving | 130px, weight 600, tracking -0.07em | 94px | 20px | 1.6 | Fraunces + Hanken Grotesk |
| Rimmers | 80px, weight 300 | 26px | 18px | 1.8 | huge jump between sizes |
| Drivisa | 64px, weight 700, -0.022em | 54px | 21px | 1.62 | |
| RED | 90px, weight 900 | 70px | 16px | 1.5 | Gotham |
| Marshmallow | 80px, weight 700, line height 0.94 | 56px | 18px | 1.2 to 1.5 | Circular |
| Veygo | 72px, -0.04em | 60px | 22px | 1.2 | custom face |
| Cuvva | 64px, weight 900 | 48px | 18 to 20px | 1.56 | Neue Haas |
| Tend | 63px, weight 700 | 48px | 17px | 1.45 | Nantes serif + Founders Grotesk |
| Foothills PT | 59px, weight 500 | 28px | 26px lead, 18px body | 1.5 | Young Serif + Geologica |
| GOV.UK | 36px, weight 700 | 24px | 19px | 1.32 | GDS Transport, one face only |
| MMDriving now | 68px | 40px | 15 to 16px | 1.7 | Clash Display + Satoshi |

What the good ones share: one very large heading (60 to 130px) with tight line height (0.94 to 1.05) and slightly
negative tracking, body text of 18 to 21px on desktop, and a big drop between the heading and everything else.

### On a phone [measured, 390 wide]
| Site | Body | Side margin | Largest heading | Characters a line |
|---|---|---|---|---|
| TOFU | 14px | about 14px | 50px | 29 |
| Rimmers | 18px | 20px | 32px | 32 |
| Tend | 17px | 16px | 39px | varies |
| Foothills | 16px | 14px | 40px | 32 |
| Drivisa | 15px | 14px | 48px | 35 |
| Marshmallow | 18px | 26px | 56px | 30 |
| MMDriving now | 14.4px, seven pieces of text under 12px | 16px | 42px | 37 |

Target for the redesign: body 17 to 18px, margin 20px, largest heading 40 to 52px, nothing under 13px,
every tap target at least 44px.

---

## 2. What makes a learner pick an instructor

- **They check the badge.** The first check in every "how to choose" guide is whether the instructor is a fully
  qualified ADI (green badge). [article: passrates.uk]
- **Local test routes matter.** "Familiarity with the local test routes" is named as one of the biggest differences
  between people who pass and people who don't. [article: passrates.uk]
- **They want a calm teacher.** "An instructor who panics on a roundabout teaches you to panic on roundabouts."
  [article: passrates.uk]
- **They want honesty about readiness and cost.** Typical UK prices are £35 to £45 an hour outside big cities, and
  block bookings usually save a few pounds an hour. Learners compare prices, so hiding them costs trust. [article]
- **Reviews.** 97% of people read reviews for local businesses and 41% always do. [article: BrightLocal 2026]
  MMDriving has no confirmed reviews yet, so the site must earn trust another way (see section 4).
- **The phone is the main route.** 60% of smartphone users have contacted a business straight from search results by
  tapping to call. [article: Google, via several summaries]

## 3. Conversion findings used

| Finding | Source | What it changes |
|---|---|---|
| Users spend about 80% of their attention above the fold | NN/g, via summaries | The first screen must say what, where, and how to book |
| Headlines that name a specific outcome or number convert better (78% of top-quartile pages do this, 22% of median pages) | roast.page hero statistics | The headline names the service and the place, not a slogan |
| One clear primary action beats several competing ones | several | One yellow button; the phone number is a plain link beside it |
| Every extra form field costs completions (Baymard: roughly 4 to 7% each; NN/g: cut every field you can) | Baymard, NN/g | Form cut from six fields to four, two of them optional |
| A sticky call-to-action bar on mobile lifted conversions 31% across 58 million sessions | Contentsquare, via summaries | Keep the bottom Call / Book bar on phones |
| Trust signals can lift conversion by up to 20%; without reviews, use certification, clear contact details and clear policies | several | DVSA approval, DBS check, cancellation terms and hours are stated plainly, near the buttons |
| Local service sites typically convert 2 to 5% | several | Sets expectations for the client |

**Not used, on purpose:** countdown timers, "only 2 spaces left", pop-ups, and auto-playing video. The current site
says "Spaces available this week" and "Spots fill up fast". Those are claims nobody has checked and they read as
pressure, which is the opposite of what a nervous learner needs. They are removed until the client can confirm them.

## 4. Earning trust without reviews [judgement]
The client has not yet supplied real reviews or a pass rate, so the page cannot lean on stars. It leans on:
1. **Looking like an authority.** The whole design borrows the look of official road signs (section 6).
2. **Being specific.** Six named towns, opening hours, the cancellation rule, what a first lesson is like.
3. **Being useful before asking for anything.** The route from provisional licence to pass, with official links.
4. **Being honest.** "Prices on request" is said plainly with the reason, and nothing is claimed that is not confirmed.

The client does not want a photograph on the site. In its place the instructor section tells visitors what they
can check for themselves: DVSA approval, the DBS check, and the green badge every approved instructor must show in the
windscreen. Reviews, a pass rate and prices each have a place ready in the data file for the day they are confirmed.

---

## 5. Banned: the "made by AI" look

Why it happens: asked for "a nice landing page", a language model returns the average of every landing page.
The tells are the most common ideas used together. The current MMDriving site has fourteen of them.

**Never do these on this site:**

Type
1. Inter, Roboto, Poppins, Space Grotesk, Geist or a system font as the main face.
2. One word of the headline in a serif italic or a second colour.
3. Sizes that step evenly (16, 24, 32) with no dramatic jump.
4. Small all-caps labels with wide tracking above every section.

Colour
5. Purple or teal gradients; any gradient used as decoration.
6. Glows, blurred colour blobs, coloured shadows.
7. A soft drop shadow on every box.
8. A faint dot grid or line grid behind the hero.

Layout
9. A pill badge with a pulsing dot above the headline.
10. A row of three statistics under the hero.
11. A floating card beside the hero with ticks in it.
12. Three or six identical rounded cards with an icon on top.
13. A pricing table of three cards with the middle one raised.
14. Numbered step cards joined by arrows.
15. The same corner radius and the same padding on everything.
16. Sections that alternate two background colours in a fixed rhythm.
17. A dark "Ready to get started?" banner before the footer.
18. Glass blur panels.

Copy
19. Weightless slogans ("Pass your test. First time.", "Drive with confidence").
20. Promises nobody can keep, and urgency nobody has checked.
21. Em dashes, "seamless", "elevate", "unlock", "journey" as filler.
22. Buttons that say "Get started" or "Learn more".

Imagery and motion
23. Stock photos of smiling learners holding keys.
24. Thin generic line icons (the Lucide set the current site uses on every card).
25. The same fade-up on every element.
26. Hover states that only change opacity.

**Audit of the current site against this list:** 4 (section labels), 6 and 8 (hero circles and grid), 7, 9 (the DVSA
chip with a dot), 10 (6 towns / Years / DVSA), 11 (the "Spaces available" card), 12 (services), 13 (pricing),
14 (how it works), 15, 17 (CTA banner), 19, 20, 21, 24, 25. That is why it looks like a template.

---

## 6. The new look: British road signs

### Why this and nothing else [judgement]
Every learner is studying road signs for the theory test. The instructor's whole job is teaching people to read the
road. And the British sign system, designed by Jock Kinneir and Margaret Calvert and in use since 1965, is one of the
most admired pieces of information design in the world: built to be read in a glance by a nervous person moving at
speed. A nervous learner looking at a phone is the same problem. No other driving school in the 17 I looked at uses it.

It also answers the trust problem: the page looks like something official, without pretending to be.

### The system, translated
| On the road | On the page |
|---|---|
| Green primary-route sign, white lettering, yellow route numbers | The hero and the main panels. Yellow is kept for the one thing to press |
| White local sign with a black border | Cards, the form, the questions |
| Blue motorway gantry with one arrow per lane | Three ways to pay: "pick a lane" |
| Blue countdown markers (three bars, two, one) before a junction | The three steps to a first lesson |
| Map-type roundabout sign with a town on each arm | The six towns covered |
| Rectangular blue information sign | Facts: DVSA approved, dual controls, hours |
| Red L plate | The mark for anything about being a learner |
| Dashed centre line, give-way triangles | Dividers and the line that runs down the page |
| Mixed-case lettering, never all capitals | No all-caps anywhere |
| Lighter lettering on dark signs, heavier on light | Weight 500 on green and blue, 700 to 800 on white |

Colour has one job each, like the real system: **green** is the main surface, **yellow** is the thing to press,
**blue** is information, **red** is only the L plate and errors, **black on white** is everything you read.

### Typeface
The real sign lettering is Transport. The free copies of it are licensed for private, non-commercial use only
[article: roads.org.uk], and the commercial versions cost money the client is not spending.
I compared ten open-licence faces set as sign text (`_research/shots/_specimen.jpg`, `_specimen2.jpg`).

The first build used Atkinson Hyperlegible Next. On review its zero has a slash through it, which makes the phone
number, the most important thing on the page, look unfamiliar (and would do the same to prices). The site now uses
**Public Sans**: the same tailed lowercase l and open shapes as Transport, a plain zero, a heavy weight that holds up
at 130px, and the same kind of origin (it was drawn for a government design system, as GDS Transport was for GOV.UK).
One family, no second face, exactly like the signs. It is served from the site itself.

### Sizes and spacing (from section 1)
- Headline: 44px on a phone up to 128px on a wide screen, line height 0.98, tracking -0.02em.
- Section headings: 32 to 64px, line height 1.03.
- Lead text 22 to 24px. Body 18 to 19px (17px on phones) at line height 1.5. Smallest text 15px.
- Lines of 45 to 70 characters on desktop, 30 to 40 on phones.
- Spacing on an 8px step. Sections 96 to 168px apart on desktop, 80 to 104px on phones.
- Page margin 20px on phones up to 56px on desktop. Twelve columns.
- Signs have a white inner border and corners of about 2% of their width, like the real ones. Nothing else is rounded
  the same way: buttons are sign-shaped (some with a pointed end), and text panels are square.

### The wow moments [judgement]
1. **The first screen is a road sign you could stand in front of.** Full width, green, with the headline as the sign.
2. **The towns are a real roundabout sign,** drawn to the official layout.
3. **Paying is a motorway gantry.** Three lanes, one recommended.
4. **A centre line runs down the page** and the three countdown markers lead to the booking form, the way they lead
   to a junction.
Each of these is also the clearest way to show that piece of information. None is decoration only.

### Motion
- Signs are "put up": each panel wipes open once as it enters the screen. Arrows draw themselves.
- Nothing follows the pointer. Nothing loops. Nothing moves if the visitor has asked for reduced motion.
- Nothing is hidden unless the script that reveals it is running, and there are safety nets (the lesson from the
  portfolio, where panels once stayed empty).

---

## 7. Structure

Adopted from the best fit, not invented: **GOV.UK's step-by-step** for the order of a learner's questions,
**Tend** for how a nervous customer is spoken to and how booking stays in reach, **Rimmers** for saying less,
and **TOFU** for scale and confidence.

1. **Sign** (first screen): what, where, book or call. One line of facts.
2. **Your instructor:** Mohammed in his own words, and what a lesson with him is like.
3. **Lessons:** six kinds as one list in three groups (learning, after you pass, coming back), not six cards.
4. **Ways to pay:** the gantry. Cancellation rule beside it. Test-day lesson underneath.
5. **Where:** the roundabout sign, six towns, test centres.
6. **From provisional licence to pass:** the whole road, with official links, and which parts are with Mohammed.
7. **Questions:** the six worries, answered.
8. **Book:** countdown markers into a four-field form, with the phone number and WhatsApp beside it.

Removed: the trust bar (it repeated the hero), the "Why choose me" grid (folded into the instructor section),
the dark call-to-action banner (the form is the call to action).

## 8. UX laws and where each one shows up

| Law | In this page |
|---|---|
| Hick's law (more choices, slower decisions) | One primary button. Six lesson types grouped into three. Three ways to pay with one recommended |
| Fitts's law (big, close targets are faster) | Call and Book sit at the thumb on phones; every target at least 44px; the form button is full width |
| Jakob's law (people expect what they know) | Logo top left, phone number top right, form at the end, and signs that mean what they mean on the road |
| Miller's law (about seven things at once) | No list longer than six; the route has five stops |
| Law of proximity and common region | Each sign panel holds one topic; the cancellation rule sits with the prices |
| Von Restorff (the odd one out is remembered) | Yellow appears only on things you press and on the recommended lane |
| Serial position (first and last are remembered) | Book is the first action and the last section |
| Goal-gradient (effort rises near the goal) | Countdown markers 3, 2, 1 before the form; the form says how long a reply takes |
| Peak-end rule | The page ends on a confirmation written in Mohammed's voice, not on a footer |
| Tesler's law (complexity has to live somewhere) | The site does the sorting: lesson type and town are choices, not typing |
| Postel's law (be liberal in what you accept) | Phone numbers are accepted with spaces, +44 or 0; errors say how to fix them |
| Aesthetic-usability effect | The sign system makes a plain page look considered, which buys patience |
| Doherty threshold (respond within 0.4s) | No images to wait for on the first screen; the button shows "Sending" at once |
| Zeigarnik effect | The route shows which stops are done with Mohammed and which are left |

## 9. States
| Thing | Loading | Error | Success |
|---|---|---|---|
| Enquiry form | Button reads "Sending" and cannot be pressed twice | Each field says what is wrong, under the field; if sending fails, the message stays typed and the phone number is offered | A confirmation in the form's place, with what happens next |
| Questions | n/a | n/a | Opens in place; one tap closes |
| Whole page | Text and signs are plain HTML and SVG, so there is nothing to wait for | A 404 page in the same sign language | n/a |
| Offline | n/a | Form tells you it could not send and keeps your words | n/a |

## 10. Review after the first build, and what changed

Honest grade of the first build: **about 8 out of 10 for experience, 6 out of 10 for conversion.**

What it did well: says what, where and how to book on the first screen at every screen size; one typeface and a
colour system where yellow only ever means "press this"; a form with every state; nothing to wait for; 100 in all
four Lighthouse categories.

What was missing, and what was done about each:

| Gap | Why it matters | Change |
|---|---|---|
| Only two ways to make contact: a form and a phone call | In a 2024 Uswitch survey of 2,000 UK adults, nearly 70% of 18 to 34 year olds preferred texting to calling and 23% never answer calls. The audience is 17 to 25 | WhatsApp is on the first sign, in the phone bar, and beside the form, each opening with a first message already written (including the lesson chosen) |
| Slashed zeros in the phone number | The number is the main conversion on a phone | Typeface changed to Public Sans |
| No privacy information beside the form | UK GDPR: people must be told who gets their details, why, who else sees them and how long they are kept, at the moment the details are collected | "How your details are used" opens under the button. The client should confirm the wording; the ICO has a free generator for a full notice |
| Nothing said about cost or commitment at the moment of sending | "Doubt remover" lines under a button are a well-evidenced lift (one published test: 9.5% to 21.3%) | "Nothing to pay now and no commitment" under the button |
| "I reply within a few hours" shown at midnight | An untrue promise costs trust | The promise follows the clock: within a few hours in lesson hours, "tomorrow morning" after 8pm, "this morning" before 7am |
| A refresh or accidental Back lost what was typed | Lost work is the classic form failure | The draft is kept in the browser tab until it is sent |
| Offline looked the same as a broken form service | Different problems need different advice | A separate message for each |
| No protection from automated spam | The client reads every enquiry on his phone | A hidden field only robots fill in; those get a thank you and nothing is sent |
| The menu did not show where you were | Wayfinding on a long page | The link for the section on screen is underlined |
| Focus stayed behind when a link jumped to a section; the page behind the open phone menu was still reachable | Keyboard and screen-reader users were left in the wrong place | Focus moves with the jump; the page behind the menu is inert |
| Parents were not spoken to | They often pay, and check credentials first | A question for parents, and "Check me before you book" in the instructor section |
| No way to tell whether the page works | Conversion cannot be improved without counting | Vercel Web Analytics (no cookies) loads on the live site only, counting enquiries sent, taps on Call and taps on WhatsApp |
| No prices | Hiding prices loses visitors silently; learners compare on price | Cannot be fixed without the client. Each way to pay has a `price` field that shows on the sign the moment a figure is confirmed |
| No reviews or pass rate | 97% of people read reviews for local businesses | Cannot be fixed without the client |

Grade after this pass: **about 9 for experience, 7 for conversion.** The ceiling on conversion is the two things
only the client can supply: prices and real reviews.

Still open: a real test with learners and a parent; per-town pages for local search; the canonical address in
`index.html` points at mmdriving.co.uk, which must be the real domain before launch.

Extra sources for this section: Uswitch survey via Newsweek (https://www.newsweek.com/gen-z-problem-telephobia-2032493),
CNBC on phone anxiety (https://www.cnbc.com/2025/02/17/gen-z-are-taking-telephobia-courses-to-learn-the-lost-art-of-a-call.html),
Computer Weekly on the ICO privacy notice tool (https://www.computerweekly.com/news/366605875/ICO-launches-privacy-notice-tool-for-SMEs),
Venue on microcopy (https://venue.cloud/news/insights/small-microcopy-tweaks-that-quietly-boost-conversions),
Trusti on hidden prices (https://business-blog.trusti.com/why-hiding-your-prices-is-costing-you-more-than-you-think/).

## 11. Sources
- passrates.uk, How to choose a UK driving instructor: https://passrates.uk/guide/choosing-driving-instructor-uk
- Colorlib, 22 best driving school website examples: https://colorlib.com/wp/driving-school-website-examples/
- Brand Glow Up, driving school web design examples: https://www.brandglowup.com/examples-driving-school-web-design/
- Awwwards, Duck English (Site of the Day): https://www.awwwards.com/sites/duck-english
- Awwwards, 101 Physio: https://www.awwwards.com/sites/101-physio
- Awwwards, Foothills Physical Therapy: https://www.awwwards.com/sites/foothills-physical-therapy
- BrightLocal, Local Consumer Review Survey 2026: https://www.brightlocal.com/research/local-consumer-review-survey/
- Baymard, checkout form fields: https://baymard.com/blog/checkout-optimization-from-16-fields-to-8
- NN/g, web form design: https://www.nngroup.com/articles/web-form-design/
- roast.page, hero section statistics: https://roast.page/stats/hero-section-statistics
- Conversion Rate Experts, sticky call to action: https://conversion-rate-experts.com/sticky-cta-win-report/
- Design Museum, British road signs: https://designmuseum.org/discover-design/all-stories/british-road-signs
- Wikipedia, Transport (typeface): https://en.wikipedia.org/wiki/Transport_(typeface)
- roads.org.uk, fonts and their licence: https://www.roads.org.uk/fonts
- GOV.UK, Learn to drive a car step by step: https://www.gov.uk/learn-to-drive-a-car
