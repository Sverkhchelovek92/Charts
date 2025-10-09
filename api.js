const API_BASE = 'https://kinopoiskapiunofficial.tech/api/v1'
const API_KEY = '8d8791b7-8d9d-4103-80e4-e3e9f1a12ab5'
const USER_ID = '989665'

export async function fetchUserVotes(limit = 50) {
  const url = `https://kinopoiskapiunofficial.tech/api/v1/kp_users/${USER_ID}/votes`

  const response = await fetch(url, {
    headers: {
      'X-API-KEY': API_KEY,
      Accept: 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error(`Ошибка API: ${response.status}`)
  }

  const data = await response.json()
  console.log('Ответ API:', data)

  const rawVotes = data.items
  console.log('Raw Votes', rawVotes)

  const votes = rawVotes.slice(0, limit).map((v) => ({
    name: v.nameOriginal || v.nameRu,
    filmId: v.kinopoiskId,
    year: v.year,
    rating: v.userRating,
  }))

  console.log('Обработанные оценки:', votes)

  return votes
}
