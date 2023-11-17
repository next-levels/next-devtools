const EventEmitter = require('events');

class GlobalEvents extends EventEmitter {}
const globalEvents = new GlobalEvents();

class EmmitContext extends EventEmitter {}
const emmitContext = new EmmitContext();

class EmmitFiles extends EventEmitter {}
const emmitFiles = new EmmitFiles();

class EmmitResults extends EventEmitter {}
const emmitResults = new EmmitResults();

module.exports = { globalEvents, emmitContext,emmitFiles,emmitResults };
