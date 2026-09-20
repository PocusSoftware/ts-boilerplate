export const RESOURCE_NAME = GetCurrentResourceName();

export interface GreetEventPayload {
  readonly message: string;
}

export const EVENTS = {
  greet: `${RESOURCE_NAME}:greet`,
} as const;
