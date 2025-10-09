export async function fetchUserVotes(limit = 50) {
  const url = `${API_BASE}/kp_users/${USER_ID}/votes`

  const pageSize = 20
  const pages = Math.ceil(limit / pageSize)
  let allVotes = []

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
