/*
  Test content. IMPORTANT: the questions below are generic PRACTICE PLACEHOLDERS written to demo the feature.
  They are not real ISS questions. Replace them with the owner's question set before launch.

  id       unique per test, used in the URL: /sarav/test/<id>
  exam     the id of an exam in exams.js (e.g. 'iss', 'acet')
  topic    groups questions in the result analysis
  answer   index (0-3) of the correct option in `options`

  To add a demo test for another exam, copy the object below, change id / exam / title / questions,
  and add it to the array. That exam's row in SARAV changes from "Coming soon" to "1 test".
*/
export const tests = [
  {
    id: 'iss-demo-1',
    exam: 'iss',
    title: 'ISS Quantitative Mock Test 1 (Demo)',
    duration: 20, // minutes
    marks: { correct: 1, wrong: 0.25 },
    questions: [
      { id: 'q1', topic: 'Statistics', text: 'The mean of 10 observations is 20. If one observation, 14, is replaced by 34, the new mean is', options: ['20', '21', '22', '24'], answer: 2, explanation: 'The total rises by 34 − 14 = 20. Spread over 10 observations, the mean rises by 2, so it becomes 22.' },
      { id: 'q2', topic: 'Statistics', text: 'For the data 2, 4, 4, 4, 5, 5, 7, 9, the population variance is', options: ['4', '2', '8', '6'], answer: 0, explanation: 'The mean is 5. The squared deviations are 9, 1, 1, 1, 0, 0, 4, 16, which add up to 32. Divide by 8 to get 4.' },
      { id: 'q3', topic: 'Statistics', text: 'If the correlation coefficient between X and Y is 0.8, the coefficient of determination is', options: ['0.16', '0.80', '0.90', '0.64'], answer: 3, explanation: 'The coefficient of determination is r², and 0.8² = 0.64.' },
      { id: 'q4', topic: 'Probability', text: 'Two fair dice are thrown. The probability that the sum is 7 is', options: ['1/6', '1/12', '1/9', '5/36'], answer: 0, explanation: 'Six of the 36 equally likely outcomes give a sum of 7, so the probability is 6/36 = 1/6.' },
      { id: 'q5', topic: 'Probability', text: 'A fair coin is tossed 3 times. The probability of getting exactly 2 heads is', options: ['1/4', '1/2', '3/8', '5/8'], answer: 2, explanation: 'There are C(3,2) = 3 favourable outcomes out of 2³ = 8, so the probability is 3/8.' },
      { id: 'q6', topic: 'Probability', text: 'If P(A) = 0.5 and P(B) = 0.4, and A and B are independent, then P(A ∪ B) is', options: ['0.60', '0.70', '0.90', '0.20'], answer: 1, explanation: 'P(A ∪ B) = 0.5 + 0.4 − (0.5 × 0.4) = 0.9 − 0.2 = 0.7.' },
      { id: 'q7', topic: 'Mathematics', text: 'The limit of (sin x) / x as x approaches 0 is', options: ['∞', '0', '−1', '1'], answer: 3, explanation: 'This is a standard limit and its value is 1.' },
      { id: 'q8', topic: 'Mathematics', text: 'For x > 0, the derivative of ln(x²) with respect to x is', options: ['1/x²', '2/x', '2x', '1/x'], answer: 1, explanation: 'ln(x²) = 2 ln x, and its derivative is 2/x.' },
      { id: 'q9', topic: 'Mathematics', text: 'The value of the determinant with rows (2, 3) and (4, 5) is', options: ['−7', '2', '−2', '22'], answer: 2, explanation: 'The determinant is 2 × 5 − 3 × 4 = 10 − 12 = −2.' },
      { id: 'q10', topic: 'Aptitude', text: 'A shopkeeper marks an article 20% above its cost price and then allows a 10% discount. His profit percent is', options: ['8%', '10%', '12%', '6%'], answer: 0, explanation: 'Selling price = 1.20 × 0.90 = 1.08 times the cost price, which is a profit of 8%.' },
      { id: 'q11', topic: 'Aptitude', text: '12 workers complete a job in 15 days. How many days will 20 workers need for the same job?', options: ['8', '10', '9', '12'], answer: 2, explanation: 'The job is 12 × 15 = 180 worker-days. With 20 workers it takes 180 / 20 = 9 days.' },
      { id: 'q12', topic: 'Aptitude', text: 'Two numbers are in the ratio 3 : 5 and their sum is 64. The larger number is', options: ['24', '40', '32', '45'], answer: 1, explanation: 'The larger number is 5/8 of 64, which is 40.' },
    ],
  },

  {
    id: 'acet-demo-1',
    exam: 'acet',
    title: 'ACET Mock Test 1 (Demo)',
    duration: 20, // minutes
    marks: { correct: 1, wrong: 0 }, // ACET has no negative marking
    questions: [
      { id: 'acet1-q1', topic: 'Mathematics', text: 'The sum of the first 20 natural numbers is', options: ['190', '200', '210', '220'], answer: 2, explanation: 'The sum of the first n natural numbers is n(n + 1)/2, so 20 × 21 / 2 = 210.' },
      { id: 'acet1-q2', topic: 'Mathematics', text: 'If log₁₀(x) = 2, the value of x is', options: ['20', '100', '200', '1000'], answer: 1, explanation: 'log₁₀(x) = 2 means x = 10², which is 100.' },
      { id: 'acet1-q3', topic: 'Statistics', text: 'The median of the numbers 3, 9, 5, 7, 11 is', options: ['5', '7', '9', '7.5'], answer: 1, explanation: 'In order the numbers are 3, 5, 7, 9, 11. The middle value is 7.' },
      { id: 'acet1-q4', topic: 'Statistics', text: 'A fair die is rolled once. The probability of getting a number greater than 4 is', options: ['1/6', '1/3', '1/2', '2/3'], answer: 1, explanation: 'Only 5 and 6 qualify, so the probability is 2/6 = 1/3.' },
      { id: 'acet1-q5', topic: 'Data Interpretation', text: 'A shop sold 40 items on Monday, 60 on Tuesday and 50 on Wednesday. What percentage of the three-day total was sold on Tuesday?', options: ['30%', '35%', '40%', '45%'], answer: 2, explanation: 'The total is 150 items. Tuesday’s share is 60 / 150 = 40%.' },
      { id: 'acet1-q6', topic: 'English', text: 'Choose the word closest in meaning to ‘scarce’.', options: ['Plentiful', 'Rare', 'Heavy', 'Costly'], answer: 1, explanation: 'Scarce means in short supply, which is closest to rare.' },
      { id: 'acet1-q7', topic: 'Logical Reasoning', text: 'Find the next number in the series 2, 6, 12, 20, 30, ?', options: ['40', '42', '44', '36'], answer: 1, explanation: 'The gaps are 4, 6, 8, 10, so the next gap is 12. 30 + 12 = 42.' },
      { id: 'acet1-q8', topic: 'Logical Reasoning', text: 'All actuaries are good at mathematics. Riya is an actuary. Which conclusion must be true?', options: ['Riya is good at mathematics', 'Riya dislikes statistics', 'Everyone good at mathematics is an actuary', 'Riya is not good at mathematics'], answer: 0, explanation: 'Riya belongs to the group of actuaries, and every actuary is good at mathematics.' },
    ],
  },

  {
    id: 'mba-demo-1',
    exam: 'mba',
    title: 'MBA Entrance (CAT-style) Mock Test 1 (Demo)',
    duration: 20,
    marks: { correct: 3, wrong: 1 }, // CAT marks multiple-choice questions +3 and -1
    questions: [
      { id: 'mba1-q1', topic: 'Quantitative Aptitude', text: 'A train 150 m long passes a pole in 10 seconds. Its speed in km/h is', options: ['45', '54', '60', '72'], answer: 1, explanation: 'Speed = 150 / 10 = 15 m/s. Multiply by 3.6 to get 54 km/h.' },
      { id: 'mba1-q2', topic: 'Quantitative Aptitude', text: 'The ages of A and B are in the ratio 3 : 5 and add up to 40 years. B’s age in years is', options: ['15', '20', '25', '30'], answer: 2, explanation: 'B’s share is 5/8 of 40, which is 25.' },
      { id: 'mba1-q3', topic: 'Quantitative Aptitude', text: 'The price of an item rises by 25%. By what percent must consumption fall to keep the total spending the same?', options: ['15%', '20%', '25%', '30%'], answer: 1, explanation: 'The new price is 1.25 times the old one, so consumption must become 1/1.25 = 0.8 of the old amount, a fall of 20%.' },
      { id: 'mba1-q4', topic: 'Quantitative Aptitude', text: 'How many different arrangements can be made from the letters of the word ‘LEVEL’?', options: ['20', '30', '60', '120'], answer: 1, explanation: 'There are 5 letters with L twice and E twice, so 5! / (2! × 2!) = 120 / 4 = 30.' },
      { id: 'mba1-q5', topic: 'Data Interpretation and Logical Reasoning', text: 'In a class of 60 students, 35 play cricket, 25 play football and 10 play both. How many play neither game?', options: ['5', '10', '15', '20'], answer: 1, explanation: 'Students playing at least one game = 35 + 25 − 10 = 50. So 60 − 50 = 10 play neither.' },
      { id: 'mba1-q6', topic: 'Data Interpretation and Logical Reasoning', text: 'Five friends stand in a line. P is to the left of Q, R is to the right of Q, S is to the left of P, and T is to the right of R. Who stands in the middle?', options: ['P', 'Q', 'R', 'S'], answer: 1, explanation: 'The conditions fix the order as S, P, Q, R, T from left to right, so Q is in the middle.' },
      { id: 'mba1-q7', topic: 'Verbal Ability and Reading Comprehension', text: 'Choose the word that best completes the sentence: The manager’s ___ remarks made a tense meeting even worse.', options: ['tactful', 'soothing', 'insensitive', 'cheerful'], answer: 2, explanation: 'Only ‘insensitive’ fits a remark that makes a tense meeting worse.' },
      { id: 'mba1-q8', topic: 'Verbal Ability and Reading Comprehension', text: 'Choose the grammatically correct sentence.', options: ['Neither of the two answers are correct.', 'Neither of the two answers is correct.', 'Neither of the two answer is correct.', 'Neither of two answers are correct.'], answer: 1, explanation: '‘Neither’ takes a singular verb, so ‘Neither of the two answers is correct’ is right.' },
    ],
  },

  {
    id: 'set-demo-1',
    exam: 'set',
    title: 'MH-SET Paper I Mock Test 1 (Demo)',
    duration: 20,
    marks: { correct: 2, wrong: 0 }, // MH-SET carries 2 marks per question, no negative marking
    questions: [
      { id: 'set1-q1', topic: 'Teaching Aptitude', text: 'Which of the following is a formative evaluation activity?', options: ['Final board examination', 'Class quiz during a unit', 'Annual result declaration', 'Entrance test'], answer: 1, explanation: 'Formative evaluation takes place during learning, to guide teaching. A class quiz during a unit is an example.' },
      { id: 'set1-q2', topic: 'Teaching Aptitude', text: 'The lecture method is best suited when a teacher wants to', options: ['Develop practical lab skills', 'Present a large amount of information to many learners at once', 'Encourage peer debate in small groups', 'Assess learners one by one'], answer: 1, explanation: 'A lecture reaches many learners efficiently, but it is less suited to practical or interactive goals.' },
      { id: 'set1-q3', topic: 'Research Aptitude', text: 'A hypothesis is best described as', options: ['A proven fact', 'A testable statement about a relationship between variables', 'A summary of the findings', 'A list of references'], answer: 1, explanation: 'A hypothesis is a statement that can be tested, and it is not yet proven.' },
      { id: 'set1-q4', topic: 'Research Aptitude', text: 'In an experiment, the group that does not receive the treatment is called the', options: ['Experimental group', 'Control group', 'Sample frame', 'Pilot group'], answer: 1, explanation: 'The control group is the comparison group that does not receive the treatment.' },
      { id: 'set1-q5', topic: 'Reasoning', text: 'Find the odd one out: 16, 25, 36, 48, 49', options: ['16', '25', '48', '49'], answer: 2, explanation: '16, 25, 36 and 49 are perfect squares. 48 is not.' },
      { id: 'set1-q6', topic: 'Communication', text: 'Which of the following is a barrier to effective classroom communication?', options: ['Clear language', 'Noise and distractions', 'Eye contact', 'Feedback from students'], answer: 1, explanation: 'Noise and distractions interrupt the message, while the other options help communication.' },
      { id: 'set1-q7', topic: 'Data Interpretation', text: 'A college had 200 students in 2023 and 250 in 2024. The percentage increase is', options: ['20%', '25%', '30%', '50%'], answer: 1, explanation: 'The increase is 50 on a base of 200, which is 25%.' },
      { id: 'set1-q8', topic: 'ICT', text: 'In education, ICT stands for', options: ['Internet and Computer Tools', 'Information and Communication Technology', 'Integrated Classroom Teaching', 'Information and Curriculum Training'], answer: 1, explanation: 'ICT stands for Information and Communication Technology.' },
    ],
  },

  {
    id: 'net-demo-1',
    exam: 'net',
    title: 'UGC NET Paper 1 Mock Test 1 (Demo)',
    duration: 20,
    marks: { correct: 2, wrong: 0 }, // UGC NET carries 2 marks per question, no negative marking
    questions: [
      { id: 'net1-q1', topic: 'Teaching Aptitude', text: 'A teacher who invites questions and builds lessons around learners’ own examples is mainly following which approach?', options: ['Teacher-centred', 'Learner-centred', 'Exam-centred', 'Textbook-only'], answer: 1, explanation: 'Building lessons around learners’ questions and examples is a learner-centred approach.' },
      { id: 'net1-q2', topic: 'Teaching Aptitude', text: 'Which of the following is a well-written learning objective?', options: ['Students will understand statistics', 'Students will be able to compute the mean of a data set', 'Students will like mathematics', 'Students will study hard'], answer: 1, explanation: 'A good objective is measurable. Computing a mean can be observed and assessed.' },
      { id: 'net1-q3', topic: 'Research Aptitude', text: 'Plagiarism in research means', options: ['Using a standard method', 'Presenting someone else’s work or words as your own', 'Repeating an experiment', 'Citing a source correctly'], answer: 1, explanation: 'Plagiarism is passing off another person’s work or words as your own.' },
      { id: 'net1-q4', topic: 'Research Aptitude', text: 'A sample in which every member of the population has an equal chance of being selected is called a', options: ['Simple random sample', 'Purposive sample', 'Quota sample', 'Convenience sample'], answer: 0, explanation: 'Equal chance of selection for every member is the defining feature of a simple random sample.' },
      { id: 'net1-q5', topic: 'Logical Reasoning', text: 'All poets are writers, and some writers are teachers. Which conclusion is certain?', options: ['All poets are teachers', 'Some poets are teachers', 'All teachers are writers', 'No certain link between poets and teachers can be drawn'], answer: 3, explanation: 'The writers who are teachers may not include any poets, so no firm conclusion about poets and teachers follows.' },
      { id: 'net1-q6', topic: 'Mathematical Reasoning', text: 'Find the next term in the series 3, 6, 12, 24, ?', options: ['30', '36', '48', '60'], answer: 2, explanation: 'Each term is double the one before, so the next is 24 × 2 = 48.' },
      { id: 'net1-q7', topic: 'Data Interpretation', text: 'A department’s budget is ₹8 lakh. If 25% goes to equipment, how much is left for other expenses?', options: ['₹2 lakh', '₹4 lakh', '₹6 lakh', '₹7 lakh'], answer: 2, explanation: '25% of 8 lakh is 2 lakh, so 8 − 2 = 6 lakh is left.' },
      { id: 'net1-q8', topic: 'Research Aptitude', text: 'Which of these is the most reliable source for a literature review?', options: ['An anonymous blog post', 'A peer-reviewed journal article', 'A social media post', 'An advertisement'], answer: 1, explanation: 'Peer-reviewed articles are checked by experts before publication, which makes them the most reliable of these.' },
    ],
  },

  {
    id: 'jam-demo-1',
    exam: 'jam',
    title: 'IIT JAM Mathematical Statistics Mock Test 1 (Demo)',
    duration: 20,
    marks: { correct: 1, wrong: 1 / 3 }, // a wrong 1-mark MCQ costs 1/3 mark
    questions: [
      { id: 'jam1-q1', topic: 'Mathematics', text: 'The value of the limit of (eˣ − 1) / x as x approaches 0 is', options: ['0', '1', 'e', '∞'], answer: 1, explanation: 'This is the derivative of eˣ at x = 0, which is e⁰ = 1.' },
      { id: 'jam1-q2', topic: 'Mathematics', text: 'The determinant of the matrix with rows (1, 2) and (3, 4) is', options: ['−2', '2', '−10', '10'], answer: 0, explanation: 'The determinant is 1 × 4 − 2 × 3 = 4 − 6 = −2.' },
      { id: 'jam1-q3', topic: 'Mathematics', text: 'The sum of the infinite series 1 + 1/2 + 1/4 + 1/8 + … is', options: ['1', '3/2', '2', '∞'], answer: 2, explanation: 'This is a geometric series with first term 1 and ratio 1/2, so the sum is 1 / (1 − 1/2) = 2.' },
      { id: 'jam1-q4', topic: 'Probability', text: 'If X follows a Binomial distribution with n = 10 and p = 0.3, the mean of X is', options: ['2', '3', '7', '3.3'], answer: 1, explanation: 'The mean of a Binomial(n, p) variable is np = 10 × 0.3 = 3.' },
      { id: 'jam1-q5', topic: 'Probability', text: 'A random variable X has E(X) = 3 and Var(X) = 4. Then E(X²) is', options: ['7', '13', '9', '16'], answer: 1, explanation: 'Var(X) = E(X²) − [E(X)]², so E(X²) = 4 + 9 = 13.' },
      { id: 'jam1-q6', topic: 'Probability', text: 'Events A and B are mutually exclusive with P(A) = 0.3 and P(B) = 0.5. Then P(A ∪ B) is', options: ['0.15', '0.8', '0.2', '0.65'], answer: 1, explanation: 'For mutually exclusive events, P(A ∪ B) = P(A) + P(B) = 0.8.' },
      { id: 'jam1-q7', topic: 'Statistics', text: 'The sample variance of the data 2, 4, 6, using divisor n − 1, is', options: ['2', '4', '8/3', '8'], answer: 1, explanation: 'The mean is 4. The squared deviations are 4, 0, 4, which add up to 8. Divide by 2 to get 4.' },
      { id: 'jam1-q8', topic: 'Statistics', text: 'In simple linear regression, if the correlation coefficient is −0.6, the coefficient of determination R² is', options: ['−0.36', '0.36', '0.6', '0.84'], answer: 1, explanation: 'R² is the square of the correlation coefficient, so (−0.6)² = 0.36.' },
    ],
  },

  {
    id: 'gate-st-demo-1',
    exam: 'gate-st',
    title: 'GATE Statistics (ST) Mock Test 1 (Demo)',
    duration: 20,
    marks: { correct: 1, wrong: 1 / 3 }, // a wrong 1-mark MCQ costs 1/3 mark
    questions: [
      { id: 'gst1-q1', topic: 'General Aptitude', text: 'A train covers 90 km in 1.5 hours. At the same speed, how far does it travel in 4 hours?', options: ['200 km', '220 km', '240 km', '260 km'], answer: 2, explanation: 'The speed is 90 / 1.5 = 60 km/h, so in 4 hours it covers 240 km.' },
      { id: 'gst1-q2', topic: 'General Aptitude', text: 'Choose the word that best completes the sentence: The report was so ___ that nobody could find a single error in it.', options: ['flawless', 'careless', 'vague', 'hurried'], answer: 0, explanation: 'A report without errors is flawless.' },
      { id: 'gst1-q3', topic: 'Probability', text: 'If X follows a Poisson distribution with mean 2, then P(X = 0) equals', options: ['e⁻²', '2e⁻²', '1 − e⁻²', 'e²'], answer: 0, explanation: 'P(X = 0) = e⁻² × 2⁰ / 0! = e⁻².' },
      { id: 'gst1-q4', topic: 'Probability', text: 'X and Y are independent with Var(X) = 2 and Var(Y) = 3. Then Var(2X − Y) is', options: ['1', '5', '11', '13'], answer: 2, explanation: 'Var(2X − Y) = 4 × Var(X) + Var(Y) = 8 + 3 = 11.' },
      { id: 'gst1-q5', topic: 'Statistics', text: 'For a sample from a normal population with known variance, the 95% confidence interval for the mean uses the', options: ['t-distribution', 'Chi-square distribution', 'Standard normal distribution', 'F-distribution'], answer: 2, explanation: 'With the variance known, the standardised sample mean follows the standard normal distribution.' },
      { id: 'gst1-q6', topic: 'Statistics', text: 'For n Bernoulli(p) trials with s successes, the maximum likelihood estimator of p is', options: ['s / (n + 1)', 's / n', '(s + 1) / n', 'n / s'], answer: 1, explanation: 'Maximising the likelihood pˢ(1 − p)ⁿ⁻ˢ gives p = s / n.' },
      { id: 'gst1-q7', topic: 'Linear Algebra', text: 'The eigenvalues of the matrix with rows (2, 0) and (0, 3) are', options: ['2 and 3', '0 and 5', '−2 and 3', '1 and 6'], answer: 0, explanation: 'For a diagonal matrix, the eigenvalues are the diagonal entries, 2 and 3.' },
      { id: 'gst1-q8', topic: 'Calculus', text: 'The value of the integral of 2x from 0 to 3 is', options: ['3', '6', '9', '18'], answer: 2, explanation: 'The integral of 2x is x², and 3² − 0² = 9.' },
    ],
  },

  {
    id: 'gate-da-demo-1',
    exam: 'gate-da',
    title: 'GATE Data Science and AI (DA) Mock Test 1 (Demo)',
    duration: 20,
    marks: { correct: 1, wrong: 1 / 3 }, // a wrong 1-mark MCQ costs 1/3 mark
    questions: [
      { id: 'gda1-q1', topic: 'General Aptitude', text: 'If 20% of a number is 30, the number is', options: ['120', '150', '180', '200'], answer: 1, explanation: 'The number is 30 / 0.20 = 150.' },
      { id: 'gda1-q2', topic: 'Probability and Statistics', text: 'A fair coin is tossed 4 times. The probability of exactly 2 heads is', options: ['1/4', '3/8', '1/2', '5/8'], answer: 1, explanation: 'There are C(4,2) = 6 favourable outcomes out of 2⁴ = 16, so the probability is 6/16 = 3/8.' },
      { id: 'gda1-q3', topic: 'Probability and Statistics', text: 'The mean of the numbers 4, 8, 6, 10, 12 is', options: ['7', '8', '9', '10'], answer: 1, explanation: 'The total is 40, and 40 / 5 = 8.' },
      { id: 'gda1-q4', topic: 'Linear Algebra', text: 'The rank of the matrix with rows (1, 2) and (2, 4) is', options: ['0', '1', '2', '4'], answer: 1, explanation: 'The second row is twice the first, so only one row is independent and the rank is 1.' },
      { id: 'gda1-q5', topic: 'Machine Learning', text: 'Overfitting is best described as a model that', options: ['Performs poorly on both training and new data', 'Performs very well on training data but poorly on new data', 'Performs equally well on training and new data', 'Has too few parameters to learn the pattern'], answer: 1, explanation: 'An overfitted model memorises the training data and fails to generalise to new data.' },
      { id: 'gda1-q6', topic: 'Machine Learning', text: 'Which of the following is an unsupervised learning method?', options: ['Linear regression', 'Logistic regression', 'K-means clustering', 'Decision tree classification'], answer: 2, explanation: 'K-means groups unlabelled data into clusters, while the other methods learn from labelled examples.' },
      { id: 'gda1-q7', topic: 'Programming and Data Structures', text: 'Which data structure follows the first-in, first-out (FIFO) principle?', options: ['Stack', 'Queue', 'Binary tree', 'Hash table'], answer: 1, explanation: 'A queue removes the element that was added first.' },
      { id: 'gda1-q8', topic: 'Databases', text: 'In SQL, which clause filters groups after aggregation?', options: ['WHERE', 'GROUP BY', 'HAVING', 'ORDER BY'], answer: 2, explanation: 'WHERE filters rows before grouping, and HAVING filters the groups after aggregation.' },
    ],
  },
]