const { BehaviorSubject } = require('rxjs');
const {emmitContext} = require("../globalEvents");
class StoreService {
  constructor() {
    if (StoreService.instance) {
      return StoreService.instance;
    }

    StoreService.instance = this;

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

const storeService = new StoreService();
Object.freeze(storeService);

 module.exports = {
  storeService
};
