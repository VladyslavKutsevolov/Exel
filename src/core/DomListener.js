export default class DomListener {
  constructor($root) {
    if (!$root) throw new Error('$root is undefined for DomListener');

    this.$root = $root;
  }
}
