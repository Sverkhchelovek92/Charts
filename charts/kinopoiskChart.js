import { fetchKinopoiskRatings } from '../api/kinopoisk.js'

export async function renderKinopoiskChart(canvas, currentChart, userId) {
  if (currentChart) {
    try {
      currentChart.destroy()
    } catch (e) {
      console.warn('Error destroying old chart:', e)
    }
  }

  Chart.getChart(canvas)?.destroy()

  let votes
  try {
    votes = await fetchKinopoiskRatings(userId, 50)
  } catch (e) {
    alert('Error fetching data: ' + e.message)
    return currentChart
  }

  if (!votes || votes.length === 0) {
    alert('Failed to fetch user ratings.')
    return currentChart
  }

  const sorted = votes.slice().reverse()
  const titles = sorted.map((v) => v.name)
  const ratings = sorted.map((v) => v.rating)
  const filmIds = sorted.map((v) => v.filmId)
  const labels = sorted.map(() => '')

  const chart = new Chart(canvas, {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: 'Kinopoisk Ratings',
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
        x: { ticks: { display: false } },
        y: { min: 0, max: 10 },
      },
      plugins: {
        tooltip: {
          callbacks: {
            title: (context) => {
              const i = context[0].dataIndex
              return `${titles[i]} (${sorted[i].year})`
            },
          },
        },
      },
      onClick: (evt, elements) => {
        if (elements.length > 0) {
          const i = elements[0].index
          window.open(`https://www.kinopoisk.ru/film/${filmIds[i]}/`, '_blank')
        }
      },
      onHover: (event, elements) => {
        event.native.target.style.cursor = elements.length
          ? 'pointer'
          : 'default'
      },
    },
  })

  return chart
}
