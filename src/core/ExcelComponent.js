import DomListener from './DomListener';

export default class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name;
    this.observer = options.observer;
    this.unSubscribes = [];
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
    this.unSubscribes.push(unSubscribe);
  }

  init() {
    this.addDOMListener();
  }

  destroy() {
    this.removeDOMListener();
    this.unSubscribes.forEach(unsub => unsub());
  }
}
