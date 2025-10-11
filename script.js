import { fetchUserVotes } from './api.js'

document.addEventListener('DOMContentLoaded', async () => {
  const votes = await fetchUserVotes(50)
  const sortedVotes = votes.slice().reverse()
  console.log(sortedVotes)

  const labels = sortedVotes.map((v) => v.name)
  const ratings = sortedVotes.map((v) => v.rating)

  new Chart(document.getElementById('canvasChart'), {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: 'My Kinopoisk Ratings',
          data: ratings,
          borderColor: '#d6f763',
          backgroundColor: '#eb8e36',
          tension: 0,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        y: {
          min: 0,
          max: 10,
        },
      },
    },
  })
})
