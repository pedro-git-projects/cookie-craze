import EventEmitter from 'eventemitter3';

export class ScoreSavedEmitter extends EventEmitter {
  constructor() {
    super();
  }
}

const scoreSavedEmitter = new ScoreSavedEmitter();

export default scoreSavedEmitter;
