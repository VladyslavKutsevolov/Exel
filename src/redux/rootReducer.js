import { TABLE_RESIZE } from './types';

export const rootReducer = (state, { type, payload }) => {
  if (type === TABLE_RESIZE) {
    const prevState = state.colState || {};
    prevState[payload.id] = payload.value;
    return {
      ...state,
      colState: prevState
    };
  }

  return state;
};
