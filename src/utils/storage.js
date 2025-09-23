export function loadFromStorage(key, fallback) {
  const saved = localStorage.getItem(key);
  return saved ? JSON.parse(saved) : fallback;
}

export function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
