import { Machine } from 'xstate';

export enum INSTRUMENT_MACHINE_STATES {
  DRAFT = 'draft',
  RELEASED = 'released',
  RETIRED = 'retired',
}

export enum INSTRUMENT_MACHINE_EVENTS {
  RELEASE = 'release',
  RETIRE = 'retire',
}

export const instrumentMachine = Machine({
  id: 'instrumentMachine',
  initial: INSTRUMENT_MACHINE_STATES.DRAFT,
  states: {
    [INSTRUMENT_MACHINE_STATES.DRAFT]: {
      on: {
        [INSTRUMENT_MACHINE_EVENTS.RELEASE]: INSTRUMENT_MACHINE_STATES.RELEASED,
      },
    },
    [INSTRUMENT_MACHINE_STATES.RELEASED]: {
      on: {
        [INSTRUMENT_MACHINE_EVENTS.RETIRE]: INSTRUMENT_MACHINE_STATES.RETIRED,
      },
    },
    [INSTRUMENT_MACHINE_STATES.RETIRED]: {
      type: 'final',
    },
  },
});
