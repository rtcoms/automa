export function convert2DArrayToArrayObj(values) {
  let keyIndex = 0;
  const keys = values.shift();
  const result = [];

  for (let columnIndex = 0; columnIndex < values.length; columnIndex += 1) {
    const currentColumn = {};

    for (
      let rowIndex = 0;
      rowIndex < values[columnIndex].length;
      rowIndex += 1
    ) {
      let key = keys[rowIndex];

      if (!key) {
        keyIndex += 1;
        key = `_row${keyIndex}`;
        keys.push(key);
      }

      currentColumn[key] = values[columnIndex][rowIndex];

      result.push(currentColumn);
    }
  }

  return result;
}

export function parseJSON(data, def) {
  try {
    const result = JSON.parse(data);

    return result;
  } catch (error) {
    return def;
  }
}

export function replaceMustache(str, replacer) {
  /* eslint-disable-next-line */
  return str.replace(/\{\{(.*?)\}\}/g, replacer);
}

export function openFilePicker(acceptedFileTypes = [], attrs = {}) {
  return new Promise((resolve, reject) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = acceptedFileTypes.join(',');

    Object.entries(attrs).forEach(([key, value]) => {
      input[key] = value;
    });

    input.onchange = (event) => {
      const file = event.target.files[0];

      if (!file || !acceptedFileTypes.includes(file.type)) {
        reject(new Error(`Invalid ${file.type} file type`));
        return;
      }

      resolve(file);
    };

    input.click();
  });
}

export function fileSaver(fileName, data) {
  const anchor = document.createElement('a');
  anchor.download = fileName;
  anchor.href = data;

  anchor.dispatchEvent(new MouseEvent('click'));
  anchor.remove();
}

export function countDuration(started, ended) {
  const duration = Math.round((ended - started) / 1000);
  const minutes = parseInt((duration / 60) % 60, 10);
  const seconds = parseInt(duration % 60, 10);

  const getText = (num, suffix) => (num > 0 ? `${num}${suffix}` : '');

  return `${getText(minutes, 'm')} ${seconds}s`;
}

export function toCamelCase(str) {
  const result = str.replace(/(?:^\w|[A-Z]|\b\w)/g, (letter, index) => {
    return index === 0 ? letter.toLowerCase() : letter.toUpperCase();
  });

  return result.replace(/\s+|[-]/g, '');
}

export function isObject(obj) {
  return typeof obj === 'object' && obj !== null && !Array.isArray(obj);
}

export function objectHasKey(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

export function isWhitespace(str) {
  return !/\S/.test(str);
}

export function debounce(callback, time = 200) {
  let interval;

  return (...args) => {
    clearTimeout(interval);

    return new Promise((resolve) => {
      interval = setTimeout(() => {
        interval = null;

        callback(...args);
        resolve();
      }, time);
    });
  };
}
