const round = (n) => Math.round(n * 100) / 100

// responses = { [questionId]: { answer: number | null, ... } }
export function scoreTest(test, responses) {
  let correct = 0
  let wrong = 0
  let skipped = 0
  const byTopic = {}

  for (const q of test.questions) {
    const topic = (byTopic[q.topic] ??= { correct: 0, total: 0 })
    const given = responses[q.id]?.answer
    topic.total++
    if (given == null) skipped++
    else if (given === q.answer) { correct++; topic.correct++ }
    else wrong++
  }

  const attempted = correct + wrong
  return {
    correct,
    wrong,
    skipped,
    attempted,
    score: round(correct * test.marks.correct - wrong * test.marks.wrong),
    maxScore: round(test.questions.length * test.marks.correct),
    accuracy: attempted ? Math.round((correct / attempted) * 100) : 0,
    byTopic,
  }
}