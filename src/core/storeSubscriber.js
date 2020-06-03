/* eslint-disable import/no-unresolved */
import { isEqual } from '@core/utils';

export default class StoreSubscriber {
  constructor(store) {
    this.store = store;
    this.sub = null;
    this.prevState = {};
  }

  subscribeComponent(components) {
    this.prevState = this.store.getState();
    this.sub = this.store.subscribe(state => {
      Object.keys(state).forEach(key => {
        if (!isEqual(this.prevState[key], state[key])) {
          components.forEach(component => {
            if (component.isWatch(key)) {
              const changes = { [key]: state[key] };
              component.storeChanges(changes);
            }
          });
        }
      });
      this.prevState = this.store.getState();
    });
  }

  unsubscribeFromStore() {
    this.sub.unsubscribe();
  }
}
