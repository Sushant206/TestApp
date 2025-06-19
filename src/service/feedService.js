// src/services/feedService.js

// Import the local JSON
import feedData from '../../mock/feedData.json';

/**
 * Simulates fetching a “page” of feed items.
 * @param {number} page 1-indexed page number
 * @param {number} limit items per page
 * @returns Promise<array>
 */
export async function fetchFeed(page = 1, limit = 4) {
  // simulate network latency
  await new Promise(res => setTimeout(res, 500));

  const allItems = feedData.feed;
  const start = (page - 1) * limit;
  const end = page * limit;
  // slice out the requested page
  return allItems.slice(start, end);
}
