import { cronJobs } from "convex/server";
import { internal } from "./_generated/api";

// Create a cron jobs scheduler
const crons = cronJobs();

// Schedule a job to run every hour to clean up expired messages
// Change from hourly to running every 1 minutes
crons.interval(
  "clean-expired-messages",
  { minutes: 1 }, // Run every 1 minutes
  internal.secretMessages.cleanExpiredMessages
);

export default crons;
