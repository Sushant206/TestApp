// src/service/feedService.js

/**
 * Fetches a “page” of feed items from staging API.
 * @param {string} lastId  the _id of the last item from the previous page
 * @param {number} limit   max items per page
 * @returns Promise<{ feeds: array, more: boolean }>
 */
export async function fetchFeed(lastId = '', limit = 4) {
  const base = 'https://staging.thunderscript.com/api/feed';
  const params = new URLSearchParams({
    profile: '673f0d13aa1afbc03f4686f6',
    limit: String(limit),
  });
  if (lastId) params.append('lastId', lastId);

  const response = await fetch(`${base}?${params.toString()}`, {
    method: 'GET',
    headers: {
      'client-id': '66ea7609c990886923861202',
      'client-secret': '653f1e94-fa6d-4d10-932e-e1030c5dcb1c',
      // no Cookie required here if session not needed
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  const json = await response.json();
  // API returns { feeds: [...], more: boolean }
  return {
    feeds: json.feeds,
    more: json.more,
  };
}
