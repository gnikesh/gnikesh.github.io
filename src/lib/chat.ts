import { findPreparedAnswer, type PreparedAnswer } from './prepared-answers';
interface Message {
  role: 'user' | 'assistant';
  content: string;
}
interface Source {
  title: string;
  url: string;
}
interface ChatReply {
  reply: string;
  sources?: Source[];
}

/** The browser sends messages to your backend. Model credentials belong on that backend. */
export function initializeChat(root: HTMLElement) {
  const form = root.querySelector<HTMLFormElement>('[data-chat-form]')!;
  const input = root.querySelector<HTMLTextAreaElement>('textarea')!;
  const sendButton = root.querySelector<HTMLButtonElement>('[type="submit"]')!;
  const reset = root.querySelector<HTMLButtonElement>('[data-chat-reset]')!;
  const retry = root.querySelector<HTMLButtonElement>('[data-chat-retry]')!;
  const status = root.querySelector<HTMLElement>('[data-chat-status]')!;
  const welcome = root.querySelector<HTMLElement>('[data-chat-welcome]')!;
  const log = root.querySelector<HTMLElement>('[data-chat-messages]')!;
  const error = root.querySelector<HTMLElement>('[data-chat-error]')!;
  const errorText = root.querySelector<HTMLElement>('[data-chat-error-text]')!;
  const suggestions = root.querySelector<HTMLElement>(
    '[data-chat-suggestions]',
  )!;
  const prompts =
    root.querySelectorAll<HTMLButtonElement>('[data-chat-prompt]');
  const messages: Message[] = [];
  const answers = JSON.parse(
    root.querySelector('[data-chat-answers]')?.textContent ?? '[]',
  ) as PreparedAnswer[];
  let previousAnswerId: string | undefined;
  let controller: AbortController | undefined;
  let failedMessage = '';
  let requestId = 0;

  function state(value: 'ready' | 'busy' | 'error') {
    root.dataset.state = value;
    status.textContent =
      value === 'busy' ? 'THINKING' : value === 'error' ? 'OFFLINE' : 'READY';
    input.disabled = value === 'busy';
    sendButton.disabled = value === 'busy' || !input.value.trim();
    prompts.forEach((button) => {
      button.disabled = value === 'busy';
    });
    form.setAttribute('aria-busy', String(value === 'busy'));
  }

  function append(message: Message, sources: Source[] = []) {
    const block = document.createElement('div');
    block.className = `message message--${message.role}`;
    const label = document.createElement('span');
    label.className = 'message__label';
    label.textContent = message.role === 'user' ? 'YOU' : 'NIKESH AI';
    const text = document.createElement('p');
    text.className = 'message__text';
    text.textContent = message.content;
    block.append(label, text);
    const links = document.createElement('div');
    links.className = 'message__sources';
    for (const source of sources.slice(0, 5)) {
      if (
        !source ||
        typeof source.url !== 'string' ||
        typeof source.title !== 'string'
      )
        continue;
      try {
        const url = new URL(source.url, window.location.origin);
        if (!['https:', 'http:'].includes(url.protocol)) continue;
        const link = document.createElement('a');
        link.href = url.href;
        link.textContent = `${source.title} ↗`;
        if (url.origin !== location.origin) {
          link.target = '_blank';
          link.rel = 'noopener noreferrer';
        }
        links.append(link);
      } catch {
        /* Ignore malformed source URLs. */
      }
    }
    if (links.childElementCount) block.append(links);
    log.append(block);
    log.hidden = false;
    welcome.hidden = true;
    suggestions.hidden = true;
    reset.hidden = false;
    log.scrollTop = log.scrollHeight;
  }

  async function submit(text: string, isRetry = false) {
    const content = text.trim().slice(0, 2000);
    if (!content || root.dataset.state === 'busy') return;
    if (!isRetry) {
      // A failed turn has no answer, so exclude it from subsequent model context.
      if (failedMessage && messages.at(-1)?.role === 'user') messages.pop();
      messages.push({ role: 'user', content });
      append({ role: 'user', content });
    }
    failedMessage = '';
    error.hidden = true;
    input.value = '';
    input.style.height = '';
    controller = new AbortController();
    const currentRequest = ++requestId;
    const timeout = window.setTimeout(() => controller?.abort(), 30000);
    state('busy');
    try {
      const endpoint = root.dataset.endpoint;
      let result: ChatReply;
      if (endpoint) {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: messages.slice(-12) }),
          signal: controller.signal,
        });
        if (!response.ok)
          throw new Error(`Chat request failed: ${response.status}`);
        result = (await response.json()) as ChatReply;
      } else {
        const answer = findPreparedAnswer(content, answers, previousAnswerId);
        previousAnswerId = answer.id;
        result = { reply: answer.reply, sources: answer.sources };
      }
      if (!result || typeof result.reply !== 'string' || !result.reply.trim())
        throw new Error('Empty chat reply.');
      if (currentRequest !== requestId) return;
      const answer: Message = { role: 'assistant', content: result.reply };
      messages.push(answer);
      append(answer, Array.isArray(result.sources) ? result.sources : []);
      state('ready');
    } catch {
      if (currentRequest !== requestId) return;
      failedMessage = content;
      errorText.textContent = 'Couldn’t connect. Please try again in a moment.';
      error.hidden = false;
      input.value = content;
      state('error');
    } finally {
      clearTimeout(timeout);
      if (currentRequest === requestId) {
        controller = undefined;
        if (
          document.activeElement === document.body ||
          form.contains(document.activeElement) ||
          document.activeElement === retry
        ) {
          input.focus({ preventScroll: true });
        }
      }
    }
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const text = input.value.trim();
    void submit(text, text === failedMessage);
  });
  input.addEventListener('input', () => {
    input.style.height = 'auto';
    input.style.height = `${Math.min(input.scrollHeight, 144)}px`;
    sendButton.disabled = !input.value.trim();
  });
  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && !event.shiftKey && !event.isComposing) {
      event.preventDefault();
      if (input.value.trim()) form.requestSubmit();
    }
  });
  prompts.forEach((button) =>
    button.addEventListener('click', () => {
      void submit(button.dataset.chatPrompt ?? '');
    }),
  );
  retry.addEventListener('click', () => {
    void submit(failedMessage, true);
  });
  reset.addEventListener('click', () => {
    requestId++;
    controller?.abort();
    controller = undefined;
    messages.length = 0;
    previousAnswerId = undefined;
    failedMessage = '';
    log.replaceChildren();
    log.hidden = true;
    error.hidden = true;
    welcome.hidden = false;
    suggestions.hidden = false;
    reset.hidden = true;
    input.value = '';
    input.style.height = '';
    state('ready');
    input.focus({ preventScroll: true });
  });
  const params = new URLSearchParams(window.location.search);
  const question = params.get('ask');
  if (question) input.value = question.slice(0, 2000);
  input.disabled = false;
  state('ready');
}
