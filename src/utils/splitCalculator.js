const CLOSET_BONUS    = { small: 0, medium: 2, large: 4 }
const BATHROOM_BONUS  = { private: 8, 1: 4, 2: 2, '3+': 0 }
const LIGHT_BONUS     = [0, 1, 2, 3, 4]      // index = val - 1 (1-5 → 0-4)
const LAYOUT_BONUS    = [0, 1, 2, 4, 5]      // index = val - 1 (1-5 → 0-5)
const QUIETNESS_BONUS = [0, 1, 2, 3, 4]      // index = val - 1 (1-5 → 0-4)

function scoreRoom(room, maxSqft) {
  const sqft = room.sqft || 0
  const sizeScore = maxSqft > 0 ? (sqft / maxSqft) * 100 : 100

  const d = room.details || {}
  const closet    = CLOSET_BONUS[d.closet] ?? 0
  const windows   = d.windows == null ? 0 : d.windows === 0 ? 0 : d.windows === 1 ? 1 : 2
  const light     = d.naturalLight   != null ? (LIGHT_BONUS[d.naturalLight - 1]     ?? 0) : 0
  const layout    = d.layoutQuality  != null ? (LAYOUT_BONUS[d.layoutQuality - 1]   ?? 0) : 0
  const bath      = d.bathroomType === 'private'
    ? BATHROOM_BONUS.private
    : BATHROOM_BONUS[d.bathroomSharedWith] ?? 0
  const quiet     = d.quietness      != null ? (QUIETNESS_BONUS[d.quietness - 1]    ?? 0) : 0

  return sizeScore + closet + windows + light + layout + bath + quiet
}

function describeRoom(room, maxSqft) {
  const d = room.details || {}
  const notes = []

  if ((room.sqft || 0) >= maxSqft && maxSqft > 0) notes.push('Largest room')
  if (d.bathroomType === 'private')                notes.push('Private bath')
  if (d.naturalLight >= 4)                         notes.push('Great light')
  if (d.layoutQuality >= 4)                        notes.push('Great layout')
  if (d.closet === 'large')                        notes.push('Large closet')
  if (d.quietness >= 4)                            notes.push('Very quiet')
  if (d.windows >= 2)                              notes.push('Many windows')

  return notes.length > 0 ? notes.slice(0, 3).join(' · ') : 'Based on room size'
}

/**
 * Returns an array of result objects, one per room, summing exactly to totalRent.
 * @param {number} totalRent
 * @param {{ id, name, sqft, details }[]} rooms
 * @returns {{ id, name, rent, percent, diffFromEqual, description }[]}
 */
export function calculateSplit(totalRent, rooms) {
  if (!totalRent || rooms.length === 0) return []

  const allSqft    = rooms.map(r => r.sqft || 0)
  const maxSqft    = Math.max(...allSqft)
  const scores     = rooms.map(r => scoreRoom(r, maxSqft))
  const totalScore = scores.reduce((a, b) => a + b, 0)
  const equalShare = totalRent / rooms.length

  // Proportional allocation — Largest Remainder rounding so cents sum exactly
  const raw     = scores.map(s => (s / totalScore) * totalRent)
  const floors  = raw.map(v => Math.floor(v * 100) / 100)
  const deficit = Math.round((totalRent - floors.reduce((a, b) => a + b, 0)) * 100)
  const remainders = raw.map((v, i) => ({ i, frac: (v * 100) % 1 }))
    .sort((a, b) => b.frac - a.frac)

  remainders.slice(0, deficit).forEach(({ i }) => {
    floors[i] = Math.round((floors[i] + 0.01) * 100) / 100
  })

  return rooms.map((room, i) => ({
    id:           room.id,
    name:         room.name,
    rent:         floors[i],
    percent:      totalScore > 0 ? (scores[i] / totalScore) * 100 : 100 / rooms.length,
    diffFromEqual: Math.round((floors[i] - equalShare) * 100) / 100,
    description:  describeRoom(room, maxSqft),
  }))
}
