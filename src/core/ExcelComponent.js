import DomListener from './DomListener';

export default class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name;
    this.observer = options.observer;
    this.subscribe = options.subscribe || '';
    this.store = options.store;
    this.unSubscribe = [];
    this.prepare();
  }

  prepare() {}

  toHTML() {
    return '';
  }

  $observer(event, ...args) {
    this.observer.dispatch(event, ...args);
  }

  $subscribe(event, fn) {
    const unSubscribe = this.observer.subscribe(event, fn);
    this.unSubscribe.push(unSubscribe);
  }

  $dispatch(action) {
    this.store.dispatch(action);
  }

  storeChanges() {}

  isWatch(key) {
    return this.subscribe.includes(key);
  }

  init() {
    this.addDOMListener();
  }

  destroy() {
    this.removeDOMListener();
    this.unSubscribe.forEach(unsub => unsub());
  }
}
