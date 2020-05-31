// eslint-disable-next-line import/no-unresolved
import { $ } from '@core/domHelper';

export const resizeTable = (event, $root) =>
  new Promise(resolve => {
    const $resizer = $(event.target);
    const $parent = $resizer.closest('[data-type="resizable"]');
    const coords = $parent.getCoords();
    const type = $resizer.data.resize;
    const sideProp = type === 'col' ? 'bottom' : 'right';
    let value;
    $resizer.cssStyle({ opacity: '1', [sideProp]: '-5000px' });

    document.onmousemove = e => {
      if (type === 'col') {
        const delta = e.pageX - coords.right;
        value = coords.width + delta;
        $resizer.cssStyle({ right: `${-delta}px` });
      } else {
        const delta = e.pageY - coords.bottom;
        value = coords.height + delta;
        $resizer.cssStyle({ bottom: `${-delta}px` });
      }
    };

    document.onmouseup = () => {
      document.onmousemove = null;
      document.onmouseup = null;
      if (type === 'col') {
        $root
          .findAll(`[data-col="${$parent.data.col}"]`)
          .forEach(el => (el.style.width = `${value}px`));
      } else {
        $parent.cssStyle({
          height: `${value}px`
        });
      }
      resolve({
        value,
        id: type === 'col' ? $parent.data.col : null
      });
      $resizer.cssStyle({ opacity: '0', bottom: '0', right: '0' });
    };
  });
