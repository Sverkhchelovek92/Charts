const API_KEY = 'b9c4f38e842525dec4414df06ca69aa3'

async function geocodeCity(city) {
  const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
    city
  )}&limit=1&appid=${API_KEY}`
  const response = await fetch(geoUrl)
  if (!response.ok) throw new Error('Geocoding Error')

  const data = await response.json()
  if (!data.length) throw new Error(`Couldn't find the place`)

  return { lat: data[0].lat, lon: data[0].lon }
}

export async function fetchWeather(city = 'Москва') {
  const { lat, lon } = await geocodeCity(city)

  const weatherUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,daily,alerts&units=metric&lang=ru&appid=${API_KEY}`
  const response = await fetch(weatherUrl)
  if (!response.ok) throw new Error('Error getting weather')

  const data = await response.json()
  const hourly = data.hourly.slice(0, 24) // 24 Hours Weather forecast

  return hourly.map((h) => {
    const date = new Date(h.dt * 1000)
    const hours = date.getHours().toString().padStart(2, '0') + ':00'
    return {
      label: hours,
      value: Math.round(h.temp), // Temperature Round Up
    }
  })
}
