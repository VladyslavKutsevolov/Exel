import DomListener from './DomListener';

export default class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name;
    this.observer = options.observer;
    this.store = options.store;
    this.unSubFromStore = null;
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

  $listen(fn) {
    this.unSubFromStore = this.store.subscribe(fn);
  }

  init() {
    this.addDOMListener();
  }

  destroy() {
    this.removeDOMListener();
    this.unSubscribe.forEach(unsub => unsub());
    this.unSubFromStore.unSubscribe();
  }
}
