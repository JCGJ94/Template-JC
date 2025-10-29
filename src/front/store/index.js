import { storeActionTypes } from "./types";

export const initialStore = () => ({
  message: null,
  todos: [
    {
      id: 1,
      title: "Make the bed",
      background: null,
    },
    {
      id: 2,
      title: "Do my homework",
      background: null,
    },
  ],
});

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case storeActionTypes.setHello:
      return {
        ...store,
        message: action.payload,
      };

    case storeActionTypes.addTask: {
      const { id, color } = action.payload;
      return {
        ...store,
        todos: store.todos.map((todo) => (todo.id === id ? { ...todo, background: color } : todo)),
      };
    }

    default:
      throw new Error(`Unknown action: ${action.type ?? "<undefined>"}`);
  }
}
