const API_BASE = 'https://kinopoiskapiunofficial.tech/api/v1'
const API_KEY = '8d8791b7-8d9d-4103-80e4-e3e9f1a12ab5'

export async function fetchUserVotes(userId, limit = 50) {
  const pageSize = 20
  const pages = Math.ceil(limit / pageSize)
  let allVotes = []

  for (let page = 1; page <= pages; page++) {
    const url = `${API_BASE}/kp_users/${userId}/votes?page=${page}&limit=${pageSize}`
    const response = await fetch(url, {
      headers: {
        'X-API-KEY': API_KEY,
        Accept: 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`)
    }

    const data = await response.json()
    const rawVotes = data.items || []
    allVotes = allVotes.concat(rawVotes)

    if (rawVotes.length < pageSize) break
  }

  const votes = allVotes.slice(0, limit).map((v) => ({
    name: v.nameOriginal || v.nameRu,
    filmId: v.kinopoiskId,
    year: v.year,
    rating: v.userRating,
  }))

  return votes
}
