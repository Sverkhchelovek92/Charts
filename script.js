import { renderKinopoiskChart } from './charts/kinopoiskChart.js'
import { renderCryptoChart } from './charts/cryptoChart.js'
import { renderWeatherChart } from './charts/weatherChart.js'

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
      <button id="cryptoButton">Show Chart</button>
     </div>
    `
    document
      .getElementById('cryptoButton')
      .addEventListener('click', async () => {
        const cryptoId = document.getElementById('cryptoSelect').value
        const days = 50
        chart = await renderCryptoChart(canvas, chart, cryptoId, days)
      })
  }
  if (chartType === 'weather') {
    console.log('weather')

    chartOptions.innerHTML = `
     <div id="controls"> 
      <input type="text" id="cityInput" placeholder="City" value="Moscow">
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

document.addEventListener('DOMContentLoaded', () => {
  renderKinopoiskChart(canvas, chart, defaultUserId)
})
