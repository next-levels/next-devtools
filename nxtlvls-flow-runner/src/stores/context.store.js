const { BehaviorSubject } = require('rxjs');
const {globalEvents, emmitContext} = require("../globalEvents");


class ContextStore {
  constructor() {
    if (ContextStore.instance) {
      return ContextStore.instance;
    }

    ContextStore.instance = this;

    this._data = new Map();
  }

  addData(key, value) {
    if (!this._data.has(key)) {
      this._data.set(key, new BehaviorSubject(value));
      emmitContext.emit('emmitContext',JSON.stringify(this._data));
    }
  }

  getData() {
    return Array.from(this._data.entries());
  }

  updateData(key, newValue) {
    if (this._data.has(key)) {
      this._data.get(key).next(newValue);
      emmitContext.emit('emmitContext',JSON.stringify(this._data));
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

const contextStore = new ContextStore();
Object.freeze(contextStore);

 module.exports = {
   contextStore
};
