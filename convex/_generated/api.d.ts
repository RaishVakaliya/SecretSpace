/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as comments from "../comments.js";
import type * as crons from "../crons.js";
import type * as feedback from "../feedback.js";
import type * as http from "../http.js";
import type * as posts from "../posts.js";
import type * as report_issue from "../report_issue.js";
import type * as secretMessages from "../secretMessages.js";
import type * as sendNotification from "../sendNotification.js";
import type * as users from "../users.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  comments: typeof comments;
  crons: typeof crons;
  feedback: typeof feedback;
  http: typeof http;
  posts: typeof posts;
  report_issue: typeof report_issue;
  secretMessages: typeof secretMessages;
  sendNotification: typeof sendNotification;
  users: typeof users;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
