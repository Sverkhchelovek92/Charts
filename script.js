import { fetchUserVotes } from './api.js'

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const votes = await fetchUserVotes(5)
    console.log(votes)
  } catch (err) {
    console.error('Ошибка:', err)
  }
})
