const toHtml = () => `
     <li class="db__record">
        <a href="#">Table # 1</a>
        <strong>12.06.2020</strong>
    </li>
    `;

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
  console.log('createRecordsTable -> keys', keys);

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
