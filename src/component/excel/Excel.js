/* eslint-disable import/no-unresolved */
import { $ } from '@core/domHelper';
import { updateDate } from '@/redux/actions';
import StoreSubscriber from '@core/storeSubscriber';
import Observer from '@core/Observer';
import { preventDefault } from '@core/utils';

export default class Excel {
  constructor(options) {
    this.components = options.components || [];
    this.observer = new Observer();
    this.store = options.store;
    this.storeSub = new StoreSubscriber(this.store);
  }

  getRoot() {
    const $root = $.create('div', 'excel');
    const componentOption = {
      observer: this.observer,
      store: this.store
    };
    this.components = this.components.map(Component => {
      const $el = $.create('div', Component.className);
      const component = new Component($el, componentOption);
      $el.html(component.toHTML());
      $root.append($el);
      return component;
    });
    return $root;
  }

  init() {
    if (process.env.NODE_ENV === 'production') {
      document.addEventListener('contextmenu', preventDefault);
    }
    this.store.dispatch(updateDate());
    this.storeSub.subscribeComponent(this.components);
    this.components.forEach(component => component.init());
  }

  destroy() {
    this.storeSub.unsubscribeFromStore();
    this.components.forEach(component => component.destroy());
    document.removeEventListener('contextmenu', preventDefault);
  }
}
