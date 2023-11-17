const { BehaviorSubject } = require('rxjs');
const {emmitFiles, emmitResults} = require("../globalEvents");


class ResultStore {
  constructor() {
    if (ResultStore.instance) {
      return ResultStore.instance;
    }

    ResultStore.instance = this;

    this._data = new Map();
  }

  addData(key, value) {
    if (!this._data.has(key)) {
      this._data.set(key, new BehaviorSubject(value));
      emmitResults.emit('emmitResults',JSON.stringify(this._data));
    }
  }

  getData() {
    return Array.from(this._data.entries());
  }

  updateData(key, newValue) {
    if (this._data.has(key)) {
      this._data.get(key).next(newValue);
      emmitResults.emit('emmitResults',JSON.stringify(this._data));
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

const resultStore = new ResultStore();
Object.freeze(resultStore);

 module.exports = {
   resultStore
};
