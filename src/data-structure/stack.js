class stack {
  constructor() {
    this.stack = [];
  }
  push(value) {
    this.stack.push(value);
  }
  empty() {
    return this.stack.length === 0;
  }
  pop() {
    return this.stack.pop();
  }
  top() {
    return this.stack[this.stack.length - 1];
  }
  size() {
    return this.stack.length;
  }
}
export default stack;
