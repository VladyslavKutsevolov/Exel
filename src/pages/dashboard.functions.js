/* eslint-disable import/no-unresolved */
import { storage } from '@core/utils';

const toHtml = key => {
  const model = storage(key);
  const { title } = model;
  const id = key.split(':')[1];
  return `
     <li class="db__record">
        <a href="#excel/${id}">${title}</a>
        <strong>
        ${new Date(model.openDate).toLocaleDateString()}
        ${new Date(model.openDate).toLocaleTimeString()}
        </strong>
    </li>
    `;
};

const getAllKeys = () => {
  const keys = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    // eslint-disable-next-line no-continue
    if (!key.includes('excel')) continue;

    keys.push(key);
  }
  return keys;
};

export const createRecordsTable = () => {
  const keys = getAllKeys();

  if (!keys.length) {
    return `No any Table Data!`;
  }
  return `
    <div class="db__list-header">
        <span>Name</span>
        <span>Date</span>
    </div>

    <ul class="db__list"> 
        ${keys.map(toHtml).join(' ')}
    </ul>
  `;
};
