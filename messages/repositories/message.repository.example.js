import { createSessionInDb } from "../../sessions/repositories/session.repository.js";
import {
  createMessageInDb,
  listMessagesBySessionIdFromDb,
} from "./message.repository.js";

const session = await createSessionInDb({
  providerId: "ptof",
  providerLabel: "PTOF",
  title: "Message repository smoke test",
});

const userMessage = await createMessageInDb({
  sessionId: session.id,
  role: "user",
  content: "Test user message",
});

const assistantMessage = await createMessageInDb({
  sessionId: session.id,
  role: "assistant",
  content: "Test assistant message",
});

const messages = await listMessagesBySessionIdFromDb(session.id);

console.log("Session:", session.id);
console.log("User message:", userMessage);
console.log("Assistant message:", assistantMessage);
console.log("Messages:", messages);