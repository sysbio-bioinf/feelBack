import { StateMachine, AnyEventObject, State, interpret } from 'xstate';

export function startFSMFromState(
  machine: StateMachine<any, any, AnyEventObject, any>,
  stateDefinition: string | null,
) {
  let resolvedState: any;
  if (stateDefinition !== null) {
    const currentState = State.create(JSON.parse(stateDefinition));
    resolvedState = machine.resolveState(currentState);
  }
  const fsm = interpret(machine).start(resolvedState);

  return fsm;
}
