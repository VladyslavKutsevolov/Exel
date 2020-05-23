import { capitalize } from './utils';

export default class DomListener {
  constructor($root, listeners = []) {
    if (!$root) throw new Error('$root is undefined for DomListener');

    this.$root = $root;
    this.listeners = listeners;
  }

  addDOMListener() {
    this.listeners.forEach(listener => {
      // eslint-disable-next-line no-use-before-define
      const method = getEventName(listener);

      if (!this[method]) {
        throw new Error(
          `Method: ${method} not defined in ${this.name} component`
        );
      }
      this[method] = this[method].bind(this);
      this.$root.on(listener, this[method]);
    });
  }

  removeDOMListener() {
    this.listeners.forEach(listener => {
      // eslint-disable-next-line no-use-before-define
      const method = getEventName(listener);
      this.$root.off(listener, this[method]);
    });
  }
}

function getEventName(eventName) {
  // eslint-disable-next-line prefer-template
  return 'on' + capitalize(eventName);
}
