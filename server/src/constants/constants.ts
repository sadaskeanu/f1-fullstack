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

export const SCHEDULING = {
  WEEKLY_REFRESH_CRON: "0 0 * * 0",
  MAX_SCHEDULE_RETRIES: 3,
  SCHEDULE_RETRY_DELAY_MS: 1000,
};

export const RATE_LIMIT = {
  WINDOW_MS: 50 * 1000,
  MAX_REQUESTS: 100,
  REDIS_EXPIRE_SECONDS: 60,
  TOKEN_BUCKET_KEY_PREFIX: "rate-limit:",
};
export const CURRENT_YEAR = new Date().getFullYear();
export const START_YEAR = 2005;
