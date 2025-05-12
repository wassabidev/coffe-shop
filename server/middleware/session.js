import Session from "../models/Session.js";

export async function getSession(sessionId) {
  return await Session.findOne({ _id: sessionId });
}
