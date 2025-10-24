export async function fetchWeather(city = 'Moscow') {
  // 1. Получаем координаты города
  const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
    city
  )}&count=1&language=en&format=json`
  const geoResponse = await fetch(geoUrl)
  if (!geoResponse.ok) throw new Error('Geocoding error')

  const geoData = await geoResponse.json()
  if (!geoData.results || geoData.results.length === 0) {
    throw new Error(`City "${city}" not found`)
  }

  const { latitude, longitude } = geoData.results[0]

  // 2. Получаем почасовой прогноз температуры
  const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m&forecast_days=1&timezone=auto`
  const weatherResponse = await fetch(weatherUrl)
  if (!weatherResponse.ok) throw new Error('Weather fetch error')

  const data = await weatherResponse.json()
  const hours = data.hourly.time.slice(0, 24)
  const temps = data.hourly.temperature_2m.slice(0, 24)

  // 3. Формируем данные для графика
  return hours.map((t, i) => ({
    label: new Date(t).toLocaleTimeString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit',
    }),
    value: temps[i],
  }))
}
