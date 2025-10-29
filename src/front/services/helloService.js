import { apiClient } from "./apiClient";

export function fetchHelloMessage() {
  return apiClient.get("/hello");
}

export function createHelloMessage(message) {
  return apiClient.post("/hello", { message });
}
