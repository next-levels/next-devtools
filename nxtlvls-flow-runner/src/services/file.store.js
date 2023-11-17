const { BehaviorSubject } = require('rxjs');


class FileStore {
  constructor() {
    if (FileStore.instance) {
      return FileStore.instance;
    }

    FileStore.instance = this;

    this._data = new Map();
  }

  addData(key, value) {
    if (!this._data.has(key)) {
      this._data.set(key, new BehaviorSubject(value));
    }
  }

  getData() {
    return Array.from(this._data.entries());
  }

  updateData(key, newValue) {
    if (this._data.has(key)) {
      this._data.get(key).next(newValue);
    }
  }

  getObservableForKey(key) {
    return this._data.get(key)?.asObservable();
  }
}

const fileStore = new FileStore();
Object.freeze(fileStore);

 module.exports = {
  fileStore
};
