export const LEGACY_STORAGE_KEY = 'berlin-walking-tour:visited:v1'
export const STORAGE_KEY = 'berlin-walking-tour:visited:v2'

function parseProgress(raw: string, validIds: number[]): number[] {
  const value: unknown = JSON.parse(raw)
  if (!Array.isArray(value) || !value.every(id => typeof id === 'number' && Number.isInteger(id) && validIds.includes(id))) {
    throw new Error('Tallennetun edistymisen muoto on virheellinen.')
  }
  return [...new Set(value)]
}

export function readProgress(storage: Storage, validIds: number[]): { visited: number[]; migrationFailed: boolean } {
  const raw = storage.getItem(STORAGE_KEY)
  if (raw !== null) return { visited: parseProgress(raw, validIds), migrationFailed: false }

  const legacy = storage.getItem(LEGACY_STORAGE_KEY)
  if (legacy === null) return { visited: [], migrationFailed: false }

  const oldIds = Array.from({ length: 22 }, (_, index) => index + 1)
  const visited = parseProgress(legacy, oldIds).filter(id => id !== 5).map(id => id > 5 ? id - 1 : id)
  if (visited.some(id => !validIds.includes(id))) throw new Error('Vanhaa edistymistä ei voitu muuntaa.')
  try {
    writeProgress(storage, visited)
    return { visited, migrationFailed: false }
  } catch {
    return { visited, migrationFailed: true }
  }
}

export function writeProgress(storage: Storage, visited: number[]): void {
  storage.setItem(STORAGE_KEY, JSON.stringify([...new Set(visited)]))
}
