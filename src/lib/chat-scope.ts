import type { PreparedAnswer } from './prepared-answers.ts';

export const normalizeQuestion = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();

export function unsupportedQuestion(
  question: string,
  catalog: PreparedAnswer[],
) {
  const query = normalizeQuestion(question);
  if (
    /\b(api keys?|passwords?|credentials|system prompt|ignore (your|all|previous) (rules|instructions))\b/.test(
      query,
    )
  )
    return true;
  if (
    /^(?:please\s+)?(?:(?:can|could|would|will)\s+you\s+)?(?:write|generate|create|implement)\b.*\b(code|program|script|function|recipe|meal plan)\b/.test(
      query,
    )
  )
    return true;
  // A name or a programming keyword must not turn an absent private fact or
  // fabricated achievement into a match for the biography/tools records.
  const referencesArticle = catalog.some(
    (answer) =>
      answer.id.startsWith('article:') &&
      answer.terms.some((term) => {
        const title = normalizeQuestion(term);
        return (
          title.split(' ').length >= 2 && ` ${query} `.includes(` ${title} `)
        );
      }),
  );
  const personalPredicate =
    /\b(is|was|did|does|has|have|are|were)\s+(nikesh|gyawali|he|you)\b|\b(nikesh|gyawali|he|you)\s+(is|was|has|had|earned)\b/.test(
      query,
    );
  if (referencesArticle && !personalPredicate) return false;
  const published = normalizeQuestion(
    catalog
      .filter((answer) =>
        ['background', 'education', 'experience', 'awards'].includes(answer.id),
      )
      .map((answer) => `${answer.reply} ${answer.more ?? ''}`)
      .join(' '),
  );
  const unsupportedTopics = [
    'nobel',
    'billionaire',
    'millionaire',
    'salary',
    'income',
    'net worth',
    'married',
    'spouse',
    'wife',
    'husband',
    'children',
    'birthday',
    'birth date',
    'date of birth',
    'home address',
    'private address',
    'phone number',
    'personal opinion',
    'political views',
    'weather',
    'stock price',
  ];
  return unsupportedTopics.some(
    (topic) =>
      ` ${query} `.includes(` ${topic} `) &&
      !` ${published} `.includes(` ${topic} `),
  );
}

export function isSiteQuestion(
  question: string,
  catalog: PreparedAnswer[],
  hasPreviousAnswer: boolean,
) {
  const query = normalizeQuestion(question);
  if (
    /\b(nikesh|gnikesh|gyawali|you|your|yours|he|his)\b|\b(this|the|your) (site|website|article|post|project)\b/.test(
      query,
    )
  )
    return true;
  if (
    hasPreviousAnswer &&
    /^(tell me more|more|go on|continue|elaborate|why|how|what else)$/.test(
      query,
    )
  )
    return true;
  return catalog.some((answer) => {
    const name = answer.id.startsWith('project:')
      ? normalizeQuestion(answer.reply.split(':')[0])
      : answer.id.startsWith('article:')
        ? normalizeQuestion(answer.terms[0] ?? '')
        : '';
    return name && ` ${query} `.includes(` ${name} `);
  });
}

export function exactPreparedAnswer(
  question: string,
  catalog: PreparedAnswer[],
  previous?: PreparedAnswer,
) {
  if (unsupportedQuestion(question, catalog)) return undefined;
  const query = normalizeQuestion(question);
  if (
    previous &&
    /^(tell me more|more|go on|continue|elaborate)$/.test(query)
  ) {
    return { ...previous, reply: previous.more ?? previous.reply };
  }
  const safeQuestions = new Map([
    ['research', 'research'],
    ['projects', 'projects'],
    ['blog', 'writing'],
    ['writing', 'writing'],
    ['about', 'background'],
    ['background', 'background'],
    ['contact', 'contact'],
    ['publications', 'publications'],
    ['cv', 'background'],
    ['resume', 'background'],
    ['tools', 'tools'],
    ['what do you work on', 'research'],
    ['what are you working on', 'research'],
    ['show me your projects', 'projects'],
    ['what have you written', 'writing'],
    ['who is nikesh gyawali', 'background'],
    ['how can i contact nikesh', 'contact'],
    ['hello', 'greeting'],
    ['hi', 'greeting'],
    ['thanks', 'greeting'],
    ['thank you', 'greeting'],
  ]);
  for (const answer of catalog) {
    if (answer.id.startsWith('project:')) {
      const name = normalizeQuestion(answer.reply.split(':')[0]);
      safeQuestions.set(name, answer.id);
      safeQuestions.set(`tell me about ${name}`, answer.id);
      safeQuestions.set(`what is ${name}`, answer.id);
    }
    if (answer.id.startsWith('article:') && answer.terms[0]) {
      safeQuestions.set(
        `tell me about the article ${normalizeQuestion(answer.terms[0])}`,
        answer.id,
      );
      safeQuestions.set(
        `tell me about the article ${normalizeQuestion(answer.terms[0].split(':')[0])}`,
        answer.id,
      );
    }
  }
  return catalog.find((answer) => answer.id === safeQuestions.get(query));
}
