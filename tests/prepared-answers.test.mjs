import assert from 'node:assert/strict';
import { test } from 'node:test';
import { findPreparedAnswer } from '../src/lib/prepared-answers.ts';

const answers = [
  {
    id: 'research',
    terms: ['research', 'ai'],
    reply: 'Research overview',
    sources: [],
  },
  {
    id: 'fundlm',
    terms: ['fundlm', 'fungal genomes'],
    reply: 'Fungal foundation models',
    more: 'Current model training',
    sources: [{ title: 'Research', url: '/research' }],
  },
  {
    id: 'background',
    terms: ['about you', 'background'],
    reply: 'About Nikesh',
    sources: [],
  },
  {
    id: 'article:docker',
    terms: ['dockerized microservices backend', 'microservices'],
    reply: 'Article overview',
    sources: [],
  },
  {
    id: 'project:docker',
    terms: ['dockerized microservices backend', 'microservices', 'docker'],
    reply: 'Project overview',
    sources: [],
  },
  { id: 'fallback', terms: [], reply: 'I do not know that', sources: [] },
];

test('recognizes a project within a natural-language question with punctuation', () => {
  assert.equal(
    findPreparedAnswer('Could you tell me about FunDLM?', answers).id,
    'fundlm',
  );
});
test('specific subjects beat generic words in the same question', () => {
  assert.equal(
    findPreparedAnswer('Explain your AI research on fungal genomes.', answers)
      .id,
    'fundlm',
  );
});
test('does not match keywords inside unrelated words', () => {
  assert.equal(
    findPreparedAnswer('Can you explain a railway?', answers).id,
    'fallback',
  );
});
test('unknown, empty, and hostile questions stay in the supported scope', () => {
  for (const question of [
    '',
    '   ',
    'What is the weather?',
    '<script>alert(1)</script>',
  ]) {
    assert.equal(findPreparedAnswer(question, answers).id, 'fallback');
  }
});
test('follow-ups preserve context and links', () => {
  const reply = findPreparedAnswer('Tell me more!', answers, 'fundlm');
  assert.equal(reply.reply, 'Current model training');
  assert.equal(reply.sources[0].url, '/research');
});
test('a new topic replaces follow-up context', () => {
  assert.equal(
    findPreparedAnswer('What is your background?', answers, 'fundlm').id,
    'background',
  );
});
test('an exact article title beats a broad topic', () => {
  assert.equal(
    findPreparedAnswer(
      'Tell me about the article "Dockerized microservices backend".',
      answers,
    ).id,
    'article:docker',
  );
});
test('explicit article questions select an article over a higher-scoring project', () => {
  assert.equal(
    findPreparedAnswer(
      'Tell me about the post on Docker microservices.',
      answers,
    ).id,
    'article:docker',
  );
});
test('the word notes does not turn a project request into an article request', () => {
  assert.equal(
    findPreparedAnswer('Tell me about your Docker notes project.', answers).id,
    'project:docker',
  );
});
