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

  {
    id: 'acet',
    name: 'ACET (Actuarial Common Entrance Test)',
    text: 'ACET is the entry test for the actuarial profession in India. The Institute of Actuaries of India (IAI) runs it several times a year, and clearing it is the first step towards student membership of the Institute and its actuarial exams. It checks quantitative and reasoning skills across five sections.',
    facts: [
      ['Conducted by', 'Institute of Actuaries of India (IAI)'],
      ['Purpose', 'Entry test for IAI student membership and the actuarial exams'],
      ['Mode', 'Computer-based, held online with remote proctoring in recent sessions'],
      ['Duration', '3 hours'],
      ['Total marks', '100'],
      ['Negative marking', 'None'],
      ['Qualifying score', '50 out of 100 in recent sessions'],
      ['Frequency', 'More than once a year'],
      ['Eligibility', 'Candidates who have completed Class 12 or are appearing for it. Check IAI’s current rules for the exact criteria'],
    ],
    pattern: {
      columns: ['Detail', 'Value'],
      rows: [
        ['Sections', 'Mathematics, Statistics, Data Interpretation, English, Logical Reasoning'],
        ['Question type', 'Multiple choice'],
        ['Total marks', '100'],
        ['Marking', 'No marks deducted for wrong answers'],
      ],
      notes: [
        'IAI publishes the syllabus on its website, and the marks for each section are set there.',
        'IAI has also offered an online mock test before each session so candidates can see the format.',
      ],
    },
    steps: [
      { title: 'Get the official syllabus', text: 'Download the current syllabus from the IAI website and mark which topics you are weakest in.' },
      { title: 'Strengthen mathematics and statistics', text: 'These two sections are the core of the paper, so build the basics before speed.' },
      { title: 'Practise data interpretation and reasoning', text: 'Work through tables, charts and logic sets under a timer, because speed matters here.' },
      { title: 'Read for the English section', text: 'Short daily reading and comprehension practice is enough to keep this section steady.' },
      { title: 'Use the mock tests', text: 'Take IAI’s mock test and timed practice papers to get used to the online format and the 3-hour length.' },
      { title: 'Attempt every question', text: 'With no negative marking, a blank answer can never help you.' },
    ],
    faqs: [
      { q: 'Is there negative marking in ACET?', a: 'No. Wrong answers do not lose marks, so it is worth attempting every question.' },
      { q: 'What score do I need to qualify?', a: 'In recent sessions, 50 out of 100 was the qualifying score. Confirm the current rule with IAI.' },
      { q: 'Do I need to travel to an exam centre?', a: 'Recent sessions were held online from home with remote proctoring. The format can change, so check the latest IAI notice.' },
      { q: 'How often is ACET held?', a: 'More than once a year. IAI announces the dates on its website.' },
    ],
    note: 'These details are indicative and can change. Check the latest notice from the Institute of Actuaries of India before you apply.',
  },

  {
    id: 'mba',
    name: 'MBA Entrance Examinations',
    text: 'Admission to MBA programmes in India runs through several entrance tests. CAT, conducted by the IIMs, is the best known and is accepted by many other business schools. Others such as XAT, NMAT and SNAP differ in pattern, marking and the schools that accept them. This guide uses the CAT pattern as its reference.',
    facts: [
      ['Exam covered', 'CAT (Common Admission Test)'],
      ['Conducted by', 'One of the IIMs, on a rotating basis'],
      ['Mode', 'Computer-based test'],
      ['Language', 'English'],
      ['Sections', 'Verbal Ability and Reading Comprehension, Data Interpretation and Logical Reasoning, Quantitative Aptitude'],
      ['Duration', '120 minutes, with 40 minutes for each section'],
      ['Eligibility', 'Bachelor’s degree with the minimum marks set in the CAT information brochure'],
      ['Other exams', 'XAT, NMAT, SNAP and others have their own patterns'],
    ],
    pattern: {
      columns: ['Section', 'Questions', 'Time'],
      rows: [
        ['Verbal Ability and Reading Comprehension', '24', '40 minutes'],
        ['Data Interpretation and Logical Reasoning', '22', '40 minutes'],
        ['Quantitative Aptitude', '22', '40 minutes'],
      ],
      totals: [['Total', '68', '120 minutes']],
      notes: [
        'Recent papers carried 204 marks: 3 for each correct answer.',
        'A wrong multiple-choice answer costs 1 mark. Type-in-the-answer questions have no negative marking.',
        'Each section has its own timer, so unused time cannot be carried to the next section.',
        'The conducting IIM can change the number of questions or the marking, so confirm the pattern in the current brochure.',
      ],
    },
    steps: [
      { title: 'Learn the pattern and timing', text: 'Know the three sections, the 40-minute sectional limits and how negative marking works before you start.' },
      { title: 'Build quantitative fundamentals', text: 'Arithmetic, algebra, number systems and geometry cover most of the Quantitative Aptitude section.' },
      { title: 'Read every day', text: 'Steady reading builds the speed and comprehension that the verbal section rewards.' },
      { title: 'Practise sets for DILR', text: 'Learn to pick the sets you can finish, because choosing well matters as much as solving.' },
      { title: 'Take full-length mocks', text: 'Time yourself section by section and review every mistake after each mock.' },
      { title: 'Plan for other exams', text: 'Check which schools you want, and which entrance tests they accept, early in your preparation.' },
    ],
    faqs: [
      { q: 'Is there negative marking in CAT?', a: 'Yes, for multiple-choice questions, where a wrong answer costs 1 mark. Type-in-the-answer questions have none.' },
      { q: 'How long is the CAT exam?', a: '120 minutes in total, with 40 minutes for each of the three sections.' },
      { q: 'Is CAT the only MBA entrance exam?', a: 'No. XAT, NMAT, SNAP and several state and university tests also lead to MBA admission, and each school lists the scores it accepts.' },
      { q: 'Will the pattern stay the same every year?', a: 'Not always. The conducting IIM can change the question count or marking, so read the current brochure.' },
    ],
    note: 'These details are indicative and follow recent CAT papers. Check the latest official CAT brochure before you apply.',
  },

  {
    id: 'set',
    name: 'SET (State Eligibility Test)',
    text: 'The State Eligibility Test decides eligibility for the post of Assistant Professor in a state’s universities and colleges. Each state or group of states has its own nodal agency. In Maharashtra and Goa, Savitribai Phule Pune University (SPPU) conducts the MH-SET, and this guide uses it as the reference. Another state’s SET has its own bulletin, so details can differ.',
    facts: [
      ['Exam covered', 'Maharashtra State Eligibility Test (MH-SET)'],
      ['Conducted by', 'Savitribai Phule Pune University, as the nodal agency for Maharashtra and Goa'],
      ['Purpose', 'Eligibility for the post of Assistant Professor'],
      ['Mode', 'Pen and paper, with OMR answer sheets'],
      ['Subjects', '32'],
      ['Eligibility', 'Master’s degree from a UGC-recognised university, with the minimum marks in the information bulletin'],
    ],
    pattern: {
      columns: ['Paper', 'Content', 'Questions', 'Marks', 'Time'],
      rows: [
        ['Paper I', 'Teaching and research aptitude', '50', '100', '1 hour'],
        ['Paper II', 'The subject you choose', '100', '200', '2 hours'],
      ],
      totals: [['Total', '', '150', '300', '3 hours']],
      notes: [
        'Every question is multiple choice and compulsory, and each carries 2 marks.',
        'No marks are deducted for wrong answers.',
        'Paper I is common to all candidates, and Paper II is in your chosen subject.',
      ],
    },
    steps: [
      { title: 'Pick your subject and read its syllabus', text: 'Download the syllabus for your subject from the SPPU SET website before you plan anything else.' },
      { title: 'Prepare Paper I properly', text: 'It is common to everyone and worth a third of the marks, so go through every unit of it.' },
      { title: 'Study Paper II topic by topic', text: 'It carries 200 marks, so cover your subject fully and revise often.' },
      { title: 'Solve previous papers', text: 'Past papers show how questions are framed and which topics return.' },
      { title: 'Practise OMR style, under time', text: 'Do timed sets on paper, because the real test is pen and paper.' },
      { title: 'Attempt every question', text: 'There is no negative marking, so leave nothing blank.' },
    ],
    faqs: [
      { q: 'Who conducts the Maharashtra SET?', a: 'Savitribai Phule Pune University, which is the nodal agency for Maharashtra and Goa.' },
      { q: 'What is the difference between SET and NET?', a: 'NET is a national test conducted by the NTA. SET is held at state level by a nodal agency, such as SPPU in Maharashtra and Goa.' },
      { q: 'Is there negative marking?', a: 'No. Every question carries 2 marks and wrong answers lose nothing.' },
      { q: 'How many papers are there?', a: 'Two, taken in one sitting: Paper I of 100 marks and Paper II of 200 marks.' },
    ],
    note: 'These details are indicative and can change every cycle. Check the latest SET information bulletin before you apply.',
  },

  {
    id: 'net',
    name: 'NET (National Eligibility Test)',
    text: 'UGC NET is conducted by the National Testing Agency (NTA). It decides eligibility for Assistant Professor and for the Junior Research Fellowship across many subjects. Paper I is common to all candidates and Paper II is in your chosen subject. Both are taken together in one continuous 3-hour sitting.',
    facts: [
      ['Conducted by', 'National Testing Agency (NTA)'],
      ['Purpose', 'Eligibility for Assistant Professor and for the Junior Research Fellowship'],
      ['Mode', 'Computer-based test'],
      ['Language', 'English and Hindi'],
      ['Duration', '3 hours, with no break'],
      ['Total', '150 questions and 300 marks'],
      ['Negative marking', 'None'],
      ['Eligibility', 'Master’s degree, with the minimum marks set in the NTA information bulletin'],
    ],
    pattern: {
      columns: ['Paper', 'Content', 'Questions', 'Marks'],
      rows: [
        ['Paper 1', 'Teaching and research aptitude, common to all', '50', '100'],
        ['Paper 2', 'The subject you choose', '100', '200'],
      ],
      totals: [['Total', '', '150', '300']],
      notes: [
        'All questions are multiple choice and compulsory, with 2 marks for each correct answer.',
        'No marks are deducted for wrong answers.',
        'The two papers share one 3-hour limit, so you decide how to split your time.',
      ],
    },
    steps: [
      { title: 'Choose your subject and read the syllabus', text: 'Get the official syllabus for Paper 1 and for your Paper 2 subject from the NTA website.' },
      { title: 'Treat Paper 1 as a full paper', text: 'It is a third of the marks and is the same for everyone, so it rewards steady preparation.' },
      { title: 'Cover Paper 2 in depth', text: 'It carries 200 marks, so study the subject unit by unit and revise regularly.' },
      { title: 'Solve previous papers', text: 'Past papers show the question style and the topics that return.' },
      { title: 'Practise the full 3 hours', text: 'Take timed sets of both papers together so you learn how to split your time.' },
      { title: 'Attempt every question', text: 'With no negative marking, an unanswered question can only cost you.' },
    ],
    faqs: [
      { q: 'How many papers are there in UGC NET?', a: 'Two, taken in one sitting. Paper 1 has 50 questions and Paper 2 has 100 questions.' },
      { q: 'Is there negative marking?', a: 'No. Each correct answer gives 2 marks, and wrong answers lose nothing.' },
      { q: 'How long is the exam?', a: '3 hours in total, without a break between the two papers.' },
      { q: 'In which languages is it held?', a: 'English and Hindi.' },
    ],
    note: 'These details are indicative and can change every cycle. Check the latest NTA information bulletin before you apply.',
  },
]