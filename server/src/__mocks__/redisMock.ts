type RedisHash = Record<string, string>;
interface RedisMock {
  data: Map<string, RedisHash>;
  hmget: (key: string, ...fields: string[]) => Promise<(string | null)[]>;
  hmset: (key: string, fields: RedisHash) => Promise<"OK">;
  expire: (key: string, seconds: number) => Promise<"OK">;
  clear: () => void;
}

export const redisMock: RedisMock = {
  data: new Map(),

  hmget: async (key, ...fields) => {
    const record = redisMock.data.get(key) || {};
    return fields.map((field) => record[field] ?? null);
  },

  hmset: async (key, fields) => {
    const existing = redisMock.data.get(key) || {};
    redisMock.data.set(key, { ...existing, ...fields });
    return "OK";
  },

  expire: async () => "OK",

  clear: () => {
    redisMock.data.clear();
  },
};
