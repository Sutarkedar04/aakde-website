/*
  Test content. IMPORTANT: the questions below are generic PRACTICE PLACEHOLDERS written to demo the feature.
  They are not real ISS questions. Replace them with the owner's question set before launch.

  topic    groups questions in the result analysis
  answer   index (0-3) of the correct option in `options`
*/
export const tests = [
  {
    id: 'iss-demo-1',
    exam: 'ISS',
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
]