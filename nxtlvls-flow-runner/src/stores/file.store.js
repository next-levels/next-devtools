const { BehaviorSubject } = require('rxjs');
const {emmitContext, emmitFiles} = require("../globalEvents");


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
      emmitFiles.emit('emmitFiles',JSON.stringify(this._data));
    }
  }

  getData() {
    return Array.from(this._data.entries());
  }

  updateData(key, newValue) {
    if (this._data.has(key)) {
      this._data.get(key).next(newValue);
      emmitFiles.emit('emmitFiles',JSON.stringify(this._data));
    }
  }

  getDataForKey(key) {
    const behaviorSubject = this._data.get(key);
    return behaviorSubject ? behaviorSubject.value : undefined;
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
