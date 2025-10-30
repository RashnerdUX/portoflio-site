import { openDB } from 'idb';

// Use this to store watched progress of movies for each user on their browser

const DB_NAME = 'WatchOrderDB';
const STORE_NAME = 'progress';

export async function getDB() {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    },
  });
}

export async function saveProgress(data: Record<string, boolean>) {
  const db = await getDB();
  await db.put(STORE_NAME, data, 'watchedMovies');
}

export async function loadProgress(): Promise<Record<string, boolean>> {
  const db = await getDB();
  return (await db.get(STORE_NAME, 'watchedMovies')) || {};
}

export async function clearProgress() {
  const db = await getDB();
  await db.delete(STORE_NAME, 'watchedMovies');
}