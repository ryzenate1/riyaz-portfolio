import { useState } from 'react';

/**
 * Custom hook to track the previous state value.
 * Returns the value from the previous render.
 * 
 * @param initialState - The initial value to return before any state changes
 * @param state - The current state value to track
 * @returns The previous state value
 */
function usePreviousState<S>(initialState: S, state: S): S {
  // Track [previous, current] as a tuple in state
  // This avoids both refs during render and setState in effects
  const [[previous, current], setTuple] = useState<[S, S]>([initialState, state]);

  // If current doesn't match state, we need to update
  // This happens synchronously during render (before commit)
  if (current !== state) {
    setTuple([current, state]);
  }

  return previous;
}

export { usePreviousState };
