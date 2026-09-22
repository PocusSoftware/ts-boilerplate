import { EVENTS, type GreetEventPayload } from '../shared/events';

const MAX_NAME_LENGTH = 32;

onNet(EVENTS.greet, (name: unknown) => {
  if (typeof name !== 'string') return;

  const trimmed = name.trim();
  if (trimmed.length === 0 || trimmed.length > MAX_NAME_LENGTH) return;

  const payload: GreetEventPayload = { message: `hello, ${trimmed}` };
  emitNet(EVENTS.greeted, source, payload);
});
