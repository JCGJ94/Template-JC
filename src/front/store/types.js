export const storeActionTypes = {
  setHello: "set_hello",
  addTask: "add_task",
};

export const storeActions = {
  setHello: (message) => ({
    type: storeActionTypes.setHello,
    payload: message,
  }),
  updateTodoColor: (id, color) => ({
    type: storeActionTypes.addTask,
    payload: { id, color },
  }),
};
