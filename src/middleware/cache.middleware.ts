// middlewares/cache.ts
// middlewares/cache.ts
import type { Request, Response, NextFunction } from "express";
import { client } from "../utils/redis";
// import { client } from ; // your redis client wrapper

/**
 * Generalised cache middleware
 * @param keyBuilder function that returns a unique cache key based on request
 * @param ttlSeconds time-to-live for cache in seconds
 */
export function cache(keyBuilder: (req: Request) => string, ttlSeconds = 60) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const cacheKey = keyBuilder(req);

      if (!cacheKey) {
        return next(); // no key => skip cache
      }

      const cachedData = await client.get(cacheKey);

      if (cachedData) {
        console.log("⚡ Cache hit:", cacheKey);
        return res.json(JSON.parse(cachedData));
      }

      // Override res.json to cache data before sending
      const originalJson = res.json.bind(res);
      res.json = (body: any) => {
        client.setEx(cacheKey, ttlSeconds, JSON.stringify(body)).catch(console.error);
        return originalJson(body);
      };

      next();
    } catch (err) {
      console.error("Cache middleware error:", err);
      next();
    }
  };
}
