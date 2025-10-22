import { fetchCryptoPrices } from '../api/crypto.js'

export async function renderCryptoChart(
  canvas,
  currentChart,
  cryptoId = 'bitcoin',
  days = 30
) {
  if (currentChart) {
    try {
      currentChart.destroy()
    } catch (e) {
      console.warn('Error destroying old chart:', e)
    }
  }

  Chart.getChart(canvas)?.destroy()

  let prices
  try {
    prices = await fetchCryptoPrices(cryptoId, days)
  } catch (err) {
    alert('Error fetching data')
    return currentChart
  }

  if (!prices || prices.length === 0) {
    alert('No Data')
    return currentChart
  }

  const labels = prices.map((p) => p.label)
  const values = prices.map((p) => p.value)

  const chart = new Chart(canvas, {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: `${cryptoId.toUpperCase()} / USD`,
          data: values,
          borderColor: '#d6f763',
          backgroundColor: '#d6f763',
          tension: 0.2,
          pointRadius: 0,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          ticks: { autoSkip: true, maxTicksLimit: 10 },
        },
        y: {
          beginAtZero: false,
        },
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: (context) => `$${context.parsed.y.toFixed(2)}`,
          },
        },
      },
    },
  })

  return chart
}
