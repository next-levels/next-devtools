class PromptBuilder {
  mindset = '';
  body = '';
  task = '';
  constructor(body, mindset = 'default', task = 'code') {
    this.setMindset(mindset);
    this.setBody(body);
    this.setTask(task);
  }

  setMindset(mindset) {
    this.mindset = this.getMindsetString(mindset);
  }

  getMindsetString(mindset) {
    switch (mindset) {
      case 'default':
        return 'string';
      default:
        return mindset;
    }
  }

  setBody(body) {
    this.body = body;
  }

  setTask(resultType) {
    this.type = this.getTaskString(resultType);
  }

  getTaskString(type) {
    switch (type) {
      case 'code':
        return 'string';
        default:
          return type;
    }
  }

  build() {
    return `${this.mindset}${this.task}${this.body}`;
  }
}

module.exports = {
  PromptBuilder,
};

