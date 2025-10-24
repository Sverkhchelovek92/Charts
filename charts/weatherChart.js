import { fetchWeather } from '../api/weather.js'

export async function renderWeatherChart(
  canvas,
  currentChart,
  city = 'Moscow'
) {
  if (currentChart) {
    try {
      currentChart.destroy()
    } catch (e) {
      console.warn('Error destroying old chart:', e)
    }
  }

  Chart.getChart(canvas)?.destroy()

  let forecast
  try {
    forecast = await fetchWeather(city)
  } catch (err) {
    alert('Ошибка при получении данных погоды')
    console.error(err)
    return currentChart
  }

  if (!forecast || forecast.length === 0) {
    alert('Нет данных для этого города')
    return currentChart
  }

  const labels = forecast.map((d) => d.label)
  const temps = forecast.map((d) => d.value)

  const chart = new Chart(canvas, {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: `Temperature — ${city}`,
          data: temps,
          borderColor: '#ff9800',
          backgroundColor: '#ffcc80',
          tension: 0.3,
          //   fill: true,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          title: { display: true, text: 'Temperature (°C)' },
        },
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: (context) => `${context.parsed.y} °C`,
          },
        },
      },
    },
  })

  return chart
}
