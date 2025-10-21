import { renderKinopoiskChart } from './charts/kinopoiskChart.js'
// import { renderCryptoChart } from './charts/cryptoChart.js'
// import { renderWeatherChart } from './charts/weatherChart.js'

const defaultUserId = '989665'

let chart = null

const canvas = document.getElementById('canvasChart')
const chartTypeSelect = document.getElementById('chartTypeSelect')
const chartOptions = document.getElementById('chartOptions')

chartTypeSelect.addEventListener('change', renderOptions)
renderOptions()

function renderOptions() {
  const chartType = chartTypeSelect.value
  chartOptions.innerHTML = ''

  if (chartType === 'kinopoisk') {
    console.log('kinopoisk')

    chartOptions.innerHTML = `
     <div id="controls"> 
      <input type="text" id="kpUserId" placeholder="User ID" >
      <button id="kpButton">Show Ratings</button>
     </div>`

    // document.getElementById('kpButton').addEventListener('click', async () => {
    //   const userId = document.getElementById('kpUserId').value.trim()
    //   chart = await renderKinopoiskChart(canvas, chart, userId)
    // })

    document.getElementById('kpButton').addEventListener('click', async () => {
      const userId = document.getElementById('kpUserId').value.trim()
      if (userId) {
        renderKinopoiskChart(canvas, chart, userId)
      } else {
        alert('Please Type User Id')
      }
    })
  }
  if (chartType === 'crypto') {
    console.log('crypto')

    chartOptions.innerHTML = `
     <div id="controls"> 
      <select id="cryptoSelect">
        <option value="bitcoin">Bitcoin</option>
        <option value="ethereum">Ethereum</option>
      </select>
      <button id="cryptoButton">Show Ratings</button>
     </div>
    `
    document
      .getElementById('cryptoButton')
      .addEventListener('click', async () => {
        const coin = document.getElementById('cryptoSelect').value
        chart = await renderCryptoChart(canvas, chart, coin)
      })
  }
  if (chartType === 'weather') {
    console.log('weather')

    chartOptions.innerHTML = `
     <div id="controls"> 
      <input type="text" id="cityInput" placeholder="City" value="Моscow">
      <button id="weatherButton">Show Weather</button>
     </div>`

    document
      .getElementById('weatherButton')
      .addEventListener('click', async () => {
        const city = document.getElementById('cityInput').value.trim()
        chart = await renderWeatherChart(canvas, chart, city)
      })
  }
}

// async function renderChart(userId) {
//   const votes = await fetchKinopoiskRatings(userId, 50)

//   if (!votes || votes.length === 0) {
//     alert(`We couldn't get the ratings of this user`)
//     return
//   }

//   const sortedVotes = votes.slice().reverse()
//   console.log(sortedVotes)

//   const labels = sortedVotes.map(() => '')
//   const titles = sortedVotes.map((v) => v.name)
//   const ratings = sortedVotes.map((v) => v.rating)
//   const filmIds = sortedVotes.map((v) => v.filmId)

//   if (chart) {
//     chart.destroy()
//   }

//   chart = new Chart(canvas, {
//     type: 'line',
//     data: {
//       labels,
//       datasets: [
//         {
//           label: 'My Kinopoisk Ratings',
//           data: ratings,
//           borderColor: '#d6f763',
//           backgroundColor: '#eb8e36',
//           tension: 0,
//         },
//       ],
//     },
//     options: {
//       responsive: true,
//       maintainAspectRatio: false,
//       scales: {
//         x: {
//           ticks: {
//             display: false,
//           },
//         },
//         y: {
//           min: 0,
//           max: 10,
//         },
//       },
//       plugins: {
//         tooltip: {
//           callbacks: {
//             title: (context) => {
//               const index = context[0].dataIndex
//               return `${titles[index]} (${sortedVotes[index].year})`
//             },
//           },
//         },
//       },
//       onClick: (evt, elements) => {
//         if (elements.length > 0) {
//           const index = elements[0].index
//           const filmId = filmIds[index]
//           const url = `https://www.kinopoisk.ru/film/${filmId}/`
//           window.open(url, '_blank')
//         }
//       },
//       onHover: (event, elements) => {
//         const target = event.native.target
//         target.style.cursor = elements.length ? 'pointer' : 'default'
//       },
//     },
//   })
// }

document.addEventListener('DOMContentLoaded', () => {
  renderKinopoiskChart(canvas, chart, defaultUserId)
})
