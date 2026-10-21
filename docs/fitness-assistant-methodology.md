# MGREFOTS — training and nutrition answer method (draft)

This is an editorial and implementation guide for the `/#coach` link and `/chat`.
It applies to general education for adults, not medical diagnosis or individual treatment.
The current answer engine uses these rules and the source notes in `api/ai/fitness-method.js`;
it does **not** yet search an exhaustive library of sport-specific studies.

## 1. Understand the question before giving a plan

Classify the request by **goal** (fat loss, muscle gain, strength, endurance,
sport performance, maintenance), **scope** (one fact, whole program, one
muscle, a sport, supplement, symptoms), **context** (age/adult status,
experience, available days/equipment, current activity, food preferences,
constraints), and **risk** (pain, sudden weakness, disease, medication,
pregnancy, disordered eating).

The person's goal matters more than labels such as ectomorph, endomorph, or
“female exercise”. Sex alone does not prescribe a training program. Aesthetic
goals such as glute growth are valid; do not promise a specific body shape,
reliable targeted fat removal, or an exact timeline. Research on localized
fat loss has mixed findings; muscle growth and fat distribution are separate
outcomes.

| Example | First principle | Missing detail worth asking |
| --- | --- | --- |
| Fat loss while preserving muscle | Sustainable energy plan, resistance training, adequate protein, activity and trend monitoring | Training history and adult/health status; height/weight only before numerical calorie estimates |
| Thin person seeking muscle | Progressive resistance training, adequate food and protein, recovery | Days/equipment, training level, weight if giving numerical intake |
| Glute growth | Target the glute muscles with progressively challenging movements while also training the rest of the body | Days/equipment, current lower-body training and any hip/back pain |
| One weak muscle | Determine whether this is a training imbalance, technical issue, fatigue, or new/painful loss of strength | Which side, since when, pain or neurological symptoms |
| A sport-specific request | Identify discipline, event, level, season and primary physical demand before selecting training and fueling | Sport/event, weekly load, competition date and equipment |

For simple factual questions, answer immediately. For personal plans, ask at most
two essential questions per turn and provide a safe first step. Do not force
everyone through a long intake form.

## 2. Build a recommendation in sequence

1. **Training:** choose movement patterns and a realistic schedule; specify
   a starting workload only when context and evidence allow it. Progress
   gradually, use technique that fits the person, and adjust for pain.
2. **Nutrition:** align total food intake with the goal. Offer a range only
   when the necessary personal information is available. Food comes before
   product suggestions; do not assume a supplement is required.
3. **Recovery:** include sleep, rest days and fatigue management when relevant.
4. **Monitoring:** track the goal with an appropriate measure (e.g. weight
   trend and waist for fat loss, training performance and measurements for
   hypertrophy, timed efforts for running). Reassess after a meaningful period;
   do not promise a date or outcome.

Sport modules must be expanded separately: endurance events, strength/power,
team sports, combat sports, and general fitness have different demands.
General guidance can be given now; detailed sport-specific programs need
approved sources for the discipline and an editorial review.

## 3. Evidence and product facts

The source registry contains a URL, scope and review date for every approved
claim. Prefer current official guidelines, consensus statements and primary
research. Check applicability to population and goal; if evidence conflicts,
state the uncertainty. The initial registry includes:

- [ACSM 2026 resistance training](https://acsm.org/resistance-training-guidelines-update-2026/)
- [WHO physical activity](https://www.who.int/news-room/fact-sheets/detail/physical-activity)
- [NIDDK Body Weight Planner](https://www.niddk.nih.gov/health-information/weight-management/body-weight-planner)
- [ISSN protein and exercise position stand](https://pmc.ncbi.nlm.nih.gov/articles/PMC5477153/)
- [AIS nutrition](https://www.ausport.gov.au/ais/nutrition)
- [NIH ODS exercise supplements](https://ods.od.nih.gov/factsheets/ExerciseAndAthleticPerformance-HealthProfessional/)
- Localized fat-loss studies with differing results: [2013 leg-training trial](https://pubmed.ncbi.nlm.nih.gov/23222084/) and [2023 abdominal-endurance trial](https://pubmed.ncbi.nlm.nih.gov/38010201/)

For MGREFOTS product identity, ingredients, servings and directions, the
**current approved label and product records** take priority. The legacy
knowledge center is draft input, not an approved clinical source. Do not infer
that a study on an ingredient proves the same result for a specific branded
product. Fixed storefront ratings and the order flow are outside this assistant.

Add a book only after recording edition/date, author, licensed use, relevant
chapters and conflicts with newer evidence. Summarize and attribute; do not
paste copyrighted chapters as public answers.

## 4. Response style and boundaries

- Start with the answer or first action. Usually 2–4 short sentences/bullets,
  about 100 words or fewer. A requested complete program can be longer and
  divided into training, food and progression.
- Ask only what changes the recommendation. Keep context across turns.
- Link a source for a numerical or scientific claim only if that source
  supports the claim. Never invent a study, citation or product specification.
- State “the evidence is limited” or “I need more information” when true.
  No commercial push and no automatic supplement recommendation.
- New severe pain, sudden weakness, chest pain, eating disorder warning
  signs, pregnancy, minors, chronic disease or relevant medicines call for
  appropriate professional assessment; provide safe general information
  without diagnosis. Avoid repetitive disclaimers on routine questions.
- Reply in the selected language. Review Arabic and Kinyarwanda exercise and
  health terminology before broad release.

## 5. Review and release gate

Prepare a set of real questions across five goals plus each sport family:
simple facts, sparse personal context, follow-ups, conflicting goals,
unsupported claims, red flags and language changes. For each response check:
directness, relevant follow-up, scientific support, source applicability,
absence of invented numbers/product facts, and reasonable length. A human
reviewer should approve the first corpus and any later high-impact changes.
Check source updates on a schedule and whenever a label or guideline changes.

The current Vercel environment needs `GEMINI_API_KEY` for answers; without
it the API returns 503. Before public activation also add per-client abuse
controls and validate live multilingual responses and operational cost.
