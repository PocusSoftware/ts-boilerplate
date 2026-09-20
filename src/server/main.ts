import { EVENTS, type GreetEventPayload } from '../shared/events';

onNet(EVENTS.greet, (name: string) => {
  const payload: GreetEventPayload = { message: `hello, ${name}` };
  emitNet(EVENTS.greet, source, payload);
});
