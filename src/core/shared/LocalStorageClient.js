import { storage } from '../utils';

const storageName = param => `excel:${param}`;

export default class LocalStorageClient {
  constructor(name) {
    this.name = storageName(name);
  }

  save(state) {
    storage(this.name, state);
    return Promise.resolve();
  }

  get() {
    return new Promise(resolve => {
      const state = storage(this.name);

      setTimeout(() => {
        resolve(state);
      }, 1000);
    });
  }
}
