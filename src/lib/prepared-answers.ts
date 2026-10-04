export interface PreparedAnswer {
  id: string;
  terms: string[];
  reply: string;
  more?: string;
  sources: { title: string; url: string }[];
}

const normalize = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();

export function findPreparedAnswer(
  question: string,
  answers: PreparedAnswer[],
  previousId?: string,
): PreparedAnswer {
  const query = normalize(question);
  const prior = answers.find((answer) => answer.id === previousId);
  if (
    prior &&
    /^(tell me more|more|go on|continue|why|how|what else|can you elaborate|elaborate|what about the results|what are the results)[ ?]*$/.test(
      query,
    )
  ) {
    return {
      ...prior,
      reply:
        prior.more ??
        `You can find more detail in the linked ${prior.id.startsWith('article:') ? 'article' : 'page'}. ${prior.reply}`,
    };
  }
  const ranked = answers
    .map((answer) => {
      const score = answer.terms.reduce((total, term) => {
        const normalized = normalize(term);
        return ` ${query} `.includes(` ${normalized} `)
          ? total + normalized.split(' ').length ** 2 * 3
          : total;
      }, 0);
      return { answer, score };
    })
    .filter((match) => match.score > 0)
    .sort((a, b) => b.score - a.score);
  const articleIntent =
    /\b(articles?|posts?)\b|\b(this|that|the|blog|technical) notes?\b|\bnotes? (about|on)\b/.test(
      query,
    );
  if (articleIntent) {
    const article = ranked.find((match) =>
      match.answer.id.startsWith('article:'),
    );
    if (article) return article.answer;
  }
  if (!articleIntent && /\bprojects?\b/.test(query)) {
    const project = ranked.find((match) =>
      match.answer.id.startsWith('project:'),
    );
    if (project) return project.answer;
  }
  return (
    ranked[0]?.answer ?? answers.find((answer) => answer.id === 'fallback')!
  );
}
