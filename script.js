import { fetchUserVotes } from './api.js'

const defaultUserId = '989665'

let chart = null

async function renderChart(userId) {
  const votes = await fetchUserVotes(userId, 50)

  if (!votes || votes.length === 0) {
    alert(`We couldn't get the ratings of this user`)
    return
  }

  const sortedVotes = votes.slice().reverse()
  console.log(sortedVotes)

  const labels = sortedVotes.map(() => '')
  const titles = sortedVotes.map((v) => v.name)
  const ratings = sortedVotes.map((v) => v.rating)
  const filmIds = sortedVotes.map((v) => v.filmId)

  if (chart) {
    chart.destroy()
  }

  chart = new Chart(document.getElementById('canvasChart'), {
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
      maintainAspectRatio: false,
      scales: {
        x: {
          ticks: {
            display: false,
          },
        },
        y: {
          min: 0,
          max: 10,
        },
      },
      plugins: {
        tooltip: {
          callbacks: {
            title: (context) => {
              const index = context[0].dataIndex
              return `${titles[index]} (${sortedVotes[index].year})`
            },
          },
        },
      },
      onClick: (evt, elements) => {
        if (elements.length > 0) {
          const index = elements[0].index
          const filmId = filmIds[index]
          const url = `https://www.kinopoisk.ru/film/${filmId}/`
          window.open(url, '_blank')
        }
      },
      onHover: (event, elements) => {
        const target = event.native.target
        target.style.cursor = elements.length ? 'pointer' : 'default'
      },
    },
  })
}

document.addEventListener('DOMContentLoaded', () => {
  renderChart(defaultUserId)

  document.getElementById('id-Button').addEventListener('click', () => {
    const newId = document.getElementById('id-Input').value.trim()
    if (newId) {
      renderChart(newId)
    } else {
      alert('Please Type User Id')
    }
  })
})
