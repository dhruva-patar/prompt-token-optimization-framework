import {
  createSessionInDb,
  getSessionByIdFromDb,
  listSessionsGroupedByProviderFromDb,
} from "./session.repository.js";

const session = await createSessionInDb({
  providerId: "ptof",
  providerLabel: "PTOF",
  title: "Repository smoke test",
});

console.log("Created session:", session);

const loadedSession = await getSessionByIdFromDb(session.id);

console.log("Loaded session:", loadedSession);

const groupedSessions = await listSessionsGroupedByProviderFromDb();

console.log("Grouped sessions:", groupedSessions);