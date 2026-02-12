import { cronJobs } from "convex/server";
import { internal } from "./_generated/api";

const crons = cronJobs();

crons.interval(
  "clean-expired-messages",
  { minutes: 1 }, // Run every 1 minutes
  internal.secretMessages.cleanExpiredMessages
);

export default crons;
