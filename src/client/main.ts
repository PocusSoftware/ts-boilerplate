import { EVENTS, type GreetEventPayload } from '../shared/events';

RegisterCommand(
  'greet',
  (_source: number, args: string[]) => {
    const name = args[0] ?? 'world';
    TriggerServerEvent(EVENTS.greet, name);
  },
  false,
);

onNet(EVENTS.greet, (payload: GreetEventPayload) => {
  console.log(payload.message);
});
