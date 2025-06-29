export const SECONDS = {
  ONE_MINUTE: 60,
  ONE_HOUR: 60 * 60,
  ONE_DAY: 60 * 60 * 24,
  ONE_WEEK: 60 * 60 * 24 * 7,
};

export const CACHE_KEYS = {
  SEASONS: "seasons",
  WINNERS_PREFIX: "winners:",
};
export const REFRESH_JOB_SCHEDULES = [
  { cron: "0 22 * * 0", jobId: "weekly-refresh-primary" }, // Sunday 22:00
  { cron: "0 2 * * 1", jobId: "weekly-refresh-retry" }, // Monday 02:00
  { cron: "0 6 * * 1", jobId: "weekly-refresh-final-check" }, // Monday 06:00
];

export const RETRY_SETTINGS = {
  WEEKLY_REFRESH_CRON: "0 0 * * 1",
  MAX_RETRIES: 3,
  RETRY_DELAY_MS: 1000,
};

export const RATE_LIMIT = {
  WINDOW_MS: 50 * 1000,
  MAX_REQUESTS: 100,
  REDIS_EXPIRE_SECONDS: 60,
  TOKEN_BUCKET_KEY_PREFIX: "rate-limit:",
};
export const CURRENT_YEAR = new Date().getFullYear();
export const START_YEAR = 2005;

export const REFRESH_SOURCES = {
  MANUAL: "manual",
  DEPLOY: "deploy",
  CRON: "cron",
  UNKNOWN: "unknown",
} as const;

export type RefreshSource =
  (typeof REFRESH_SOURCES)[keyof typeof REFRESH_SOURCES];
