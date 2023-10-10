const state = {
  data: {
    list: [],
  },
  listeners: [],
  getState() {
    return this.data;
  },
  setState(newState: object) {
    this.data = newState;
    for (const cb of this.listeners) {
      cb();
    }
  },
  subscribe(callback: (any) => any) {
    this.listeners.push(callback);
  },
  addItem(item: {
    id: number;
    content: string;
    check: boolean;
    delete: boolean;
  }) {
    const currentState = this.getState();
    currentState.list.push(item);
    this.setState(currentState);
  },
};

export { state };
