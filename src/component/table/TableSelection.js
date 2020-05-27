export class TableSelection {
  static className = 'selected';

  constructor() {
    this.group = [];
    this.curr = null;
  }

  select($el) {
    this.clear();
    this.curr = $el.focus();
    this.group.push($el);
    $el.addClass(TableSelection.className);
  }

  clear() {
    this.group.forEach(c => c.removeClass(TableSelection.className));
    this.group = [];
  }

  selectGroup(cells) {
    this.clear();
    this.group = cells;

    this.group.forEach(c => c.addClass(TableSelection.className));
  }
}
