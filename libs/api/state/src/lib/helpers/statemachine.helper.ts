import { StateMachine, AnyEventObject, State, interpret } from 'xstate';

export function startFSMFromState(
  machine: StateMachine<any, any, AnyEventObject, any>,
  stateDefinition: string,
) {
  const currentState = State.create(JSON.parse(stateDefinition));
  const resolvedState = machine.resolveState(currentState);
  const fsm = interpret(machine).start(resolvedState);

  return fsm;
}
