/* eslint-disable no-undef */
import { createStore } from './createStore';

const initialState = {
  count: 0
};

// eslint-disable-next-line arrow-body-style
const reducer = (state = initialStte, action) => {
  if (action.type === 'ADD') {
    return { ...state, count: state.count + 1 };
  }
  return state;
};

describe('createStore', () => {
  let store;
  let handler;

  beforeEach(() => {
    store = createStore(reducer, initialState);
    handler = jest.fn();
    expect(store).toBeDefined();
  });
  test('should return store object ', () => {
    expect(store.dispatch).toBeDefined();
    expect(store.subscribe).toBeDefined();
    expect(store.getState).toBeDefined();
  });

  test('should return object as a state', () => {
    expect(store.getState()).toBeInstanceOf(Object);
  });

  test('should return default state', () => {
    expect(store.getState()).toEqual(initialState);
  });

  test('should change state if action exist', () => {
    store.dispatch({ type: 'ADD' });
    expect(store.getState().count).toBe(1);
  });

  test('should not change state if action not exist', () => {
    store.dispatch({ type: 'ADD not ' });
    expect(store.getState().count).toBe(0);
  });

  test('should call subcriber func', () => {
    store.subscribe(handler);

    store.dispatch({ type: 'ADD' });

    expect(handler).toHaveBeenCalled();
    expect(handler).toHaveBeenCalledWith(store.getState());
  });

  test('should not call sub if unsub', () => {
    const sub = store.subscribe(handler);
    sub.unSubscribe();
    store.dispatch({ type: 'ADD' });

    expect(handler).toHaveBeenCalled();
  });
});
