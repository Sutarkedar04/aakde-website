/*
  One entry per examination. A test belongs to an exam through `exam: '<id>'` in tests.js.

  Every field except id and name is optional. A section only appears when its field is filled in,
  so an exam can start with just a name and grow later.

    text     short overview paragraph
    facts    [[label, value], ...] shown as "At a glance"
    pattern  { columns: [...], rows: [[...], ...], totals: [[...]], notes: [...] }
    steps    ordered preparation guidance
    faqs     [{ q, a }, ...]
    note     small print under the details

  Facts here are indicative. Exam rules change every cycle, so re-check them against the official
  notification before publishing a new cycle.
*/
export const exams = [
  {
    id: 'iss',
    name: 'Indian Statistical Service (ISS)',
    text: 'The ISS is a Group A central service that recruits statisticians for the Government of India. UPSC runs the examination every year, in the same notification as the Indian Economic Service. Statistics decides most of the result, so a strong grounding in the subject matters more than general knowledge.',
    facts: [
      ['Conducted by', 'Union Public Service Commission (UPSC)'],
      ['Notification', 'Issued together with the Indian Economic Service (IES)'],
      ['Written examination', '1000 marks across six papers'],
      ['Interview (viva voce)', '200 marks'],
      ['Total marks', '1200'],
      ['Eligibility', 'Bachelor’s degree with Statistics, Mathematical Statistics or Applied Statistics as a subject'],
      ['Age', '21 to 30 years, with relaxation for reserved categories'],
      ['IES and ISS', 'A candidate can compete for only one of the two services'],
    ],
    pattern: {
      columns: ['Paper', 'Type', 'Marks', 'Time'],
      rows: [
        ['General English', 'Subjective', '100', '3 hours'],
        ['General Studies', 'Subjective', '100', '3 hours'],
        ['Statistics I', 'Objective', '200', '2 hours'],
        ['Statistics II', 'Objective', '200', '2 hours'],
        ['Statistics III', 'Descriptive', '200', '3 hours'],
        ['Statistics IV', 'Descriptive', '200', '3 hours'],
      ],
      totals: [
        ['Written total', '', '1000', ''],
        ['Viva voce', '', '200', ''],
      ],
      notes: [
        'Statistics carries 800 of the 1000 written marks.',
        'Statistics I and II each have 80 objective questions to finish in 120 minutes.',
        'Statistics III and IV are written answers, split between short problems and long questions.',
        'In Statistics IV you choose two sections out of seven, so decide early and prepare those deeply.',
      ],
    },
    steps: [
      { title: 'Learn the syllabus', text: 'Go through all four Statistics papers section by section, and pick your two Statistics IV sections early.' },
      { title: 'Build the objective base', text: 'Statistics I and II are worth 400 marks together, and fast, accurate objective practice pays off here.' },
      { title: 'Start written answers early', text: 'Statistics III and IV need handwritten answers under time pressure. Writing one full answer a week from the start beats a rush at the end.' },
      { title: 'Work through past papers', text: 'Solve previous papers topic by topic, and note which concepts come back year after year.' },
      { title: 'Add General Studies alongside', text: 'Cover current affairs with a focus on official statistics releases, in parallel with the main subject.' },
      { title: 'Keep English for last', text: 'General English needs the least time, so revise it in the closing stretch.' },
    ],
    faqs: [
      { q: 'Do I need a Master’s degree?', a: 'No. A Bachelor’s degree with Statistics, Mathematical Statistics or Applied Statistics as one of the subjects is enough. IES, in contrast, asks for a postgraduate degree.' },
      { q: 'How many papers are there?', a: 'Six: General English, General Studies and four Statistics papers. Statistics I and II are objective, and Statistics III and IV are descriptive.' },
      { q: 'What are the total marks?', a: '1200 in total, made up of 1000 for the written examination and 200 for the viva voce.' },
      { q: 'Can I apply for both IES and ISS?', a: 'No. You can compete for only one of the two services in a cycle.' },
      { q: 'How is this demo test related to the real paper?', a: 'It is a short practice set covering statistics, probability, mathematics and aptitude, written to show how a SARAV test works. It is not an official paper.' },
    ],
    note: 'These details are indicative and can change every cycle. Check the latest UPSC notification before you apply.',
  },

  // The exams below have no details yet. Fill in the same fields as ISS when you have them.
  { id: 'acet', name: 'ACET (Actuarial Common Entrance Test)' },
  { id: 'mba', name: 'MBA Entrance Examinations' },
  { id: 'set', name: 'SET (State Eligibility Test)' },
  { id: 'net', name: 'NET (National Eligibility Test)' },
]